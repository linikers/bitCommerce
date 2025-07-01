import { Router } from 'express';
import { BinanceController } from '../controller';

const router = Router();
const controller = new BinanceController();

router.post("/pagamento", controller.criarOrdemPagamento.bind)

export default router;