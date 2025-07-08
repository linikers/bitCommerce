'use client'

import {
    CardContent,
    CardActions,
    Typography,
    CardMedia,
    Button,
    Card,
    Grid,
} from "@mui/material";
import { IProduto } from "./Cart"
import { produtos } from "../../../../products";

interface ListaProdutosProps {
    addToCart: (produto: IProduto) => void;
}


export function ProductList({ addToCart}: ListaProdutosProps) {
    return (
        <Grid container spacing={3}>
            {produtos.map((produto) => (
                <Grid key={produto.id} xs={12} sm={6} md={4}>
                    <Card 
                        sx={{
                            justifyContent: "space-between",
                            flexDirection: "column",
                            // maxWidth: "200px",
                            overFlow: 'hidden',
                            borderRadius: 4,
                            display: "flex",
                            height: "100%",
                            boxShadow: 4,
                            p: 4,
                            marginTop: 2,
                            minHeight: 280,
                        }}>
                        <CardMedia 
                            image={produto.img}
                            alt={produto.nome}
                            component="img"
                            height="160"
                            sx={{
                                objectFit: "cover",
                                borderRadius: 2,
                                // width: "100%",
                            }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>{produto.nome}</Typography>
                            <Typography variant="body1">R$: {produto.preco}</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                            <Button 
                                fullWidth
                                variant="contained"
                                onClick={() => addToCart({ ...produto, quantidade: 1 })}
                            >
                                Adicionar ao carrinho
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>    
            ))}
        </Grid>
    )
}