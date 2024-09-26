import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ShutdownSignal, ValidationPipe } from '@nestjs/common';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ trustProxy: true }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks([ShutdownSignal.SIGTERM, ShutdownSignal.SIGINT]);
  app.setGlobalPrefix('api');

  await app.register(require('fastify-metrics'), {
    endpoint: '/metrics',
    routeMetrics: {
      routeBlacklist: ['/metrics', '/health', '/swagger'],
    },
  });

  if (config.env !== 'real') {
    const options = new DocumentBuilder().setTitle('Backend API').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  app.setGlobalPrefix('api');
  /*
  await app.listen(process.env.PORT || 8080, '0.0.0.0', (err: Error, address: string) => {
    console.log(`server started on ${address}`);
    if (process.send) {
      process.send('ready');
    }
  });
  */
  await app.listen(process.env.PORT || 8080, '0.0.0.0');
}

bootstrap();
