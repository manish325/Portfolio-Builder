import { registerAs } from "@nestjs/config";
import { Project } from "src/Entities/Project.Entity";
import { User } from "src/Entities/User.Entity";
import { DataSourceOptions } from "typeorm";


export default registerAs("database", () : DataSourceOptions => {
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PORT);
    console.log(process.env.DB_USERNAME);
    console.log(process.env.DB_PASSWORD);
    return {
        type : 'mysql',
        host : process.env.DB_HOST,
        port : parseInt(process.env.DB_PORT),
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        // entities : [__dirname + '/../**/*.Entity{.ts,.js}'],
        entities : [User, Project],
        synchronize : true,
    }
})