import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property } from '../../libs/DTO/property/property';
import { PropertyInput } from '../../libs/DTO/property/property.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';

@Resolver()
export class PropertyResolver {
	constructor(private readonly propertyServie: PropertyService) {}

	@Mutation(() => Property)
	public async createProperty(
		@Args('input') input: PropertyInput,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Property> {
		console.log('Mutation createProperty called');
        input.memberId = memberId;

        return await this.propertyServie.createProperty(input)
	}
}
