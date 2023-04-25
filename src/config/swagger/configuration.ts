export interface ISwaggerConfiguration {
  mode: string;
}

export const swaggerConfigurationFn = (): ISwaggerConfiguration => {
  return {
    mode: process.env.SWAGGER_MODE ?? '',
  };
};
