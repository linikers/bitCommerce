import axios from "axios";

export async function getBTCPrice(): Promise<number> {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const btcPriceInUSDT = parseFloat(response.data.price);
        
        const brlResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=USDTBRL');        
        const usdPriceInBRL = parseFloat(brlResponse.data.price);
        
        return btcPriceInUSDT * usdPriceInBRL; //value btc in brl
    } catch (error) {
        console.error('Erro ao buscar preço de btc:', error);
        return 0;
    }
}

export async function convertBRLtoBTC(amountInBRL: number): Promise<number> {
    const btcPrice = await getBTCPrice();
    return amountInBRL / btcPrice;
}