"use client";
import {
  RemoveCircleOutlineOutlined,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export interface IProduto {
  id: number;
  nome: string;
  preco?: number;
  img?: string;
  quantidade: number;
}
export interface CartProps {
  cart: IProduto[];
  removeFromCart: (index: number) => void;
}
export function Cart({ cart, removeFromCart }: CartProps) {
  const router = useRouter();
  const pageCheckout = "/checkout";

  const total = Array.isArray(cart)
    ? cart.reduce(
        (sum, produto) => sum + (produto.preco || 0) * produto.quantidade,
        0
      )
    : 0;

  const handleCheckOut = () => {
    const checkoutData = {
      pedido: cart,
      total: total,
    };
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    router.push(pageCheckout);
  };
  return (
    <Container>
      <Card sx={{ p: 3, mt: 4, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <ShoppingCartCheckoutOutlined fontSize="large" />
            <Typography variant="h5" fontWeight="bold">
              Carrinho de Compras
            </Typography>
          </Stack>
          {cart.length === 0 ? (
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Seu carrinho está vazio
            </Typography>
          ) : (
            <Stack spacing={2}>
              {cart.map((produto, index) => (
                <Stack
                  key={produto.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">
                    {produto.nome} - R$ {produto.preco?.toFixed(2)}
                  </Typography>
                  <IconButton
                    onClick={() => removeFromCart(index)}
                    color="error"
                  >
                    <RemoveCircleOutlineOutlined />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: R${total.toFixed(2)}</Typography>
          {cart.length > 0 && (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, fontSize: "1rem" }}
              onClick={handleCheckOut}
            >
              Finalizar Compra
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
