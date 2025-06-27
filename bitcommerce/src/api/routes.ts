// import { Request, Response } from 'express';
import { Request, Response, NextFunction, Router } from 'express';
import { BinanceController } from './controller';
import { NextResponse } from 'next/server';

export const routes = Router();
const crt = new BinanceController();

// routes.post('/binance/pagamento', crt.criarOrdemPagamento.bind(crt));

routes.post(
    '/binance/pagamento',
    (req: Request, res: Response, next: NextFunction) => {
      crt.criarOrdemPagamento(req, res).catch(next);
    }
  );


  // const expectedSignature = crypto.
  
  export async function POSTcrypt(req: Request) {
    try {
      const callbackData = await req.json();
      console.log('cryptapi callback', callbackData)
      return NextResponse.json({ status: 'ok'})
    } catch (error) {
      console.error('Erro de callback', error);
      return NextResponse.json({error: 'Falha ao processar a callback'}, { status: 500 })
    }
  }


// Cliente (BRL) → CryptAPI (conversão) → SUA CARTEIRA PESSOAL (BTC/ETH/etc.)

  //verificar status pedidos
  export async function GETcrypt(req:Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    const currency =searchParams.get('currency') || 'btc';

    const response = await fetch(`https://api.cryptapi.io/${currency}/logs/?address${address}`);
    const data = await response.json();

    return NextResponse.json(data);
  }