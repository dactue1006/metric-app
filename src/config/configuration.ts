import { appConfigurationFn } from './app/configuration';
import { swaggerConfigurationFn } from './swagger/configuration';
import { databaseConfigurationFn } from './database/configuration';

export const configuration = () => ({
  app: appConfigurationFn(),
  swagger: swaggerConfigurationFn(),
  database: databaseConfigurationFn(),
});
