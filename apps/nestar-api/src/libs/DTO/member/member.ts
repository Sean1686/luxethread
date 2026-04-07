import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import * as mongoose from 'mongoose';

@ObjectType()
export class Member {
	@Field(() => String)
	_id!: mongoose.ObjectId;

	@Field(() => MemberType)
	memberType!: MemberType;

	@Field(() => MemberStatus)
	memberStatus!: MemberStatus;

	@Field(() => MemberAuthType)
	memberAuthType!: MemberAuthType;

	@Field(() => String)
	memberPhone!: string;

	@Field(() => String)
	memberNickname!: string;

	memberPassword?: string;

	@Field(() => String, { nullable: true })
	memberFullName?: string;

	@Field(() => String)
	memberImage!: string;

	@Field(() => String, { nullable: true })
	memberAddress?: string;

	@Field(() => String, { nullable: true })
	memberDescription?: string;

	@Field(() => Int)
	memberProperties!: number;

	@Field(() => Int)
	memberArticles!: number;

	@Field(() => Int)
	memberFollowers!: number;

	@Field(() => Int)
	memberFollowings!: number;

	@Field(() => Int)
	memberPoints!: number;

	@Field(() => Int)
	memberLikes!: number;

	@Field(() => Int)
	memberViews!: number;

	@Field(() => Int)
	memberComments!: number;

	@Field(() => Int)
	memberRank!: number;

	@Field(() => Int)
	memberWarnings!: number;

	@Field(() => Int)
	memberBlocks!: number;

	@Field(() => Date, { nullable: true })
    deletedAt!: Date;

    @Field(() => Date)
    createdAt!: Date;

    @Field(() => Date)
    updatedAt!: Date;
}
