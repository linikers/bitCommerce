/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    TextField,
    Typography,
    Tabs,
    Tab,
    Divider,
    Box
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { IProduto } from "../components/cart";
import Header from "../components/Header";
// import Image from 'next/image'; não usar no qrCode

export interface IDadosCliente {
    nome: string;
    endereco: string;
    telefone: string;
    total: number;
    pedido: IProduto[];
}
export interface IDadosPagamento {
    cryptoCurrency: string;
    walletAddress: string;
    memo: string;
    qrCode: string;
    totalBrl: number;
    paymentUrl?: string;
    chave?: string;
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
    const [dadosPagamento, setDadosPagamento] = useState<IDadosPagamento | null>(null);
    const [dadosCliente, setDadosCliente] = useState<IDadosCliente>({
        nome: '',
        endereco: '',
        telefone: '',
        total: 0,
        pedido: [],
    });

    const [paymentMethod, setPaymentMethod] = useState<'pix' | 'btc'>("pix");
    const [isLoading, setIsLoading] = useState(false);

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
    

    const handlePagamentoPix = async () => {

        setIsLoading(true);

        try {
            // console.log("Enviando para /api/bipa:", { amount: dadosCliente.total });
            // console.log(dadosCliente);
            // console.log(dadosPagamento);
            const response = await fetch("/api/bipa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: dadosCliente.total })
            });

            const data = await response.json();
            // console.log(data);
            if (!response.ok) throw new Error("Falha ao gerar pix");

            setDadosPagamento({
                totalBrl: dadosCliente.total,
                cryptoCurrency: "BTC",
                walletAddress: "Wallet of Satoshi",
                qrCode: data.qrCode,
                memo: "",
                paymentUrl: data.payment_url,
                chave: data.chave,
            });

            setOpenModal(true);

            localStorage.setItem("cryptoPayment", JSON.stringify(data));
            // console.log(dadosPagamento);
        } catch (error) {
            console.error("Erro ao gerar pix:", error);
            alert("Erro ao processar pix");
        } finally {
            setIsLoading(false);
        }
    }
    const handlePagamento = async () => {
        // localStorage.setItem("checkoutData", JSON.stringify(dadosCliente));
        //crypt funciona
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
            // console.log("Response front CryptAPI", data);
            // setDadosPagamento(data);
            if (!data.address) {
                throw new Error('Endereço de pagamento não gerado');
              }

            setDadosPagamento({
                totalBrl: dadosCliente.total,
                // cryptoAmount: data.value_coin,
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
    // console.log("dados pagamento", dadosPagamento);
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
                            <Tabs value={paymentMethod} onChange={(e: any, nValue: any) => setPaymentMethod(nValue)}>
                                <Tab label="PIX" value="pix"/>
                                <Tab label="BTC" value="btc"/>
                            </Tabs>
                            {paymentMethod === 'pix' && dadosPagamento?.qrCode && (
                                <Box>
                                    <img src={dadosPagamento?.qrCode} alt="QrCode pix" />
                                    <Typography variant="body1">Valor PIX: {dadosPagamento?.totalBrl}</Typography>
                                    <Divider />
                                    <Typography variant="body1"  color="primary">{dadosPagamento.chave}</Typography>
                                    <Typography variant="body1">Chave Pix</Typography>
                                </Box>
                            )}
                            {paymentMethod === 'btc' && (
                                <Box>
                                    <img src={dadosPagamento?.walletAddress} alt="QrCode btc" />
                                </Box>
                            )}

                </DialogContent>
            </Dialog>
        <Header />
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
            
            <Button 
                onClick={() => paymentMethod === 'pix' ? handlePagamentoPix() : handlePagamento}
                disabled={isLoading}
                variant="contained"
                color="primary"
            >
                Pagar
            </Button>
        </Container>
        </>
    )
}
// const response = await axios.get('http://localhost:3001/binance/address?coin=BTC');
//rotina bipa + wos(wallet of satoshi) em