import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interseptor/Logging.interceptor';
import * as express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = Number(process.env.API_PORT ?? 3000);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.enableCors({ origin: true, credentials: true });

	app.use('/graphql', graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 10 }));
	app.use('/uploads', express.static('./uploads'));

	await app.listen(port);
	console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
}
bootstrap();
