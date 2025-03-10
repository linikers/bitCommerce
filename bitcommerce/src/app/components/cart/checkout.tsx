'use client'

import { Button, Container, Typography } from "@mui/material";
import { criarOrdemPagamento } from "@/app/utils/binance";
import { useEffect, useState } from "react";
import { IProduto } from "./Cart";

export interface IDadosCliente {
    nome: string;
    endereco: string;
    telefone: string;
    pedido: IProduto[];
    total: number;
}
export default function CheckoutPage() {

    const [dadosCliente, setDadosCliente] = useState<IDadosCliente>({
        nome: "",
        endereco: "",
        telefone: "",
        pedido: [],
        total: 0,
    })

    useEffect(() => {
        const checkoutData = localStorage.getItem("checkoutData");
        if (checkoutData) {
            try {
                // const parsedData: IDadosCliente = JSON.parse(checkoutData);
                setDadosCliente(JSON.parse(checkoutData));
                
            } catch (error) {
                console.error("Erro no checkout",error)
            }
        }
    }, [])

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
            <Typography variant="h5">Nome: {dadosCliente.nome || "não informado"}</Typography>
            <Typography variant="h5">Endereço: {dadosCliente.endereco || "não informado"}</Typography>
            <Typography variant="h5">Telefone: {dadosCliente.telefone || "não informado"}</Typography>
            <Typography variant="h5">Total: R$ {dadosCliente.total.toFixed(2) || "não informado"}</Typography>

            {dadosCliente.pedido.length > 0 ? (
                dadosCliente.pedido.map((produto, index) => (
                <Typography key={index} variant="body2">
                    {produto.nome} - R$: {produto.preco ? produto.preco.toFixed(2) : "0:00"}
                </Typography>
                ))
            ) : (
                <Typography variant="body2">Nenhum produto no pedido</Typography>
            )}
            
            <Button onClick={handlePagamento} variant="contained" color="primary">Pagar</Button>
        </Container>
    )
}