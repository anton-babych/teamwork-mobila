import { devEnvironment } from './environment.dev';
import { prodEnvironment } from './environment.prod';

interface Environment {
  production: boolean;
  apiUrl: string;
}

export const getEnvironment = (): Environment => {
  //return process.env['NODE_ENV'] === 'development' ? devEnvironment : prodEnvironment;
  return prodEnvironment;
};
