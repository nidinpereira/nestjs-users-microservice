import * as mongoose from 'mongoose';
import { MONGO_DATABASE_CONNECTION } from '../constants/providers.constants';

export const databaseProviders = [
  {
    provide: MONGO_DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb://${process.env.DB_MONGO_HOST}:${process.env.DB_MONGO_PORT}/${process.env.DB_MONGO_NAME}`,
        { useFindAndModify: false },
      ),
  },
];
