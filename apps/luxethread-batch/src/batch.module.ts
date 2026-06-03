import { Module } from '@nestjs/common';
import { LuxethreadBatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import ProductSchema from '../../luxethread-api/src/schemas/Product.model';
import MemberSchema from '../../luxethread-api/src/schemas/Member.model';

@Module({
	imports: [
		ConfigModule.forRoot(),
		DatabaseModule,
		ScheduleModule.forRoot(),
		MongooseModule.forFeature([
			{ name: 'Product', schema: ProductSchema },
			{ name: 'Member', schema: MemberSchema },
		]),
	],
	controllers: [LuxethreadBatchController],
	providers: [BatchService],
})
export class BatchModule {}
