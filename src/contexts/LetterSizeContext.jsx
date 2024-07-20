import React, { createContext, useState } from 'react';

export const LetterSizeContext = createContext();
const LetterSizeProvider = ({ children }) => {
  const [selectedLetterSizes, setSelectedLetterSizes] = useState([]);

  return <LetterSizeContext.Provider value={{selectedLetterSizes,setSelectedLetterSizes}}>
    {children}
  </LetterSizeContext.Provider>;
};

export default LetterSizeProvider;
