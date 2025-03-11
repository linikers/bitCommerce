'use client'
import { Container, Grid2, Typography } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart, IProduto } from "./components/cart";
import { ProductList } from "./components/cart/ProductList";
import { useEffect, useState } from "react";

export default function Home() {

  const [cart, setCart] = useState<IProduto[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");

      try {
        return storedCart ? JSON.parse(storedCart) : [];
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  });

  // useEffect(() => {
    // if (storedCart) {
    //   try {
    //     setCart(JSON.parse(storedCart));
        
    //   } catch (error) {
    //     console.error(error);
    //     setCart([]);
    //   }
    // }
  // }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

  },[cart]);

  const addToCart = (produto: IProduto) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, produto];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const  removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart
    });
  }

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Produtos
        </Typography>
        <Grid2 container spacing={3} sx={{ display: "flex", flexWrap: "wrap"}}>
          <Grid2 sx={{ display: "flex", flexWrap: "wrap"}}>
            {/* <Grid2> */}
              <ProductList addToCart={addToCart} />
            {/* </Grid2> */}
          </Grid2>
          <Grid2>
            <Cart cart={cart} removeFromCart={removeFromCart} />
          </Grid2>
        </Grid2>
      </Container> 
      <Footer />
    </>
  );
}
