import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as path from 'path';

// Keep this file independent of Nest so the TypeORM CLI can use it directly
// It mirrors src/config/database.config.ts but is consumable by the CLI

const rootDir = __dirname;

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(rootDir, '/../**/*.Entity{.ts,.js}')],
    migrations: [path.join(rootDir, '/migrations/*{.ts,.js}')],
    logging: true,
    synchronize: false,
});


