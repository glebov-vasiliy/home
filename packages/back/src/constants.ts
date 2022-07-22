export const Constants = {
  secret: process.env['NX_JWT_SECRET_KEY'],
  dbPort: Number(process.env['NX_MYSQL_PORT']),
  dbHost: process.env['NX_MYSQL_HOST'],
  dbUser: process.env['NX_MYSQL_USER'],
  dbBaseName: process.env['NX_MYSQL_BASE'],
  dbPassword: process.env['NX_MYSQL_PASSWORD'],
}
