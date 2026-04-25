import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Like, MeLiked } from '../../libs/DTO/like/like';
import { LikeInput } from '../../libs/DTO/like/like.input';
import { T } from '../../libs/types/common';
import { Message } from '../../libs/enums/common.enum';
import { OrdinaryInquiry } from '../../libs/DTO/property/property.input';
import { Properties } from '../../libs/DTO/property/property';
import { LikeGroup } from '../../libs/enums/like.enum';
import { exec } from 'child_process';
import { lookupFavorite } from '../../libs/config';

@Injectable()
export class LikeService {
	constructor(@InjectModel('Like') private readonly likeModel: Model<Like>) {}

	public async toggleLike(input: LikeInput): Promise<number> {
		const search: T = { memberId: input.memberId, likeRefId: input.likeRefId },
			exist = await this.likeModel.findOne(search).exec();
		let modifier = 1;

		if (exist) {
			await this.likeModel.findOneAndDelete(search).exec();
			modifier = -1;
		} else {
			try {
				await this.likeModel.create(input);
			} catch (err) {
				console.log('Error, likeService.model:', err);
				throw new BadRequestException(Message.CREATED_FAILED);
			}
		}

		console.log(`- Like modifier:', ${modifier} - `);
		return modifier;
	}

	public async checkLikeExistence(input: LikeInput): Promise<MeLiked[]> {
		const { memberId, likeRefId } = input;
		const result = await this.likeModel.find({ memberId, likeRefId }).lean().exec();

		return result.length > 0 ? [{ memberId: memberId, likeRefId: likeRefId, myFavorite: true }] : [];
	}

	public async getFavoriteProperties(memberId: ObjectId, input: OrdinaryInquiry
	): Promise<Properties> {
		const { page, limit } = input;
		const match: T = { 
			likeGroup: LikeGroup.PROPERTY, 
			memberId: memberId };

		const data: T = await this.likeModel
			.aggregate([
				{ $match: match },
				{ $sort: { updatedAt: -1 } },
				{
					$lookup: {
						from: 'properties',
						localField: 'likeRefId',
						foreignField: '_id',
						as: 'favoriteProperty',
					},
				},
				{ $unwind: '$favoriteProperty' },
				{
					$facet: {
						list: [
							{ $skip: (page - 1) * limit },
							{ $limit: limit },
							lookupFavorite,
							{ $unwind: '$favoriteProperty.memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					}
				}
			])
			.exec();
		console.log('data:', data);
		const result: Properties = {list: [], metaCounter: data[0]?.metaCounter};
		result.list = data[0].list.map((ele) => ele.favoriteProperty);
		console.log('result:', result);
		return result;
	}
}


