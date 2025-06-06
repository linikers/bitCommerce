import { Router } from 'express';
import { BinanceController } from '../controller';
// import { BinanceController } from '../controllers/BinanceController';

const router = Router();
const controller = new BinanceController();

// router.post('/pagamento', controller.criarOrdemPagamento.bind(controller));
router.post("/pagamento", controller.criarOrdemPagamento.bind)

export default router;