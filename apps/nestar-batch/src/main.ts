import { NestFactory } from '@nestjs/core';
import { BatchModule } from './batch.module';

async function bootstrap() {
	const app = await NestFactory.create(BatchModule);
	await app.listen(process.env.BATCH_PORT ?? 3000);
}
bootstrap();
