import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const { amount } = await req.json();

        if (!amount || isNaN(amount)) {
            return NextResponse.json({error: "valor invalido"}, { status: 400 });
        }

        const paymentURL = `https://bipa.app/pagar?lnurl=${process.env.LNURL_WOS}`;

        return NextResponse.json({
            payment_url: paymentURL,
            totalBrl: amount,
            qrCode: `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(paymentURL)}`,
        });

    } catch (error) {
        console.error("Erro ao gerar pix", error);
        return NextResponse.json({ error: "Erro interno"}, { status: 500 });
    }
}