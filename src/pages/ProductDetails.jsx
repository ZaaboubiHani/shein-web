import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { CommentContext } from "../contexts/CommentContext";
import { TfiCommentAlt } from "react-icons/tfi";
const ProductDetails = () => {
  const { id } = useParams();
  const { products, fetchSingleProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const { handleOpenSidebar, handleCloseSidebar } = useContext(SidebarContext);
  const { comments, loadingComments, fetchComments, addComment } =
    useContext(CommentContext);

  const [amount, setAmount] = useState(1);
  const [commentContent, setCommentContent] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    fetchComments(id);
    initData();
  }, []);
  const initData = async () => {
    setProduct(await fetchSingleProduct(id));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .replace(/(\d+)\/(\d+)\/(\d+),\s+(\d+):(\d+):(\d+)/, "$3/$2/$1 $4:$5:$6");
  };

  return !product ? (
    <section className="h-screen flex justify-center items-center">
      <ClipLoader />
    </section>
  ) : (
    <div className="bg-gray-100">
      <section
        className={`pt-32 pb-10 md:px-16 lg:px-16 xl:px-64 lg:py-32 flex items-center  bg-cover `}
      >
        <div className="container mx-auto flex flex-col items-center justify-center">
          {/*image & text wrapper*/}
          <div
            className={`flex flex-col items-center lg:items-center justify-center ${
              language === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
          >
            <div
              className="relative border border-black w-[400px] h-[500px]
            flex items-center"
            >
              <img src={product.imageUrl} alt="" />
            </div>
            {/* config panel */}
            <div
              className={`flex  flex-1 flex-col text-center items-center p-4 w-full lg:max-w-[500px] 
              ${language === "ar" ? "lg:items-end" : "lg:items-start"}`}
            >
              <div
                className={`flex justify-center lg:justify-start h-8 ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={language === "ar" ? "text-right" : "text-left"}>
                  {language === "ar"
                    ? ": حجم"
                    : language === "fr"
                    ? "Taille: "
                    : "Size: "}
                </div>
                <div
                  className={`flex mb-6 ml-2 max-w-[310px] overflow-y-auto h-[50px] ${
                    language === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  <button
                    className="flex-shrink-0"
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "8px",
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                      boxSizing: "border-box",
                    }}
                  >
                    {product.size}
                  </button>
                </div>
              </div>
              {/*text */}
              <h1
                className={`text-[26px] font-sedan my-2 lg:mx-0 
                text-center ${
                  language === "ar" ? "lg:text-right" : "lg:text-left"
                }`}
              >
                {language === "ar"
                  ? product.arName
                  : language === "fr"
                  ? product.frName
                  : product.engName}
              </h1>
              <div
                className={`flex ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                } `}
              >
                <div
                  className={`text-xl  font-medium mb-6 
                  text-center ${
                    language === "ar"
                      ? "lg:text-right ml-4"
                      : "lg:text-left mr-4"
                  }
                  ${
                    product.isSale
                      ? "line-through text-gray-400"
                      : "text-[#4CAF50]"
                  }`}
                >
                  {language === "ar"
                    ? "دج "
                    : language === "fr"
                    ? "DA "
                    : "DZD "}
                  {product.buyPrice}
                </div>
                {product.isSale ? (
                  <div
                    className={`font-semibold text-[#4CAF50] ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {language === "ar"
                      ? "دج "
                      : language === "fr"
                      ? "DA "
                      : "DZD "}
                    {product.salePrice}
                  </div>
                ) : null}
              </div>
              <p
                className={`mb-8  break-words text-center w-full
                ${language === "ar" ? "lg:text-right" : "lg:text-left"}`}
              >
                {language === "ar"
                  ? product.arDescription
                  : language === "fr"
                  ? product.frDescription
                  : product.engDescription}
              </p>

              {/* quantity */}
              <div
                className={`flex items-center w-[200px] h-[60px] mb-2 mr-4 ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {language === "ar"
                  ? ": كمية"
                  : language === "fr"
                  ? "Quantité: "
                  : "Quantity: "}
                <div
                  className={`flex flex-1 w-[100px] items-center h-full 
                  border-2 border-primary text-primary font-medium mx-4 rounded-lg
                  ${language === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"}
                  ${language === "ar" ? "flex-row-reverse" : "flex-row"}
                  `}
                >
                  {/*minus icon */}
                  <button
                    onClick={() => setAmount((prev) => prev - 1)}
                    disabled={amount === 1}
                    className="flex-1 h-full flex justify-center items-center cursor-pointer "
                  >
                    <IoMdRemove
                      className={`${
                        amount === 1 ? "text-gray-300" : "text-black"
                      }`}
                    />
                  </button>
                  {/*amount*/}
                  <div className="h-full flex justify-center items-center px-2">
                    {amount}
                  </div>
                  {/*plus icon */}
                  <div
                    onClick={() => setAmount((prev) => prev + 1)}
                    className="flex-1 h-full flex justify-center items-center cursor-pointer"
                  >
                    <IoMdAdd />
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col items-center ${
                  language === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <button
                  onClick={() => {
                    addToCart({
                      id: product._id,
                      buyPrice: product.buyPrice,
                      arDescription: product.arDescription,
                      frDescription: product.frDescription,
                      engDescription: product.engDescription,
                      arName: product.arName,
                      frName: product.frName,
                      engName: product.engName,
                      isSale: product.isSale,
                      salePrice: product.salePrice,
                      img: product.imageUrl,
                      size: product.size,
                      amount: amount,
                    });
                    setAmount(1);
                    handleOpenSidebar();
                    setTimeout(() => {
                      handleCloseSidebar();
                    }, 3000);
                  }}
                  className="bg-primary py-4 px-8 text-white mb-2 items-center lg:mx-4 rounded-lg"
                >
                  {language === "ar"
                    ? "أضف إلى السلة"
                    : language === "fr"
                    ? "Ajouter au panier"
                    : "Add to cart"}
                </button>
                <Link to="/checkout">
                  <button
                    onClick={() => {
                      addToCart({
                        id: product._id,
                        buyPrice: product.buyPrice,
                        arDescription: product.arDescription,
                        frDescription: product.frDescription,
                        engDescription: product.engDescription,
                        arName: product.arName,
                        frName: product.frName,
                        engName: product.engName,
                        isSale: product.isSale,
                        salePrice: product.salePrice,
                        img: product.imageUrl,
                        size: product.size,
                        color: product.hex,
                        amount: amount,
                      });
                      setAmount(1);
                      handleOpenSidebar();
                      setTimeout(() => {
                        handleCloseSidebar();
                      }, 3000);
                    }}
                    className="bg-[#4CAF50] py-4 px-8 text-white mb-2 items-center rounded-lg"
                  >
                    {language === "ar"
                      ? "اشتري الان"
                      : language === "fr"
                      ? "Achetez maintenant"
                      : "Buy now"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <textarea
            class={`border border-black p-2 block max-w-[900px] w-full h-32 resize-none mt-4
               ${language === "ar" ? "flex-row-reverse text-right" : ""}`}
            placeholder={
              language === "ar"
                ? "إضافة تعليق"
                : language === "fr"
                ? "Ajouter un commentaire"
                : "Add a comment"
            }
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
          ></textarea>
          <div className={`max-w-[900px] w-full flex justify-end  ${language === "ar" ? "flex-row-reverse text-right" : ""}`}>
            <button
              className="p-2 m-2 border border-1 border-black rounded-lg min-w-[80px]"
              onClick={() => {
                setCommentContent("");
              }}
            >
              {language === "ar"
                ? "الغي"
                : language === "fr"
                ? "Annuler"
                : "Cancel"}
            </button>
            <button
              disabled={!commentContent}
              onClick={() => {
                addComment(id, commentContent);
                setCommentContent("");
              }}
              className={`p-2 bg-[#4CAF50] m-2 rounded-lg text-white min-w-[80px] ${
                commentContent ? "opacity-100" : "opacity-50"
              }`}
            >
              {language === "ar"
                ? "علق"
                : language === "fr"
                ? "Commenter"
                : "Comment"}
            </button>
          </div>
          <div className="max-w-[900px] w-full">
            {loadingComments ? (
              <div className="h-[100px] w-full flex justify-center items-center">
                <ClipLoader />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center mt-4">
                {language === "ar"
                  ? "لا توجد تعليقات بعد"
                  : language === "fr"
                  ? "Pas de commentaires pour le moment"
                  : "No comments yet"}
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className={`flex justify-start w-full border-b border-dotted border-gray-300 py-4
                    ${language === "ar" ? "flex-row-reverse text-right" : ""}`}
                >
                  <TfiCommentAlt className="text-3xl mx-4" />
                  <div className="flex-1">
                    <div className="text-gray-400 font-thin text-xs">
                      {formatDate(comment.createdAt)}
                    </div>
                    <div className="mt-1 break-all">{comment.content}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
