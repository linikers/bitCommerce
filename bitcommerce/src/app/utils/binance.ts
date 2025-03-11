import axios from "axios";
import CryptoJS from "crypto-js";

const BINANCE_API_KEY = 'testet';
const BINANCE_API_SECRET ='TESTE';
const url = "https://www.bpay.binanceapi.com";


export async function criarOrdemPagamento(
  amount: number,
  currency: string, 
  nome: string, 
  endereco: string, 
  telefone: string
) {
  
  const timestamp = Date.now();
  const payload = {
      // merchantTradeTo: ``
      merchantTradeNumber: `ordem_${timestamp}`,
      totalFee: amount * 100,
      currency,
      tradeType: "WEB",
      productType: "PAY",
      productName: "Pedido Online",
      productDetail: `Cliente: ${nome}, endereço: ${endereco}, telefone: ${telefone}`,
      returnUrl: "https://sute.app/sucesso",
      cancelUrl: "https://sute.app/cancel"
    };

    const sortedKeys = Object.keys(payload).sort();
    const queryString = sortedKeys.map(key => `${key}=${payload[key as keyof typeof payload]}`).join("&");
    // const queryString = Object.keys(payload).map(key => `${key}=${payload[key as keyof typeof payload]}`).join("&");
    const signature = CryptoJS.HmacSHA256(queryString, BINANCE_API_SECRET).toString(CryptoJS.enc.Hex);

    try {
      const response = await axios.post(
        `${url}/binancepay/openapi/v3/order`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Binance-Timestamp": timestamp.toString(),
            "BinancePay-Nonce": Math.random().toString(36).substring(7),
            "BinancePay-Certificate-SN": BINANCE_API_KEY,
            "BinancePay-Signature": signature
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null
    }
  }

// export const binanceClient = axios.creatre({
//     baseURL: 'https://api.binance.com/api/v3',
//     headers: {
//         'X-MBX-APIKEY': BINANCE_API_KEY,
//         'XBMSECRET': BINANCE_API_SECRET,
//     },
// });

// export async function convertBRLtoBTC(totalBRL) {
    
// }

// // export async function createOrdemPagamento(btcTotal) {
    
// // }



// export async function convertBRLtoBTC(amountInBRL: number): Promise<number> {
//   // Implemente a conversão de BRL para BTC
//   // Consulte a API da Binance para obter a taxa de câmbio atual
//   return 0.001; // Exemplo: 100 BRL = 0.001 BTC
// }

// export async function createPaymentOrder(btcAmount: number) {
//   // Implemente a criação de uma ordem de pagamento na Binance
//   console.log(`Criando ordem de pagamento para ${btcAmount} BTC`);
// }