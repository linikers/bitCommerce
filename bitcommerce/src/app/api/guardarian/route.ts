// import { NextApiRequest, NextApiResponse } from "next";

// export default async function POST(req: NextApiRequest, res:NextApiResponse) {
//     const { amount, currency, crypto } = req.body;

//     const response = await fetch("https://api.guardarian.com/v1/convert", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-Api-Key": process.env.GUARDARIAN_API_KEY!,
//         },
//         body: JSON.stringify({
//           from: currency,  // "brl"
//           to: crypto,      // "btc", "eth", etc.
//           amount: amount,
//           address: "CARTEIRA_BTC", // Onde você receberá os BTC
//         }),
//       });
    
//       const data = await response.json();
//       res.status(200).json(data);
// }