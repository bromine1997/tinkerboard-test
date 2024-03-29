import { Collection, Db, MongoClient } from 'mongodb';
import config from '../config';
import { MONGO_CONNECTION, TEST_DB, TEST_COLLECTION } from './database.constants';

export const databaseProviders = [
  {
    provide: MONGO_CONNECTION,
    useFactory: async (): Promise<MongoClient> => {
      const { uri, authSource, username, password } = config.mongo;
      const mongoClient = new MongoClient(uri, {
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
    provide: TEST_DB,
    useFactory: (mongoClient: MongoClient): Db => {
      return mongoClient.db('test');
    },
    inject: [MONGO_CONNECTION],
  }, // 테스트용 DB
  {
    provide: TEST_COLLECTION,
    useFactory: (db: Db): Collection => {
      return db.collection('test');
    },
    inject: [TEST_DB],
  }, // 테스트용 DB Collection
];
