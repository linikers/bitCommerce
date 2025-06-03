import axios from "axios";
import CryptoJS from "crypto-js";

const BINANCE_API_KEY = 'vIY9Fpnpd1wYzTLZJ0hBktswMzQFyJUGyc4lHVQBSNE9Q3chLWqFbt8F9r46jTQC';
const BINANCE_API_SECRET ='XumrfHM7q2iDxjWyZDJ0x1reUYgsmFktBBcXrqYdzgA3wXYJ8wi8THW0FPVfAAk2';
const url = "https://api.binance.com";


export async function criarOrdemPagamento(
  amount: number,
  currency: string = "BTC"
) {
  
  const timestamp = Date.now();
  
    const queryString = `timestamp=${timestamp}&coin=${currency}`
    // const signature = CryptoJS.HmacSHA256(queryString, BINANCE_API_SECRET).toString(CryptoJS.enc.Hex);
    const signature = CryptoJS.HmacSHA256(queryString, BINANCE_API_SECRET).toString(CryptoJS.enc.Hex);

    try {
      const addressResponse = await axios.get(
        `${url}/sapi/v1/capital/address?${queryString}&signature=${signature}`, 
        {
          headers: {
            "X-MBX-APIKEY": BINANCE_API_KEY,
          },
        }
      );
      //convert??
      const btcUsdtResponse = await axios.get(`${url}/api/v3/ticker/price?symbol=BTCUSDT`);
      const usdtBrlResponse = await axios.get(`${url}/api/v3/ticker/price?symbol=USDTBRL`);

      const btcPriceInUsdt = parseFloat(btcUsdtResponse.data.price);
      const usdtPriceBrl = parseFloat(usdtBrlResponse.data.price);
      const btcPriceInBrl = btcPriceInUsdt * usdtPriceBrl;
      const cryptoAmount = amount /btcPriceInBrl

      const qrCodeGenerated = `https://api.qrserver.com/v1/create-qr-code/size=200x200data=${currency}:${addressResponse.data.address}?amount=${cryptoAmount.toFixed(8)}`;
      // return response.data
      return {
        cryptoAmount: cryptoAmount.toFixed(8),
        cryptoCurrency: currency,
        walletAddress: addressResponse.data.address,
        memo: addressResponse.data.tag || "",
        qrCode: qrCodeGenerated,
      }
    } catch (error) {
      console.error("erro ao gerar endereço", error);
      return null;
    }
  }


export async function criarPagamentoCripto(valor: number, moeda: string) {
  const response = await axios.post('https://api.binance.com/pay', {
    amount: valor,
    currency: moeda,
  });
  return response.data.qrCode;
}


// router.get('/binance/address', async (req, res) => {
//   const { coin = 'BTC' } = req.query;
//   const timestamp = Date.now();
//   const queryString = `timestamp=${timestamp}&coin=${coin}`;
//   const signature = CryptoJS.HmacSHA256(queryString, BINANCE_API_SECRET).toString(CryptoJS.enc.Hex);

//   try {
//     const response = await axios.get(
//       `${url}/sapi/v1/capital/address?${queryString}&signature=${signature}`,
//       {
//         headers: {
//           'X-MBX-APIKEY': BINANCE_API_KEY,
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Erro ao obter endereço da Binance' });
//   }
// });

// export default router;
