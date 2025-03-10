import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            // main: '#89D99D',
            main: "#CCEA8D",
        },
        secondary: {
            main: "#164773"
            // main: "#3B8C6E",
        }
    }
});
//#164773 azul
//#CCEA8D verde 
export default theme;

import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useRouter } from 'next/router';  // Importando o hook useRouter

export function Cart({ cart }: CartProps) {
    const router = useRouter();  // Usando o hook useRouter
    const total = cart.reduce((sum, produto) => sum + (produto.preco || 0), 0);
 
    const handleCheckOut = () => {
        const checkoutData = { cart, total };
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
        router.push("/checkout");  // Usando router.push para navegação
    };
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
    );
}
