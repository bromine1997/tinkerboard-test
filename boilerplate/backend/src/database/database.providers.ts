import { Db, MongoClient } from 'mongodb';
import config from '../config';
import { MONGO_CONNECTION, WORD_CHECKER_DB } from './database.constants';

export const databaseProviders = [
  {
    provide: MONGO_CONNECTION,
    useFactory: async (): Promise<MongoClient> => {
      const { authSource, username, password } = JSON.parse(config.mongodbCipherText);
      const mongoClient = new MongoClient('', {
        ignoreUndefined: true,
        authSource,
        auth: {
          username,
          password,
        },
      });

      await mongoClient.connect();

      return mongoClient;
    },
  },
  {
    provide: WORD_CHECKER_DB,
    useFactory: (mongoClient: MongoClient): Db => {
      return mongoClient.db('word_checker');
    },
    inject: [MONGO_CONNECTION],
  },
];
