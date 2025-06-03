import axios from "axios";
import CryptoJS from "crypto-js";

const BINANCE_API_KEY = 'vIY9Fpnpd1wYzTLZJ0hBktswMzQFyJUGyc4lHVQBSNE9Q3chLWqFbt8F9r46jTQC';
const BINANCE_API_SECRET ='XumrfHM7q2iDxjWyZDJ0x1reUYgsmFktBBcXrqYdzgA3wXYJ8wi8THW0FPVfAAk2';
const url = "https://api.binance.com";


export async function criarOrdemPagamento(
  // amount: number,
  // currency: string, 
  // nome: string, 
  // endereco: string, 
  // telefone: string
  amount: number,
  currency: string = "BTC"
) {
  
  const timestamp = Date.now();
  // const payload = {
  //     // merchantTradeTo: ``
  //     merchantTradeNumber: `ordem_${timestamp}`,
  //     totalFee: amount * 100,
  //     currency,
  //     tradeType: "WEB",
  //     productType: "PAY",
  //     productName: "Pedido Online",
  //     productDetail: `Cliente: ${nome}, endereço: ${endereco}, telefone: ${telefone}`,
  //     returnUrl: "https://sute.app/sucesso",
  //     cancelUrl: "https://sute.app/cancel"
  //   };

    
    // const sortedKeys = Object.keys(payload).sort();
    // const queryString = sortedKeys.map(key => `${key}=${payload[key as keyof typeof payload]}`).join("&");
    // const queryString = Object.keys(payload).map(key => `${key}=${payload[key as keyof typeof payload]}`).join("&");
    const queryString = `timestamp=${timestamp}&coin=${currency}`
    // const signature = CryptoJS.HmacSHA256(queryString, BINANCE_API_SECRET).toString(CryptoJS.enc.Hex);
    const signature = CryptoJS.HmacSHA256(queryString, BINANCE_API_SECRET).toString();

    try {
      const response = await axios.get(`${url}/sapi/v1/capital/address?${queryString}&signature=${signature}`, {
        headers: {
          "X-MBX-APIKEY": BINANCE_API_KEY,
        },
      });
      //convert
      const rateResponse = await axios.get(`${url}/api/v3/ticker/price?symbol=USDBRL`);
      const usdToBrl = parseFloat(rateResponse.data.price);
      const cryptoAmount = amount /usdToBrl

      const qrCodeGenerate = `https://api.qrserver.com/v1/create-qr-code/size=200x200data=${currency}:${response.data.address}?amount=${cryptoAmount}`;
      // return response.data
      return {
        cryptoAmount: cryptoAmount.toFixed(6),
        cryptoCurrency: currency,
        walletAddess: response.data.address,
        memo: response.data.tag || "",
        qrCodeGenerate,
      }
    } catch (error) {
      console.error("erro ao gerar endereço", error);
      return null;
    }
    // try {
    //   const response = await axios.post(
    //     `${url}/binancepay/openapi/v3/order`,
    //     payload,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Binance-Timestamp": timestamp.toString(),
    //         "BinancePay-Nonce": Math.random().toString(36).substring(7),
    //         "BinancePay-Certificate-SN": BINANCE_API_KEY,
    //         "BinancePay-Signature": signature
    //       }
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error(error);
    //   return null
    // }
  }


export async function criarPagamentoCripto(valor: number, moeda: string) {
  const response = await axios.post('https://api.binance.com/pay', {
    amount: valor,
    currency: moeda,
  });
  return response.data.qrCode;
}



// **

// // utils/binance.ts - Versão corrigida
// import axios from "axios";
// import CryptoJS from "crypto-js";

// const BINANCE_API_KEY = 'SUA_API_KEY_REAL'; // Substitua pela sua chave
// const BINANCE_API_SECRET = 'SUA_API_SECRET_REAL'; // Substitua pelo seu segredo

// export async function criarOrdemPagamento(amount: number, currency: string = "USDT") {
//   try {
//     // 1. Obter endereço de depósito
//     const timestamp = Date.now();
//     const queryString = `timestamp=${timestamp}&coin=${currency}`;
//     const signature = CryptoJS.HmacSHA256(queryString, BINANCE_API_SECRET).toString(CryptoJS.enc.Hex);

//     const addressResponse = await axios.get(
//       `https://api.binance.com/sapi/v1/capital/deposit/address?${queryString}&signature=${signature}`,
//       { headers: { "X-MBX-APIKEY": BINANCE_API_KEY } }
//     );

//     // 2. Converter valor para cripto
//     const rateResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=USDTBRL');
//     const usdtToBrl = parseFloat(rateResponse.data.price);
//     const cryptoAmount = amount / usdtToBrl;

//     // 3. Gerar QR Code
//     const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currency}:${addressResponse.data.address}?amount=${cryptoAmount}`;

//     return {
//       cryptoAmount: cryptoAmount.toFixed(6),
//       cryptoCurrency: currency,
//       walletAddress: addressResponse.data.address,
//       memo: addressResponse.data.tag || "",
//       qrCode
//     };
//   } catch (error) {
//     console.error("Erro na API Binance:", error);
//     return null;
//   }
// }