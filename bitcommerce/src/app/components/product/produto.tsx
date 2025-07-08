import { Box, Button, Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";
///detalhes do produto especifico
export default function ProdutoDetalhado({ params }: {params: {id: string}} ) {
    const produtos = [
        { id: 1, nome: 'Produto 1', preco: '100', img: '/images/produto1.jpg', descricao: 'teste teste teste' },
        { id: 2, nome: 'Produto 2', preco: '200', img: '/images/produto2.jpg', descricao: 'teste teste teste' },
      ];
    const produto = produtos.find((p) => p.id ===Number(params.id));

    if (!produto) notFound();

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h3" gutterBottom>{produto.nome}</Typography>
            </Box>
            <img src={produto.img} alt={produto.nome} style={{ maxWidth: '100%', height:'auto'}} />
            <Typography variant="body1" paragraph>
                {produto.descricao}
            </Typography>
            <Typography variant="h6" gutterBottom>
                R$: {produto.preco}
            </Typography>
            <Button>
                Adicionar ao carrinho
            </Button>
        </Container>
    )
}