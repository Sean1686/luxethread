import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { AppResolver } from './app.resolver';
import { T } from './libs/types/common';
import { GraphQLUpload } from 'graphql-upload';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot({
			driver: ApolloDriver,
			path: '/graphql',
			playground: true, 
			uploads: false,
			resolvers: { Upload: GraphQLUpload },
			autoSchemaFile: true,
			formatError: (error: T) => {
				console.error('GraphQL Error:', error);
				const graphQLFormattedError = {
					code: error?.extensions.code,
					message: error?.extensions?.exception?.response?.message || error?.extensions?.message || error?.message,
				};
				console.log('GRAPHQL GLOBAL ERROR:', graphQLFormattedError);
				return graphQLFormattedError;
			},
		}),
		ComponentsModule,
		DatabaseModule,
	],
	controllers: [AppController],
	providers: [AppService, AppResolver],
})
export class AppModule {}
