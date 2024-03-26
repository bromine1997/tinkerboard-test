import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContextLogger } from './context-logger.service';
import { RequestContextMiddleware } from './request-context.middleware';

@Module({
  providers: [ContextLogger],
  exports: [ContextLogger],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('/');
  }
}
