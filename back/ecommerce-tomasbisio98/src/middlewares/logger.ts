import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const rutasPermitidas = ['/auth', '/users', '/products'];
  const baseRuta = '/' + req.originalUrl.split('/')[1];
  const timestamp = new Date().toISOString();

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
