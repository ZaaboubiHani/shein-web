import React, { createContext, useState } from "react";
import Api from "../api/api.source";
const apiInstance = Api.instance;
export const PosterContext = createContext();
const PosterProvider = ({ children }) => {
  const [posters, setPosters] = useState([]);

  const getPosters = async () => {
    const response = await apiInstance.getAxios().get("/posters");
    setPosters(response.data);
  };

  
  
  return (
    <PosterContext.Provider
      value={{ posters, getPosters, }}
    >
      {children}
    </PosterContext.Provider>
  );
};

export default PosterProvider;
