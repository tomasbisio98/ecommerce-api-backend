import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const rutasPermitidas = ['/auth', '/users', '/products'];
  const baseRuta = '/' + req.originalUrl.split('/')[1];
  const timestamp = new Date().toLocaleString();

  if (rutasPermitidas.includes(baseRuta)) {
    if (req.method === 'GET') {
      console.log(`[${timestamp}] GET ${req.originalUrl}`);
    }

    next();
  } else {
    console.error(`❌ Ruta no válida: ${req.originalUrl}`);
    res.status(404).send('Ruta no encontrada');
  }
}

//Resolución con clases//

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     //logica del intermediario
//     const getDate = () => new Date().toISOString();

//     console.log(`${req.method} ${req.url} - Request time: ${getDate()}`);

//     next();
//   }
// }
