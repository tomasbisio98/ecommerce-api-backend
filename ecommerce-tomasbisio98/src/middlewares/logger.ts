import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const rutasPermitidas = [
    '/auth',
    '/users',
    '/products',
    '/categories',
    '/orders',
    '/files',
  ];
  const rutaSinQuery = req.originalUrl.split('?')[0];

  const esRutaValida = rutasPermitidas.some((ruta) =>
    rutaSinQuery.startsWith(ruta),
  );

  const timestamp = new Date().toLocaleString();

  if (esRutaValida) {
    if (req.method === 'GET') {
      console.log(`[${timestamp}] GET ${req.originalUrl}`);
    }
    next();
  } else {
    console.error(`❌ Ruta no válida: ${req.originalUrl}`);
    res.status(404).send('Ruta no encontrada');
  }
}
