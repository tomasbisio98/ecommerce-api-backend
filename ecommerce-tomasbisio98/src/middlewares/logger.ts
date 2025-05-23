import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const allowedRoutes = [
    '/auth',
    '/users',
    '/products',
    '/categories',
    '/orders',
    '/files',
  ];
  const routeWithoutQuery = req.originalUrl.split('?')[0];

  const isValidRoute = allowedRoutes.some((route) =>
    routeWithoutQuery.startsWith(route),
  );

  const timestamp = new Date().toLocaleString();

  if (isValidRoute) {
    if (req.method === 'GET') {
      console.log(`[${timestamp}] GET ${req.originalUrl}`);
    }
    next();
  } else {
    console.error(`❌ Invalid route: ${req.originalUrl}`);
    res.status(404).send('Route not found');
  }
}
