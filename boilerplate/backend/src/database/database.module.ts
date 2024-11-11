import { BeforeApplicationShutdown, Inject, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MONGO_CONNECTION } from './database.constants';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule implements BeforeApplicationShutdown {
  constructor(@Inject(MONGO_CONNECTION) private readonly mongoClient: MongoClient) {}

  beforeApplicationShutdown(signal?: string): Promise<void> {
    console.log(`Application shutdown by signal: ${signal}`);
    return this.mongoClient.close();
  }
  
}
