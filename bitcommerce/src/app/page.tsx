'use client'

import { Grid, Grid2, Typography } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart, IProduto } from "./components/cart";
import { ProductList } from "./components/cart/ProductList";
import React, { useEffect, useState } from "react";
// import Grid2 from '@mui/material/Unstable_Grid2';

export default function Home() {

  const [cart, setCart] = useState<IProduto[]>([]);

  useEffect(() => {
      if (typeof window !== "undefined" ) {
        const storedCart = localStorage.getItem("cart");
  
        try {
          setCart(storedCart ? JSON.parse(storedCart) : []);
        } catch (error) {
          console.error(error);
          setCart([]);
        }
      }
  }, [])

  useEffect(() => {
     if (typeof window !== "undefined" && cart.length > 0) {
       localStorage.setItem("cart", JSON.stringify(cart));
     }

  },[cart]);

  const addToCart = (produto: IProduto) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === produto.id);

      if (existingProductIndex >=0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantidade: updatedCart[existingProductIndex].quantidade + 1,
        };
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
        return updatedCart;

      } else {
        const newCart = [...prevCart,{ ...produto, quantidade: 1 }];
        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart;
      }
    });
  };

  const  removeFromCart = (index: number) => {
    setCart((prevCart) => {
     const updatedCart = [...prevCart];
     if (updatedCart[index].quantidade > 1) {
      updatedCart[index] = {
        ...updatedCart[index],
        quantidade: updatedCart[index].quantidade -1,
      }
     } else {
      updatedCart.splice(index, 1);
     }
     localStorage.setItem("cart", JSON.stringify(updatedCart));
     return updatedCart;
    });
  }

  return (
    <div>
      <Header />
      <Grid2 container spacing={3} sx={{ margin: 2 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Produtos
        </Typography>

        <Grid2 container>
            <Grid xs={12} md={8}>
                <ProductList addToCart={addToCart} />
            </Grid>

          <Grid xs={12} md={4} sx={{ marginTop: {xs:4, md: 0}}}>
            <Cart cart={cart} removeFromCart={removeFromCart} />
          </Grid>
        </Grid2>
      </Grid2> 
      <Footer />
    </div>
  );
}
