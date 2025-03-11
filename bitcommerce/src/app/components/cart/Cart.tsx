'use client';
import { RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { Button, Card, CardContent,  Container,  IconButton,  Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export interface IProduto {
    id: number,
    nome: string,
    preco?: number,
    img?: string,
    quantidade: number,
  }
  export interface CartProps {
    cart: IProduto[];
    removeFromCart: (index: number) => void;
  }
export function Cart({ cart, removeFromCart }: CartProps) {

    const router = useRouter();
    const pageCheckout = '/checkout';

    const total = Array.isArray(cart) ? cart.reduce((sum, produto) => sum + (produto.preco || 0) * produto.quantidade, 0) : 0;
    
    const handleCheckOut = () => {
        const checkoutData = {
         pedido: cart,
         total: total
        };
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
        router.push(pageCheckout);
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
                        <div key={produto.id}>
                            {produto.nome} - R$: {produto.preco?.toFixed(2)} x { produto.quantidade}
                            <IconButton onClick={() => removeFromCart(index)}>
                                    <RemoveCircleOutlineOutlined />
                            </IconButton>
                        </div>
                    ))
                )}
                <Typography variant="h6">Total: R${total.toFixed(2)}</Typography>
            </CardContent>
        </Card>
        <Button sx={{ marginTop: 2 }} onClick={handleCheckOut}>Finalizar Compra</Button>
        </Container>
    )
}