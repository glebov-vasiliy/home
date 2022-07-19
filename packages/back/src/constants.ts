export const Constants = {
  secret: process.env['NX_JWT_SECRET_KEY'] || 'secret',
  dbPort: Number(process.env['NX_MYSQL_PORT']) || 3306,
  dbHost: process.env['NX_MYSQL_HOST'] || '192.168.0.2',
  dbUser: process.env['NX_MYSQL_USER'] || 'root',
  dbBaseName: process.env['NX_MYSQL_BASE'] || 'home',
  dbPassword: process.env['NX_MYSQL_PASSWORD'] || 'root',
}
