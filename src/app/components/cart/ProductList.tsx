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
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {produtos.map((produto) => (
                <Grid key={produto.id} item xs={12} sm={6} lg={4}>
                    <Card 
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            borderRadius: 3,
                            boxShadow: 3,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6,
                            }
                        }}>
                        <CardMedia 
                            component="img"
                            image={produto.img}
                            alt={produto.nome}
                            sx={{
                                height: { xs: 180, sm: 200 },
                                objectFit: "cover",
                            }}
                        />
                        <CardContent sx={{ 
                            flexGrow: 1, 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            p: { xs: 2, sm: 3 }
                        }}>
                            <Typography 
                                variant="h6" 
                                component="h3"
                                sx={{ 
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                    mb: 1
                                }}
                            >
                                {produto.nome}
                            </Typography>
                            <Typography 
                                variant="h5" 
                                color="primary"
                                sx={{ 
                                    fontWeight: 700,
                                    mt: 'auto'
                                }}
                            >
                                R$ {produto.preco}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ 
                            p: { xs: 2, sm: 3 },
                            pt: 0
                        }}>
                            <Button 
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => addToCart({ ...produto, quantidade: 1 })}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5
                                }}
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