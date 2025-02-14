import { Container, Grid2, Typography } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Cart } from "./components/cart";
// import ProductCard from "./components/ProductCard";

export default function Home() {
  // const produtos = [
  //   { id: 1, nome: 'Produto 1', preco: '100', img: '/images/produto1.jpg' },
  //   { id: 2, nome: 'Produto 2', preco: '200', img: '/images/produto2.jpg' },
  // ];
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Produtos
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2>
            {/* <ProductList /> */}
          </Grid2>
        </Grid2>
        <Grid2>
          <Cart />
        </Grid2>
      </Container> 
      <Footer />
    </>
  );
}
