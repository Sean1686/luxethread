import { Controller, Get, Logger } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Cron, Timeout } from '@nestjs/schedule';
import { BACHT_ROLLBACK, BACHT_TOP_AGENTS, BACHT_TOP_PRODUCTS } from './lib/config';

@Controller()
export class LuxethreadBatchController {
	private logger: Logger = new Logger('BatchController');

	constructor(private readonly batchService: BatchService) {}

	@Timeout(1000)
	handleTimeout() {
		this.logger.debug('BATCH SERVER READY');
	}

	@Cron('00 00 01 * * *', { name: BACHT_ROLLBACK })
	public async batchRollback() {
		try {
			this.logger['context'] = BACHT_ROLLBACK;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchRollback();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron('20 00 01 * * *', { name: BACHT_TOP_PRODUCTS })
	public async batchTopProducts() {
		try {
			this.logger['context'] = BACHT_TOP_PRODUCTS;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchTopProducts();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron('40 00 01 * * *', { name: BACHT_TOP_AGENTS })
	public async batchTopAgents() {
		try {
			this.logger['context'] = BACHT_TOP_AGENTS;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchTopAgents();
		} catch (err) {
			this.logger.error(err);
		}
	}

	/*
  @Interval(1000)
  handleInterval() {
    this.logger.debug('INTERVAL TEST')
  }
*/

	@Get()
	getHello(): string {
		return this.batchService.getHello();
	}
}
