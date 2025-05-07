import axios, { AxiosInstance } from 'axios';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import * as winston from 'winston';


export function registerDependencies() {
  const logger: Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [new winston.transports.Console()],
  });

  Container.set('logger', logger);

  const axiosInstance = axios.create();
  Container.set('axios', axiosInstance);

}
