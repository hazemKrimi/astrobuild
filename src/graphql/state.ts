import { makeVar } from '@apollo/client';
import { UserOutput } from './types';

export const tokenVar = makeVar<string | undefined>(undefined);

export const roleVar = makeVar<
  'client' | 'productOwner' | 'developer' | 'admin' | undefined
>(undefined);

export const userVar = makeVar<UserOutput | undefined>(undefined);
