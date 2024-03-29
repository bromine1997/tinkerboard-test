import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContextLogger } from './logger/context-logger.service';
import { RequestContextMiddleware } from './middleware/request-context.middleware';

@Module({
  providers: [ContextLogger],
  exports: [ContextLogger],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).exclude('/health', 'metrics').forRoutes('*');
  }
}
