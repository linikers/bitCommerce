import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const callbackData = await req.json();
        console.log("pagamento recebido", callbackData);

                // Aqui você pode:
        // 1. Atualizar seu banco de dados
        // 2. Enviar e-mail de confirmação
        // 3. Liberar o produto/serviço
        return NextResponse.json({ status: 'ok'});
    } catch (error) {
        console.error("falha ao receber callback", error);
        return NextResponse.json({ error: 'falha no callback'}, { status: 500 });
    }
}