'use client';
import { Card, CardContent,  Typography } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
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
    // const [cartItems, setCartItems] = useState<IProduto[]>([]);
    // const router = useRouter();
    
    // const addToCart = (produto: IProduto) => {
    //     setCartItems([
    //         ...cartItems,
    //         produto
    //     ]);
    // };
    // const handleCheckout = () => {
    //     addToCart();
    //     router.push('/checkout');
    // }
/// criar um avaliador de curriculo
    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="h5">Carrinho</Typography>
                {cart.length === 0 ? (
                    <Typography variant='h4'>Seu carrinho está vazio</Typography> 
                ) : (
                    cart.map((produto, index) => (
                        <Typography key={index} variant="body2">
                            {produto.nome} - R$: {produto.preco}
                        </Typography>
                    ))
                )}
            </CardContent>
        </Card>
    )
}