import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from '../api/api.source';
import { MenuContext } from "../contexts/MenuContext";

export const CategoryContext = createContext();

const apiInstance = Api.instance;

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
   

    useEffect(() => {
        const fetchCategories = async () => {
            apiInstance.getAxios().get('/categories')
                .then(response => {
                    setCategories(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };
        fetchCategories();
    }, []);

    const toggleCategory = (category) => {
        setSelectedCategories(prev => {
            if (prev.some(cat => cat._id === category._id)) {
                return prev.filter(cat => cat._id !== category._id);
            } else {
                return [...prev, category];
            }
        });
    };
    const clearSelectedCategories = () => {
        setSelectedCategories([]);
    };

    return (
        <CategoryContext.Provider value={{
            categories,
            selectedCategories,
            toggleCategory,
            clearSelectedCategories,
        }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
