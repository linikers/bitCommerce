'use client'

import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { IProduto } from "./Cart"
import { produtos } from "../../../../products";


interface ListaProdutosProps {
    addToCart: (produto: IProduto) => void;
}


export function ProductList({ addToCart}: ListaProdutosProps) {
    return (
        <Grid container>
            {produtos.map((produto) => (
                <Grid key={produto.id} xs={12} sm={6} md={4}>
                    <Card sx={{ margin: "8px", maxWidth: "250px" }}>
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