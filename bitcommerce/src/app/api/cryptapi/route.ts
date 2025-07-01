import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const mockData = {
    status: 'success',
    value_coin: "0.00042",
    address: "bc1quxnf29ppvxy85pgwzyxxf5aqalwwfql0r9attd",
    qrcode_url: "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=bitcoin:bc1quxnf29ppvxy85pgwzyxxf5aqalwwfql0r9attd",
    memo: ""
  };

  try {
    const { amount } = await request.json();
    if (!amount || isNaN(amount)) return NextResponse.json(mockData);

    // 1. Verifique se o valor atende ao mínimo
    if (amount < 10) { // Valor mínimo em BRL
      console.warn(`Valor ${amount} abaixo do mínimo`);
      return NextResponse.json(mockData);
    }

    // 2. Tente com GET primeiro (mais estável)
    const params = new URLSearchParams();
    params.append('address', 'bc1quxnf29ppvxy85pgwzyxxf5aqalwwfql0r9attd');
    params.append('callback', `${process.env.NEXT_PUBLIC_BASE_URL}/api/cryptapi/callback`);
    params.append('convert', '1');
    params.append('value', amount.toString());
    params.append('email', 'email@email.com');

    const apiUrl = `https://api.cryptapi.io/btc/create/?${params.toString()}`;
    console.log('URL da requisição:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' }
    });

    // 3. Verifique o status code
    if (response.status === 403) {
      throw new Error('403 Forbidden - Verifique seu endereço e configurações');
    }

    const data = await response.json();
    console.log('Resposta da API:', data);

    if (data.address_in && data.address_out) {
      return NextResponse.json({
        status: 'success',
        value_coin: (amount * 0.000042).toFixed(8), // Conversão mockada
        address: data.address_in,
        qrcode_url: `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=bitcoin:${data.address_in}`,
        memo: ''
      });
    }

    return NextResponse.json(mockData);

  } catch (error) {
    console.error('Erro na integração:', error);
    return NextResponse.json(mockData);
  }
}