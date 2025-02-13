import { Container, Grid2, Typography } from "@mui/material";
// import ProductCard from "./components/ProductCard";

export default function Home() {
  // const produtos = [
  //   { id: 1, nome: 'Produto 1', preco: '100', img: '/images/produto1.jpg' },
  //   { id: 2, nome: 'Produto 2', preco: '200', img: '/images/produto2.jpg' },
  // ];
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>Produtos</Typography>
      <Grid2 container spacing={3}>
        {/* {produtos.map((produto) => (
          <Grid2  key={produto.id} xs={12} sm={6} md={4}>
            <ProductCard produto={produtos} />
          </Grid2>

        ))} */}
      </Grid2>
    </Container>  
  );
}
