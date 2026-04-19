import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property } from '../../libs/DTO/property/property';
import { PropertyInput } from '../../libs/DTO/property/property.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';

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

	@UseGuards(WithoutGuard)
	@Query((returns) => Property)
	public async getProperty(@Args('input') input: string,
	@AuthMember('_id') memberId: ObjectId,
): Promise<Property> {
	console.log('Query: getProperty');
	const propertyId = shapeIntoMongoObjectId(input);
	return await this.propertyServie.getProperty(memberId, propertyId)
}
}
