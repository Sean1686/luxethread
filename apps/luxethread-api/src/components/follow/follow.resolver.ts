import { Resolver } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Follower, Followers, Following, Followings } from '../../libs/DTO/follow/follow';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { Args, Mutation } from '@nestjs/graphql';
import type { ObjectId } from 'mongoose';
import { FollowInput, FollowInquiry } from '../../libs/DTO/follow/follow.input';
import { WithoutGuard } from '../auth/guards/without.guard';
import { Query } from '@nestjs/graphql';

@Resolver()
export class FollowResolver {
    constructor(private readonly followService: FollowService) {}

    @UseGuards(AuthGuard)
    @Mutation((returns) => Follower)
    public async subscribe(
        @Args('input') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Follower> {
        console.log("Mutation: subscribe");
        const followId = shapeIntoMongoObjectId(input );
        return this.followService.subscribe(memberId, followId);
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => Follower)
    public async unsubscribe(
        @Args('input') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Follower> {
        console.log("Mutation: unsubscribe");
        const followingId = shapeIntoMongoObjectId(input);
        return this.followService.unsubscribe(memberId, followingId);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Followings)
    public async getMemberFollowings(
        @Args('input') input: FollowInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Followings> {
        console.log("Query: getMemberFollowings");
        const { followerId } = input.search;
        input.search.followerId = shapeIntoMongoObjectId(followerId)
        return await this.followService.getMemberFollowings(memberId, input);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => Followers)
    public async getMemberFollowers(
        @Args('input') input: FollowInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Followers> {
        console.log("Query: getMemberFollowers");
        const { followingId } = input.search;
        input.search.followingId = shapeIntoMongoObjectId(followingId)
        return await this.followService.getMemberFollowers(memberId, input);
    }
}
