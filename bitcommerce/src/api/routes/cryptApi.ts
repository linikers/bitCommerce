// // import { error } from "console";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     try {
//         const { amount, currency = 'BTC' } = await req.json();

//         if (!amount || isNaN(amount)) {
//             return NextResponse.json({ error: 'Amount é necessario ser um número'}, { status: 400 });
//         }
        
//         //conf do crypt
//         const cryptApiParams = {
//             type: currency.toLowerCase(), //btc / eth
//             adress:'bc1quxnf29ppvxy85pgwzyxxf5aqalwwfql0r9attd', //carteira recebimento (codigo do exodus),
//             post: '1', //notificacao post para seu servidor
//             callback: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cryptapi/callback`, //
//             convert:'1', //converter automaticamente para cripto
//             email: 'email@email.com', //opcional para notificar
//             value: amount, //valor em brl
//         };

//         //chamada api cript
//         const response = await fetch(`https://api.cryptapi.io/${currency}/create/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(cryptApiParams),
//         });

//         const data = await response.json();

//         if (!data.status) {
//             throw new Error(data.error);
//         }

//         return NextResponse.json({
//             cryptoAmount: data.value_coin,
//             cryptoCurrency: currency,
//             walletAdress: data.address,
//             qrCode: data.qrcode_url,
//             paymentUrl: data.payment_url,
//             expiresAt: data.timeout,
//         });

//     } catch (error) {
//         console.error('CruptApi error:', error);
//         return NextResponse.json({ error: 'Falha ao processsar ágamento'}, {status: 500});
//     }
    
// }