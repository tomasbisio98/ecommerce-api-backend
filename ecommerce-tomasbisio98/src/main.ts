import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './common/middlewares/logger';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PI Backend FSFT-60 / Ecommerce project')
    .setVersion('1.0.0')
    .setDescription(
      'API RESTful para la gestión de un e-commerce. Permite la creación, actualización y eliminación de usuarios, consulta de productos, categorías y la creación y/o consulta órdenes de compra por usuario. Incluye autenticación JWT, roles de usuario (admin y user) y protección de rutas mediante guardias personalizados.',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.use(loggerGlobal);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
