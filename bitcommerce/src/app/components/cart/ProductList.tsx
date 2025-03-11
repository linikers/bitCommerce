'use client'

import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { IProduto } from "./Cart"
import { produtos } from "../../../../products";


interface ListaProdutosProps {
    addToCart: (produto: IProduto) => void;
}


export function ProductList({ addToCart}: ListaProdutosProps) {
    return (
        <>
        {produtos.map((produto, ) => (
            <Card key={produto.id} sx={{ mb: 2, margin: 1 }}>
                <CardContent>
                    <Typography variant="h3">{produto.nome}</Typography>
                    <Typography variant="h3">R$: {produto.preco}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => addToCart({...produto, quantidade: 1})}>
                        Adicionar ao carrinho
                    </Button>
                </CardActions>
            </Card>
        ))}
        </>
    )
}