import express from 'express';
import cors from 'cors';
import binanceRoutes from './routes/binance';

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.use('/binance', binanceRoutes)
//tratar oc controller
app.listen(PORT, () => {
    console.log(`servicor rodando em ${PORT}`);
})

//rodar
//npm run dev:api
