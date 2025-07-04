'use client'

import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IProduto } from "./Cart"
import { produtos } from "../../../../products";
// import { Height } from "@mui/icons-material";


interface ListaProdutosProps {
    addToCart: (produto: IProduto) => void;
}


export function ProductList({ addToCart}: ListaProdutosProps) {
    return (
        <Grid container spacing={2}>
            {produtos.map((produto) => (
                <Grid key={produto.id} xs={12} sm={6} md={4}>
                    <Card sx={{ margin: "8px", maxWidth: "250px", height: "100%", flexDirection: "Column" }}>
                        <CardMedia 
                            component="img"
                            height="160"
                            image={`/images/${produto.img}`}
                            alt={produto.img}
                            sx={{
                                objectFit: "cover",
                                width: "100%",
                            }}
                        />
                        <CardContent>
                            <Typography variant="h6">{produto.nome}</Typography>
                            <Typography variant="body1">R$: {produto.preco}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => addToCart({ ...produto, quantidade: 1 })}>
                                Adicionar ao carrinho
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>    
            ))}
        </Grid>
    )
}