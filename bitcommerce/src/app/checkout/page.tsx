'use client'

import { Button, Container, TextField, Typography } from "@mui/material";
import { criarOrdemPagamento } from "@/app/utils/binance";
import React, { useEffect, useState } from "react";
import { IProduto } from "../components/cart/Cart";

export interface IDadosCliente {
    // id: number;
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
    const [ btcValue, setBtcValue] = useState<string>("0")

    useEffect(() => {
        const checkoutData = localStorage.getItem("checkoutData");
        if (checkoutData) {
            try {
                // const parsedData: IDadosCliente = JSON.parse(checkoutData);
                const parsedData = JSON.parse(checkoutData);
                setDadosCliente((prev) => ({
                    ...prev,
                    pedido: parsedData.pedido,
                    total: parsedData.total
                }));

                fetchBtcPrice(parsedData.total);
                
            } catch (error) {
                console.error("Erro no checkout",error)
            }
        }
    }, [])

    const fetchBtcPrice = async (totalReal: number ) => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
            
            const data = await response.json();
            
            const btcPreco = data.bitcoin.brl;
            const btcTotal = totalReal / btcPreco;
            
            setBtcValue(btcTotal.toFixed(8));
        } catch (error) {
            console.error("Erro ao fazer cotação BTC", error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDadosCliente({ ...dadosCliente, [e.target.name]: e.target.value });
    };

    const handlePagamento = async() => {
        localStorage.setItem("checkoutData", JSON.stringify(dadosCliente));

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
            <Typography variant="h5" gutterBottom>Checkout/Pagamento</Typography>
            
            <TextField label="Nome" name="nome" value={dadosCliente.nome} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Endereço" name="endereco" value={dadosCliente.endereco} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Telefone" name="telefone" value={dadosCliente.telefone} onChange={handleChange} fullWidth margin="normal" />
   
            <Typography variant="h5">Total: R$ {dadosCliente.total.toFixed(2)}</Typography>
            <Typography variant="body1">{btcValue}</Typography>

            {dadosCliente.pedido.length > 0 ? (
                dadosCliente.pedido.map((produto, ) => (
                <Typography key={produto.id} variant="body2">
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