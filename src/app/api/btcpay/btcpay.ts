import { NextResponse } from "next/server";

export  async function POSTBrlToBtc(request:Request) {
    try {
        const { amount } = await request.json();

        const response = await fetch(`${process.env.BTC}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.BTCPAY_API_KEY}`
            },
            body: JSON.stringify({
                amount: amount,
                currency: "BRL",
                crypto_currency: "BTC",
                checkout: {
                    paymentMehods: ["BTC", "pix"],
                    redirectURL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
                }, 
            }),

        });

        const data = await response.json();

        return NextResponse.json({
            payment_id: data.id,
            qr_code: data.checkoutLink, // Link para checkout BTCPay (com PIX)
            btc_amount: data.btcDue, // Valor em BTC
            payment_url: data.url, // URL completa do pagamento
            expires_at: data.expiryTime,
        })
    } catch (error) {
        console.error("Erro nTokens:", error);
        return NextResponse.json(
          { error: "Falha ao gerar pagamento" },
          { status: 500 }
        );
    }
}

//CoinPayments.net 
//Bity.com
//btcpay server cria conta 
//NowPayments.io (suporta PIX, mas com KYC)


// Adicione um webhook para:

//     URL: https://seusite.com/api/btcpay-webhook

//     Eventos: InvoiceReceived, InvoiceSettled.