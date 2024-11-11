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

    useFactory: async (db: Db): Promise<Collection> => {
      const collectionName = 'sensor_data_packets';
      
      // 컬렉션이 이미 존재하는지 확인
      const collections = await db.listCollections({ name: collectionName }).toArray();
      if (collections.length === 0) {
        // 컬렉션이 없으면 타임시리즈 컬렉션으로 생성
        await db.createCollection(collectionName, {
          timeseries: {
            timeField: 'timestamp', // 타임스탬프 필드 이름
            metaField: 'metadata',  // 메타데이터 필드 이름
            granularity: 'seconds', // 데이터 수집 주기
          },
        });
        console.log(`타임시리즈 컬렉션 '${collectionName}' 생성 완료`);
      } else {
        console.log(`컬렉션 '${collectionName}' 이미 존재`);
      }

      return db.collection(collectionName);
    },
  inject: [TEST_DB],
},
];
