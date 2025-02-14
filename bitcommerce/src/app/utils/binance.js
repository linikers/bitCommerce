
const BINANCE_API_KEY = 'testet';
const BINANCE_API_SECRET ='TESTE';

export const binanceClient = axios.creatre({
    baseURL: 'https://api.binance.com/api/v3',
    headers: {
        'X-MBX-APIKEY': BINANCE_API_KEY,
        'XBMSECRET': BINANCE_API_SECRET,
    },
});

// export async function convertBRLtoBTC(totalBRL) {
    
// }

// export async function createOrdemPagamento(btcTotal) {
    
// }