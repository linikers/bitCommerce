// import { Request, Response } from 'express';
import { Request, Response, NextFunction, Router } from 'express';
import { BinanceController } from './controller';

export const routes = Router();
const crt = new BinanceController();

// routes.post('/binance/pagamento', crt.criarOrdemPagamento.bind(crt));

routes.post(
    '/binance/pagamento',
    (req: Request, res: Response, next: NextFunction) => {
      crt.criarOrdemPagamento(req, res).catch(next);
    }
  );