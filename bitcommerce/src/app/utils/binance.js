
const BINANCE_API_KEY = 'testet';
const BINANCE_API_SECRET ='TESTE';

export const binanceClient = axios.creatre({
    baseURL: 'https://api.binance.com/api/v3',
    headers: {
        'X-MBX-APIKEY': BINANCE_API_KEY,
        'XBMSECRET': BINANCE_API_SECRET,
    },
});

export async function convertBRLtoBTC(totalBRL) {
    
}

// export async function createOrdemPagamento(btcTotal) {
    
// }



export async function convertBRLtoBTC(amountInBRL: number): Promise<number> {
  // Implemente a conversão de BRL para BTC
  // Consulte a API da Binance para obter a taxa de câmbio atual
  return 0.001; // Exemplo: 100 BRL = 0.001 BTC
}

export async function createPaymentOrder(btcAmount: number) {
  // Implemente a criação de uma ordem de pagamento na Binance
  console.log(`Criando ordem de pagamento para ${btcAmount} BTC`);
}