import axios from "axios";

// aqui deve abrir uma conta nacional para pagamento via nowpayments
export async function criarPagamentoPix(amount: number) {
    const response = await axios.post("https://api.nowpayments.io/v1/invoice", {
      price_amount: amount,
      price_currency: "brl",
      pay_currency: "pix",
    });
    return response.data.payment_url; // URL para o cliente pagar via PIX
  }