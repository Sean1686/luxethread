import { Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
    imports: [MongooseModule.forRootAsync({
        useFactory: () => ({
            uri: process.env.NODE_ENV === 'production' ? process.env.MONGO_PRODUCTION_URI : process.env.MONGO_DEVELOPMENT_URI,
        }),
    })],
    exports: [MongooseModule],
})
export class DatabaseModule {
    constructor(@InjectConnection() private readonly connection: Connection) {
        if(connection.readyState === 1) {
            console.log(`MongoDB connected into ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} environment!`);
        } else {
            console.error('Failed to connect to MongoDB!');
        }
    }
}
