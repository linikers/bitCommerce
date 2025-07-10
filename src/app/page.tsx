'use client'

import { Box, Container, Grid, Typography } from '@mui/material';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart, IProduto } from "./components/cart";
import { ProductList } from "./components/cart/ProductList";
import React, { useEffect, useState } from 'react';

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: { xs: 2, md: 4 },
          px: { xs: 2, md: 3 }
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ 
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '1.8rem', md: '2.125rem' }
          }}
        >
          Produtos
        </Typography>

        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ flex: 1 }}>
          <Grid item xs={12} lg={8}>
            <ProductList addToCart={addToCart}/>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box sx={{ 
              position: { lg: 'sticky' },
              top: { lg: '2rem' },
              height: { lg: 'fit-content' }
            }}>
              <Cart cart={cart} removeFromCart={removeFromCart} />
            </Box>
          </Grid>
        </Grid>
      </Container> 
      
      <Footer />
    </Box>
  );
}
