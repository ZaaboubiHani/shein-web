import React, { createContext, useState } from "react";
export const PriceSortContext = createContext();
const PriceSortProvider = ({ children }) => {
  const [priceSort, setPriceSort] = useState(false);
  
  return (
    <PriceSortContext.Provider
      value={{ priceSort, setPriceSort, }}
    >
      {children}
    </PriceSortContext.Provider>
  );
};

export default PriceSortProvider;
