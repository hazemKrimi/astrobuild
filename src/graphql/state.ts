import { makeVar } from '@apollo/client';
import { UserResponseModel } from './types';

export const tokenVar = makeVar<string | undefined>(undefined);

export const roleVar = makeVar<
  'client' | 'productOwner' | 'developer' | 'admin' | undefined
>(undefined);

export const userVar = makeVar<UserResponseModel | undefined>(undefined);
