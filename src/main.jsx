import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";
import LanguageProvider from "./contexts/LanguageContext";
import CategoryProvider from "./contexts/CategoryContext";
import SnackbarProvider from "./contexts/SnackbarContext";
import MenuProvider from "./contexts/MenuContext";
import PosterProvider from "./contexts/PostersContext";
import ProductProvider from "./contexts/ProductContext";
import NumberSizeProvider from "./contexts/NumberSizeContext";
import LetterSizeProvider from "./contexts/LetterSizeContext";
import PriceSortProvider from "./contexts/PriceSortContext";
import CommentProvider from "./contexts/CommentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <MenuProvider>
      <PosterProvider>
        <PriceSortProvider>
          <LetterSizeProvider>
            <NumberSizeProvider>
              <CategoryProvider>
                <ProductProvider>
                  <CommentProvider>
                    <SidebarProvider>
                      <CartProvider>
                        <SnackbarProvider>
                          <React.StrictMode>
                            <App />
                          </React.StrictMode>
                        </SnackbarProvider>
                      </CartProvider>
                    </SidebarProvider>
                  </CommentProvider>
                </ProductProvider>
              </CategoryProvider>
            </NumberSizeProvider>
          </LetterSizeProvider>
        </PriceSortProvider>
      </PosterProvider>
    </MenuProvider>
  </LanguageProvider>
);
