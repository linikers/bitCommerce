'use client';
import { Button, Card, CardContent,  Container,  Typography } from "@mui/material";
import { useRouter } from "next/router";
// import { useState } from "react";


export interface IProduto {
    nome: string;
    preco?: number;
    img?: string;
  }
  export interface CartProps {
    cart: IProduto[];
  }
export function Cart({ cart }: CartProps) {
    // const [dadosCli, setDadosCli] = useState([]);
    const router = useRouter();
    const pageCheckout = '/checkout'
    const total = cart.reduce((sum, produto) => sum + (produto.preco || 0), 0);
    
    const handleCheckOut = () => {
        const checkoutData = {
         cart, total
        };
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
        router.push = (pageCheckout);
    }
    return (
        <Container>
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="h5">Carrinho</Typography>
                {cart.length === 0 ? (
                    <Typography variant='h4'>Seu carrinho está vazio</Typography> 
                ) : (
                    cart.map((produto, index) => (
                        <Typography key={index} variant="body2">
                            {produto.nome} - R$: {produto.preco?.toFixed(2)}
                        </Typography>
                    ))
                )}
                <Typography variant="h6">Total: R${total.toFixed(2)}</Typography>
            </CardContent>
        </Card>
        <Button sx={{ marginTop: 2 }} onClick={handleCheckOut}>Finalizar Compra</Button>
        </Container>
    )
}