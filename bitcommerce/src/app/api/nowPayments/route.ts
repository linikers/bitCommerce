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
// components/PixPayment.tsx
// "use client";
// import { useState } from "react";

// export default function PixPayment() {
//   const [amount, setAmount] = useState(50); // R$ 50,00
//   const [paymentData, setPaymentData] = useState<{
//     payment_url: string;
//     qr_code: string;
//     btc_amount: number;
//   } | null>(null);

//   const handleGeneratePix = async () => {
//     const res = await fetch("/api/nowpayments", {
//       method: "POST",
//       body: JSON.stringify({ amount }),
//     });
//     const data = await res.json();
//     setPaymentData(data);
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//       />
//       <button onClick={handleGeneratePix}>Gerar PIX</button>

//       {paymentData && (
//         <div>
//           <p>Pague R$ {amount} via PIX:</p>
//           <img src={paymentData.qr_code} alt="QR Code PIX" />
//           <p>Você receberá: {paymentData.btc_amount} BTC</p>
//           <a href={paymentData.payment_url} target="_blank">
//             Ou clique aqui para pagar
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }