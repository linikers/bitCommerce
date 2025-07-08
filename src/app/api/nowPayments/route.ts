import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(request: Request) {
  const { amount } = await request.json();

  // 1. Cria a invoice na NowPayments
  const response = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: amount,
      price_currency: "brl", // BRL
      pay_currency: "btc",   // Receber em BTC
    }),
  });

  const data = await response.json();

  // 2. Gera QR Code a partir da URL de pagamento
  const qrCodeDataUrl = await QRCode.toDataURL(data.invoice_url);

  return NextResponse.json({
    payment_url: data.invoice_url, // Link para o cliente pagar
    qr_code: qrCodeDataUrl,       // QR Code em base64 (para mostrar no frontend)
    btc_amount: data.pay_amount,   // Valor em BTC
  });
}

//**
// import { gerarPayloadPix } from 'pix-utils'; // Biblioteca fictícia

// 1. Gere o payload PIX
// const payload = gerarPayloadPix({
//   chave: "seu-pix@email.com",
//   valor: amount,
//   cidade: "Sao Paulo",
//   nome: "Sua Loja",
//   txId: "123456"
// });

// // 2. Crie o QR Code a partir do payload
// const qrCodePix = await QRCode.toDataURL(payload);

// return NextResponse.json({
//   qr_code: qrCodePix, // QR Code PIX válido
//   payload: payload    // Opcional: mostra o código copia-e-cola
// });