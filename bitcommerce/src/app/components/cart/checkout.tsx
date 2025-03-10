'use client'

import { Button, Container, Typography } from "@mui/material";
import { criarOrdemPagamento } from "@/app/utils/binance";
// import { useRouter } from "next/navigation";

export default function CheckoutPage() {

    // const router = useRouter();

    const handlePagamento = async() => {
        console.log("processando pagamento...");
        const pagamento = await criarOrdemPagamento(100, "USDT");

        if (pagamento?.code === "00000") {
            window.location.href = pagamento.data.qrContent;
        } else {
            console.error("erro ao realizar pagamento", pagamento);
        }
    }

    return (
        <Container>
            <Typography variant="h3" gutterBottom>Checkout/Pagamento</Typography>
            {/* <checkoutForm /> */}
            <Button onClick={handlePagamento} variant="contained" color="primary">Pagar</Button>
        </Container>
    )
}