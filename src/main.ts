import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { JwtExceptionFilter } from './core/filters/jwt-exception.filter';
import { urlencoded } from 'express';
import { ValidationExceptionFilter } from './core/filters/validation-exception.filter';
import { envConfig } from './core/config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix('api/v3');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new JwtExceptionFilter()
  );
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

   // CONFIGURAR SWAGGER
   const config = new DocumentBuilder()
   .setTitle('SSGG API Documentation')
   .setDescription('SSGG API documentation for the backend')
   .setVersion('3.0')
   .addBearerAuth()
   .build();
   const document = SwaggerModule.createDocument(app, config);

   SwaggerModule.setup('api', app, document);
   // CONFIGURAR SWAGGER
   
  await app.listen(envConfig().port);
  logger.log(`SSGG API v3 runnning in ${envConfig().port}`);
}
bootstrap();
