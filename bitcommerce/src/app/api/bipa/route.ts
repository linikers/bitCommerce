import { NextRequest, NextResponse } from 'next/server';
import { QrCodePix } from 'qrcode-pix';
import QRCode from 'qrcode';

// function decodeLnurl(lnurl: string) {
//     // const limpaUrl = lnurl.replace("lnurl", '');
//     const { words  }= bech32.decode(lnurl, 1500);
//     const bytes = bech32.fromWords(words);
//     return Buffer.from(bytes).toString("utf-8");
    

// }

export async function POST(req:NextRequest) {
    // const lnurl = "lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhhqmmsw4kxzunvv9mnjdsgcmnwc";
    // const lnurlTratada = decodeLnurl(lnurl);
    // console.log(lnurlTratada);

    try {
        const { amount } = await req.json();
        // https://bipa.app/pagar?identifier=<IDENTIFIER>&amount=<VALOR_EM_SATS
        if (!amount || isNaN(amount)) {
            return NextResponse.json({error: "valor invalido"}, { status: 400 });
        }
        const chavePixBipa = '849f738c-1e93-4d78-ab52-f3c6890b997e';

        const qrcodePix = QrCodePix({
            version: '01',
            key: chavePixBipa,
            name:'teste',
            city: 'SaoPaulo',
            value: Number(amount),
            message: 'PedidoViaCommerce',
        });
        const payload =qrcodePix.payload();


        // 849f738c-1e93-4d78-ab52-f3c6890b997e
        console.log(chavePixBipa);
        console.log(amount);

        const qrCodebase64 = await QRCode.toDataURL(payload);
        // const decodedUrl = decodeLnurl(lnurl);c
        // const encodeUrl = encodeURIComponent(lnurl)
        // const sats = Math.floor(amount * 3333);
        // const paymentURL = `https://bipa.app/pagar?lnurl=${encodeUrl}&amount=${sats}`;
        // const paymentURL = `https://bipa.app/.well-known/lnurlp/${lnurl}?amount=${sats}`;
        // const paymentURL = `https://bipa.app/pay?identifier=${lnurl}&amount=${sats}&comment=ecommerce`;
        // const paymentURL = `https://bipa.app/pagar?pix=${chavePixBipa}&valor=${amount}`;
        // const paymentURL = `pix+brcode:?01BR.GOV.BCB.PIX0136${chavePixBipa}5204000053039865406110.005802BR5925NOME DO RECEBEDOR6009SAO PAULO62070503***6304`;

        console.log("payload", payload);
        // const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(payload)}`;

        return NextResponse.json({
            payment_url: payload,
            totalBrl: amount,
            // qrCode: `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(paymentURL)}`
            qrCode: qrCodebase64,
            chave: chavePixBipa,
            payload,
        });
// console.log();
    } catch (error) {
        console.error("Erro ao gerar pix", error);
        return NextResponse.json({ error: "Erro interno"}, { status: 500 });
    }
}
//https://bipa.app/pagar?lnurl=lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhhqmmsw4kxzunvv9mnjdsgcmnwc