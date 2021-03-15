import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import {
  MONGO_DATABASE_CONNECTION,
  USER_MODEL,
} from '../../constants/providers.constants';

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [MONGO_DATABASE_CONNECTION],
  },
];
