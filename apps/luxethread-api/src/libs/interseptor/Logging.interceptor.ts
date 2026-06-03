import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger: Logger = new Logger();

	public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const recordTime = Date.now();
		const requestTyep = context.getType<GqlContextType>();

		if (requestTyep === 'http') {
			// For HTTP requests, we can log the request details here if needed
			return next.handle();
		} else if (requestTyep === 'graphql') {
			//** (1) Print request details */
			const gqlContext = GqlExecutionContext.create(context);
			this.logger.log(` ${this.stringify(gqlContext.getContext().req.body)}`, 'REQUEST');
		
			// **(2) Errors handling via GraphQL */

			// **(3) No Errors giving Response below */
			return next.handle().pipe(
				tap((content) => {
					const responseTime = Date.now() - recordTime;
					this.logger.log(`${this.stringify(content)} - ${responseTime}ms\n\n`, 'RESPONSE');
				}),
			);
		}

		return next.handle();
	}

	private stringify(context: ExecutionContext): string {
        console.log(typeof context);
        return JSON.stringify(context).slice(0, 75);
    }
}
