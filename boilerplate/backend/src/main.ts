// main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ShutdownSignal, ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import config from './config';

// 커스텀 Socket.IO 어댑터 클래스 생성
class CustomSocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    // allowEIO3 옵션 추가
    const optionsWithAllowEIO3: ServerOptions = {
      ...options,
      allowEIO3: true, // Socket.IO 버전 2.x 클라이언트 지원
    };
    const server = super.createIOServer(port, optionsWithAllowEIO3);
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true })
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks([ShutdownSignal.SIGTERM, ShutdownSignal.SIGINT]);

  // 커스텀 WebSocket 어댑터 설정
  app.useWebSocketAdapter(new CustomSocketIoAdapter(app));

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
    origin: '*',  // 모든 출처를 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 8080, '0.0.0.0');
}

bootstrap();
