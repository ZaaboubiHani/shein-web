import React, { createContext, useState, useEffect, useContext } from "react";
import Api from "../api/api.source";

export const CommentContext = createContext();

const apiInstance = Api.instance;

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const fetchComments = async (id) => {
    try {
      setLoadingComments(true);
      const response = await apiInstance.getAxios().get("/comments", {
        params: {
          product: id,
        },
      });
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const addComment = async (id, content) => {
    try {
      setLoadingComments(true);
      const response = await apiInstance.getAxios().post("/comments", {
        product: id,
        content: content,
      });
      if (response.status === 201) {
        const newComment = response.data;
        setComments((prevComments) => [newComment, ...prevComments]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        fetchComments,
        loadingComments,
        addComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
