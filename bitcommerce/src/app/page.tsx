'use client'
import { Container, Grid2, Typography } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart, IProduto } from "./components/cart";
import { ProductList } from "./components/cart/ProductList";
import { useState } from "react";
// import { produtos } from "../../products";
// import ProductCard from "./components/ProductCard";

export default function Home() {
  // const produtos = [
  //   { id: 1, nome: 'Produto 1', preco: '100', img: '/images/produto1.jpg' },
  //   { id: 2, nome: 'Produto 2', preco: '200', img: '/images/produto2.jpg' },
  // ];
  const [cart, setCart] = useState<IProduto[]>([]);

  const addToCart = (produto: IProduto) => {
    setCart((prevCart) => [...prevCart, produto]);
  }
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Produtos
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2>
            <ProductList addToCart={addToCart} />
          </Grid2>
        </Grid2>
        <Grid2>
          <Cart cart={cart}/>
        </Grid2>
      </Container> 
      <Footer />
    </>
  );
}
