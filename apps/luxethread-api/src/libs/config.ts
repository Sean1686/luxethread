import { ObjectId } from 'bson';

export const availableAgentSorts = ['createdAt', 'updateAt', 'memberLikes', 'memberViews', 'memberRank'];
export const availableMemberSorts = ['createdAt', 'updateAt', 'memberLikes', 'memberViews'];

export const availableOptions = ['propertyBarter', 'propertyRent'];
export const availablePropertySorts = [
	'createdAt',
	'updatedAt',
	'propertyLikes',
	'propertyViews',
	'propertyRank',
	'propertyPrice',
];

export const availableBoardArticleSorts = ['createdAt', 'updateAt', 'articleLikes', 'articleViews'];
export const availableCommentSorts = ['createdAt', 'updateAt'];

// IMAGE CONFIGURATION (config.js)
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { T } from './types/common';
import { from } from 'rxjs';

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
	return uuidv4() + ext;
};

export const shapeIntoMongoObjectId = (target: any) => {
	return typeof target === 'string' ? new ObjectId(target) : target;
};
export const lookupMemberLiked = (memberId: T, targetRefId: string = '$_id') => {
	return{
	$lookup: {
		from: 'likes',
		let: {
			localLikeRefId: targetRefId,
			localMemberId: memberId,
			localMyFavorite: true,
		},
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [{ $eq: ['$likeRefId', '$$localLikeRefId'] }, { $eq: ['$memberId', '$$localMemberId'] }],
					},
				},
			},
			{
				$project: {
					_id: 0,
					memberId: 1,
					likeRefId: 1,
					myFavorite: '$$localMyFavorite',
				},
			},
		],
		as: 'meLiked',
	},
}}

interface LookupMemberFollowed {
	followerId: T;
	followingId: string;
}
export const lookupMemberFollowed = (input: LookupMemberFollowed) => {
	const { followerId, followingId } = input;
	return {
		$lookup: {
			from: 'follows',
			let: {
				localFollowerId: followerId,
				localFollowingId: followingId,
				localMyFavorite: true,
			},
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [{ $eq: ['$followerId', '$$localFollowerId'] }, { $eq: ['$followingId', '$$localFollowingId'] }],
					},
				},
			},
			{
				$project: {
					_id: 0,
					followerId: 1,
					followingId: 1,
					myFollowing: '$$localMyFavorite',
				},
			},
		],
		as: 'meFollowed',
	},
}};

export const lookupMember = {
	$lookup: {
		from: 'members',
		let: { memberId: '$memberId' },
		pipeline: [
			{
				$match: {
					$expr: {
						$eq: ['$_id', '$$memberId'],
					},
				},
			},
			{
				$addFields: {
					memberAuthType: {
						$ifNull: ['$memberAuthType', 'PHONE'],
					},
				},
			},
		],
		as: 'memberData',
	},
};

export const lookupFollowingData = {
	$lookup: {
		from: 'members',
		let: { followingId: '$followingId' },
		pipeline: [
			{
				$match: {
					$expr: {
						$eq: ['$_id', '$$followingId'],
					},
				},
			},
			{
				$addFields: {
					memberAuthType: {
						$ifNull: ['$memberAuthType', 'PHONE'],
					},
				},
			},
		],
		as: 'followingData',
	},
};

export const lookupFollowerData = {
	$lookup: {
		from: 'members',
		let: { followerId: '$followerId' },
		pipeline: [
			{
				$match: {
					$expr: {
						$eq: ['$_id', '$$followerId'],
					},
				},
			},
			{
				$addFields: {
					memberAuthType: {
						$ifNull: ['$memberAuthType', 'PHONE'],
					},
				},
			},
		],
		as: 'followerData',
	},
};

export const lookupFavorite = {
	$lookup: {
		from: 'members',
		localField: 'favoriteProperty.memberId',
		foreignField: '_id',
		as: 'favoriteProperty.memberData',
	},
};

export const lookupVisit = {
	$lookup: {
		from: 'members',
		localField: 'visitedProperty.memberId',
		foreignField: '_id',
		as: 'visitedProperty.memberData',
	},
};
