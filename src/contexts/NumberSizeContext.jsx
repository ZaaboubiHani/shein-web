import React, { createContext, useState } from 'react';

export const NumberSizeContext = createContext();
const NumberSizeProvider = ({ children }) => {
  const [selectedNumberSizes, setSelectedNumberSizes] = useState([]);

  return <NumberSizeContext.Provider value={{selectedNumberSizes,setSelectedNumberSizes}}>
    {children}
  </NumberSizeContext.Provider>;
};

export default NumberSizeProvider;
