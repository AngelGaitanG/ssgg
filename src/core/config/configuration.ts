import { envConfig } from './env.config';
 
export const configuration = () => ({
  ...envConfig(),
}); 