import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { CategoryContext } from "./CategoryContext";
import { NumberSizeContext } from "./NumberSizeContext";
import { LetterSizeContext } from "./LetterSizeContext";
import { PriceSortContext } from "./PriceSortContext";
import Api from "../api/api.source";
const apiInstance = Api.instance;
import axios from "axios";
export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingRandomProducts, setLoadingRandomProducts] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const page = useRef(1);
  const pageLimit = useRef(1);
  const localLoadingProducts = useRef(false);
  const localCategories = useRef([]);
  const localNumberSizes = useRef([]);
  const localLetterSizes = useRef([]);
  const localPriceSort = useRef(false);

  const source = useRef(null);
  const { selectedCategories } = useContext(CategoryContext);
  const { selectedNumberSizes } = useContext(NumberSizeContext);
  const { selectedLetterSizes } = useContext(LetterSizeContext);
  const { priceSort } = useContext(PriceSortContext);
  const fetchProducts = async () => {
    const response = await apiInstance.getAxios().get(`/products`, {
      params: {
        page: 1,
        limit: 10,
        categories: selectedCategories.map((cat) => cat._id),
        sizes: [...selectedNumberSizes, ...selectedLetterSizes],
        sort: priceSort,
      },
      cancelToken: source?.current?.token,
    });

    if (response.status === 200) {
      const totalPages = response.data.totalPages;
      pageLimit.current = totalPages;
      setProducts(response.data.docs);
      setLoadingProducts(false);
      if (response.data.docs.length < 10) {
        page.current = pageLimit.current + 1;
        setLimitReached(true);
      }
    }
  };
  const fetchMoreProducts = async () => {
    if (page.current <= pageLimit.current && !localLoadingProducts.current) {
      page.current = page.current + 1;
      const response = await apiInstance.getAxios().get(`/products`, {
        params: {
          page: page.current,
          limit: 10,
          categories: localCategories.current?.map((cat) => cat._id),
          sizes: [...localNumberSizes.current, ...localLetterSizes.current],
          sort: localPriceSort.current,
        },
        cancelToken: source?.current?.token,
      });
      if (response.status === 200) {
        pageLimit.current = response.data.totalPages;
        setProducts((prev) => [...prev, ...response.data.docs]);
      }
    }
    if (pageLimit.current < page.current && !localLoadingProducts.current) {
      setLimitReached(true);
    }
  };

  const fetchRandomProducts = async () => {
    setLoadingRandomProducts(true);
    const response = await apiInstance.getAxios().get(`/products/random`);
    if (response.status === 200) {
      setRandomProducts(response.data);
    }
    setLoadingRandomProducts(false);
  };

  const reloadProducts = async () => {
    try {
      setLoadingProducts(true);
      localLoadingProducts.current = true;
      page.current = 1;
      setLimitReached(false);
      if (source.current) {
        source.current.cancel("Operation canceled due to new request.");
      }

      source.current = axios.CancelToken.source();
      const response = await apiInstance.getAxios().get(`/products`, {
        params: {
          page: 1,
          limit: 10,
          categories: selectedCategories.map((cat) => cat._id),
          sizes: [...selectedNumberSizes, ...selectedLetterSizes],
          sort: priceSort,
        },
        cancelToken: source?.current?.token,
      });
      if (response.status === 200) {
        pageLimit.current = response.data.totalPages;
        setProducts((prev) => [...response.data.docs]);
        setLoadingProducts(false);
        localLoadingProducts.current = false;
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error:", error.message);
      }
      setLoadingProducts(false); // Ensure loading state is set to false
      localLoadingProducts.current = false;
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRandomProducts();
  }, []);
  useEffect(() => {
    localCategories.current = selectedCategories;
    localNumberSizes.current = selectedNumberSizes;
    localLetterSizes.current = selectedLetterSizes;
    localPriceSort.current = priceSort;
    reloadProducts();
  }, [selectedCategories, selectedNumberSizes, selectedLetterSizes, priceSort]);
  return (
    <ProductContext.Provider
      value={{
        products,
        limitReached,
        loadingProducts,
        loadingRandomProducts,
        randomProducts,
        fetchMoreProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
