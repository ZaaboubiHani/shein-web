import Product from "./Product";


const Recommendations = ({recommends})=>{
    return (
        <div className="flex flex-col items-center">
        {recommends.map((recommend) => {
          if (recommend.products.length === 0) {
            return null;
          }
          return (
            <div className="w-full mb-6 ">
              <div  className="w-full flex justify-center bg-white mb-4 p-2">
                <h1 className="text-2xl text-center max-w-[500px] font-bold uppercase ">
                  {language === "ar"
                    ? recommend.category?.arName
                    : language === "fr"
                    ? recommend.category?.frName
                    : recommend.category?.engName}
                </h1>
              </div>
              <div
                key={recommend.category._id}
                className=" flex overflow-x-auto pb-2 "
              
              >
                {recommend.products.map((product) => {
                  return (
                    <div key={product._id} className="mx-2">
                      <Product product={product} key={product._id} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
}


export default Recommendations;
