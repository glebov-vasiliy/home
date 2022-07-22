import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config()
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env['NX_MYSQL_HOST'],
  port: Number(process.env['NX_MYSQL_PORT']),
  username: process.env['NX_MYSQL_USER'],
  password: process.env['NX_MYSQL_PASSWORD'],
  database: process.env['NX_MYSQL_BASE'],
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: [__dirname + '/src/**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*migration.ts'],
  // subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'], // TODO check
})
export default AppDataSource
