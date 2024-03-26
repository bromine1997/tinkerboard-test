import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ShutdownSignal, ValidationPipe } from '@nestjs/common';
import config from './config';
import MetricsPlugin from 'fastify-metrics';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ trustProxy: true }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks([ShutdownSignal.SIGTERM, ShutdownSignal.SIGINT]);

  await app.register(MetricsPlugin, {
    endpoint: '/metrics',
    routeMetrics: {
      routeBlacklist: ['/swagger', '/health'],
    },
  });

  if (config.env !== 'real') {
    const options = new DocumentBuilder().setTitle('Word Checker API').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(process.env.PORT || 8080, (err: Error, address: string) => {
    console.log(`server started on ${address}`);
    if (process.send) {
      process.send('ready');
    }
  });
}

bootstrap();
