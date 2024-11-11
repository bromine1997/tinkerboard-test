import { Collection, Db, MongoClient } from 'mongodb';
import config from '../config';
import { MONGO_CONNECTION, TEST_DB, TEST_COLLECTION, USER_COLLECTION,PROFILE_COLLECTION,SENSOR_DATA_COLLECTION } from './database.constants';

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
      return mongoClient.db('test'); // 테스트 DB 연결
    },
    inject: [MONGO_CONNECTION],
  }, // 테스트용 DB
  {
    provide: TEST_COLLECTION,
    useFactory: (db: Db): Collection => {
      return db.collection('test'); // 테스트용 컬렉션
    },
    inject: [TEST_DB],
  }, // 테스트용 DB Collection

  {
    provide: USER_COLLECTION,
    useFactory: (db: Db): Collection => {
      return db.collection('users'); // 실제 사용자 컬렉션 이름을 사용
    },
    inject: [TEST_DB], // TEST_DB를 사용하여 컬렉션 주입
  }, // 사용자 컬렉션

  {
    provide: PROFILE_COLLECTION,
    useFactory: (db: Db): Collection => {
      return db.collection('pressure_profiles'); // 압력 프로파일 컬렉션
    },
    inject: [TEST_DB],
  },

  {
    provide: SENSOR_DATA_COLLECTION,
    useFactory: (db: Db): Collection => {
      return db.collection('sensor_data_packets'); // 센서 데이터 컬렉션 추가
    },
    inject: [TEST_DB],
  },
];
