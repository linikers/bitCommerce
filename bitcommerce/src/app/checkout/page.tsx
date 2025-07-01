/* eslint-disable @next/next/no-img-element */
'use client'

import {
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
// import { criarOrdemPagamento } from "@/app/utils/binance";
import React, { useEffect, useState } from "react";
// import { IProduto } from "../components/cart/Cart";
import CloseIcon from '@mui/icons-material/Close';
import { IProduto } from "../components/cart";
// import { response } from "express";

export interface IDadosCliente {
    nome: string;
    endereco: string;
    telefone: string;
    total: number;
    pedido: IProduto[];
}
export interface IDadosPagamento {
    cryptoAmount: string;
    cryptoCurrency: string;
    walletAddress: string;
    memo: string;
    qrCode: string;
    totalBrl: number;
    opcoesPagamento?: {
        bitcoin: {
            qrCode: string;
            address: string;
            amount: string;
        };
        pix?: {
            qrCode: string;
            chave: string;
        };
        cartao?: {
            linkPagamento: string;
        };
    };
}


export default function CheckoutPage() {

    const [openModal, setOpenModal] = useState(false);
    // const [qrCode, setQrcode] = useState("");
    const [dadosPagamento, setDadosPagamento] = useState<IDadosPagamento | null>(null);
    const [dadosCliente, setDadosCliente] = useState<IDadosCliente>({
        nome: '',
        endereco: '',
        telefone: '',
        total: 0,
        pedido: [],
    });

    useEffect(() => {
        const stored  = localStorage.getItem("checkoutData");
        if (stored) {
            const data = JSON.parse(stored);
            setDadosCliente((prev) => ({
                ...prev,
                ...data,
            }));
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDadosCliente({
            ...dadosCliente,
            [e.target.name]: e.target.value
        })
    }
    

    const handlePagamento = async() => {
        // localStorage.setItem("checkoutData", JSON.stringify(dadosCliente));

        console.log("processando pagamento via cryptAPI...");
        try {
            const response = await fetch("/api/cryptapi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    amount: String(dadosCliente.total), 
                    // currency: "BTC" 
                }),
            });

            
            const data = await response.json();
            if (!response.ok || data.error) throw new Error('Falha na resposta da api');
            console.log("Response front CryptAPI", data);
            // setDadosPagamento(data);
            if (!data.address) {
                throw new Error('Endereço de pagamento não gerado');
              }

            setDadosPagamento({
                totalBrl: dadosCliente.total,
                cryptoAmount: data.value_coin,
                cryptoCurrency: "BTC",
                walletAddress: data.address,
                qrCode: data.qrcode_url,
                memo: data.memo || '', // sem memo padrao para btc
            })
            setOpenModal(true);
            localStorage.setItem("cryptoPayment", JSON.stringify(data));

        } catch (error) {
            console.error("erro ao realizar pagamento", error);
            alert("Ocorreu um erro ao processar pagamento");
            
        }

    }

    return (
        <>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>
                    Pagamento via cripto
                    <IconButton onClick={() => setOpenModal(false)} 
                        sx={{ 
                            position: 'absolute',
                            right: 8,
                            top: 8
                            }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', padding: '18px' }}>
                    <Typography variant="h6" gutterBottom>
                        Valor Total R$: {dadosPagamento?.totalBrl.toFixed(2)}
                    </Typography>
                    {/* <Typography variant="subtitle" gutterBottom sx={{ mb:2 }}>
                    {dadosPagamento?.cryptoAmount} BTC
                    </Typography> */}
                        <img 
                            src={dadosPagamento?.qrCode} 
                            alt="QR code de pagamento" 
                            style={{ 
                                width: '256px',
                                height: '256px',
                                margin: '0 auto',
                                display: 'block ',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px'}}
                        />
                    <Typography variant="body2" sx={{ marginTop: 2}}>
                            Ou envie  para: <br/>
                            <code>{dadosPagamento?.walletAddress}</code>
                            {dadosPagamento?.memo && (
                                <>
                                    <br />Memo/Tag: <code>{dadosPagamento.memo}</code>
                                </>
                            )}
                    </Typography>
                </DialogContent>
            </Dialog>
        <Container>
            <Typography variant="h5" gutterBottom>Checkout/Pagamento</Typography>
            
            <TextField label="Nome" name="nome" value={dadosCliente.nome} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Endereço" name="endereco" value={dadosCliente.endereco} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Telefone" name="telefone" value={dadosCliente.telefone} onChange={handleChange} fullWidth margin="normal" />
   
            <Typography variant="h5">Total: R$ {dadosCliente.total.toFixed(2)}</Typography>
            {/* <Typography variant="body1">{btcValue}</Typography> */}

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
        </>
    )
}
// const response = await axios.get('http://localhost:3001/binance/address?coin=BTC');
