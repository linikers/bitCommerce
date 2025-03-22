import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { notFound } from "next/navigation";
///detalhes do produto especifico
export default function ProdutoDetalhado({
  params,
}: {
  params: { id: string };
}) {
  const produtos = [
    {
      id: 1,
      nome: "Produto 1",
      preco: "100",
      img: "/images/produto1.jpg",
      descricao: "teste teste teste",
    },
    {
      id: 2,
      nome: "Produto 2",
      preco: "200",
      img: "/images/produto2.jpg",
      descricao: "teste teste teste",
    },
  ];
  const produto = produtos.find((p) => p.id === Number(params.id));

  if (!produto) notFound();

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={produto.img}
          alt={produto.nome}
          sx={{ height: 240, objectFit: "cover", borderRadius: 2 }}
        />
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight="bold">
              {produto.nome}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {produto.descricao}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
              R$ {produto.preco}
            </Typography>
            <Button variant="contained" color="success" size="large">
              Adicionar ao Carrinho
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
