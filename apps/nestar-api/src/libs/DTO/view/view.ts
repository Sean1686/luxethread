import { Field, ObjectType } from '@nestjs/graphql';
import type { ObjectId } from 'mongoose';
import { ViewGroup } from '../../enums/view.enum';

@ObjectType()
export class View {
	@Field(() => String)
	_id!: ObjectId;

	@Field(() => ViewGroup)
	viewGroup: ViewGroup | undefined;

	@Field(() => ViewGroup)
	viewRefId: ObjectId | undefined;

    @Field(() => String)
	memberId!: ObjectId;

	@Field(() => String)
	createdAt: Date | undefined;

	@Field(() => String)
	updateAt: Date | undefined;
}
