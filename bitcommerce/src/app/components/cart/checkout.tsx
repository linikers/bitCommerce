'use client'

import { Button, Container, Typography } from "@mui/material";
import { criarOrdemPagamento } from "@/app/utils/binance";
import { useEffect, useState } from "react";
import { produtos } from "../../../../products";
// import { useRouter } from "next/navigation";

export default function CheckoutPage() {

    // const router = useRouter();
    const [dadosCliente, setDadosCliente] = useState({
        nome: "",
        endereco: "",
        telefone: "",
        pedido: [],
        total: 0,
    })
    // const [total, setTotal] = useState();
    useEffect(() => {
        const checkoutData = localStorage.getItem("checkoutData");
        setDadosCliente(JSON.parse(checkoutData));
    }, [])

    // const checkoutData = localStorage.getItem("checkoutData");
    // if (checkoutData) {
    //     const { nome, endereco, cart } = JSON.parse(checkoutData);
    // }

    const handlePagamento = async() => {
        console.log("processando pagamento...");
        const pagamento = await criarOrdemPagamento(
            dadosCliente.total,
            "USDT",
            dadosCliente.nome,
            dadosCliente.endereco,
            dadosCliente.telefone
        );

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
            <Typography variant="h5">Nome: {dadosCliente.nome}</Typography>
            <Typography variant="h5">Endereço: {dadosCliente.endereco}</Typography>
            <Typography variant="h5">Telefone: {dadosCliente.telefone}</Typography>
            <Typography variant="h5">Total: R$ {dadosCliente.total}</Typography>

            {dadosCliente.pedido.map((produto, index) => (
                <Typography key={index} variant="body2">
                    {produto.nome} - R$: {produto.preco.toFixed(2)}
                </Typography>
            ))}
            
            <Button onClick={handlePagamento} variant="contained" color="primary">Pagar</Button>
        </Container>
    )
}