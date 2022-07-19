import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { Constants } from './src/constants'
dotenv.config()
const AppDataSource = new DataSource({
  type: 'mysql',
  host: Constants.dbHost,
  port: Constants.dbPort,
  username: Constants.dbUser,
  password: Constants.dbPassword,
  database: Constants.dbBaseName,
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: [__dirname + '/src/**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*migration.ts'],
  // subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'], // TODO check
})

export default AppDataSource
