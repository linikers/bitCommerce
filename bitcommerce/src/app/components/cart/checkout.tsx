'use client'

import { Button, Container, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";

export default function CheckoutPage() {

    // const router = useRouter();

    const handlePagamento = async() => {
        console.log("processando pagamento...");
    }

    return (
        <Container>
            <Typography variant="h3" gutterBottom>Checkout/Pagamento</Typography>
            {/* <checkoutForm /> */}
            <Button onClick={handlePagamento}>Pagar</Button>
        </Container>
    )
}