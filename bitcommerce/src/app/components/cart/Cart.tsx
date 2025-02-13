'use client';
import { Button, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";

interface IProduto {
    name: string;
    preco: number;
  }
export function Cart() {
    const [cartItems, setCartItems] = useState<IProduto[]>([]);
    
    const addToCart = (produto: IProduto) => {
        setCartItems([
            ...cartItems,
            produto
        ]);
    };
/// criar um avaliador de curriculo
    return (
        <Container>
            <Typography>Carrinho de Compras</Typography>

            <List>
                {cartItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item.name} secondary={`R$: ${item.preco.toFixed(2)}`} />
                    </ListItem>
                ))}
            </List>
            <Button
                onClick={() => addToCart({name: "Produ", preco: 100})} 
            />
        </Container>
    )
}