// import { error } from "console";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        if (!amount || isNaN(amount)) {
            return NextResponse.json({ error: 'Amount é necessario ser um número'}, { status: 400 });
        }
        
        //conf do crypt
        const cryptApiParams = new URLSearchParams();
        cryptApiParams.append('address', 'bc1quxnf29ppvxy85pgwzyxxf5aqalwwfql0r9attd');
        cryptApiParams.append('callback', `${process.env.NEXT_PUBLIC_BASE_URL}/api/cryptapi/callback`);
        cryptApiParams.append('convert', '1');
        cryptApiParams.append('value', amount.toString());
        cryptApiParams.append('email', 'seu-email@dominio.com');
            // type: currency.toLowerCase(), //btc / eth
            // adress:'bc1quxnf29ppvxy85pgwzyxxf5aqalwwfql0r9attd', //carteira recebimento (codigo do exodus),
            // post: '1', //notificacao post para seu servidor
            // callback: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cryptapi/callback`, //
            // convert:'1', //converter automaticamente para cripto
            // email: 'email@email.com', //opcional para notificar
            // value: amount, //valor em brl

        //chamada api cript
        const response = await fetch(`https://api.cryptapi.io/btc/create/?${cryptApiParams.toString()}`);

        const data = await response.json();
        console.log("resposta api", data);
        
        if (!data.address) {
            throw new Error(data.error || 'Erro ao gerar pagamento');
          }
      

          return NextResponse.json({
            status: 'success',
            value_coin: data.value_coin,
            address: data.address,
            qrcode_url: `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=bitcoin:${data.address}`,
            memo: data.memo || '',
          });
        // return NextResponse.json({
        //     // cryptoAmount: data.value_coin,
        //     // cryptoCurrency: currency,
        //     // walletAdress: data.address,
        //     // qrCode: data.qrcode_url,
        //     // paymentUrl: data.payment_url,
        //     // expiresAt: data.timeout,
        //     status: 'sucess',
        //     value_coin: data.value_coin,
        //     address: data.address,
        //     qrcode_url: data.qrcode_url,
        //     payment_url: data.payment_url,
        //     memo: data.memo || '',
        // });

    } catch (error) {
        console.error('CruptApi error:', error);
        return NextResponse.json(
            { error: 'Falha ao processsar pagamento'},
            {status: 500}
        );
    }
    
}