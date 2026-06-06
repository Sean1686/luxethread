import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { View } from '../../libs/DTO/view/view';
import { ViewInput } from '../../libs/DTO/view/view.input';
import { T } from '../../libs/types/common';
import { OrdinaryInquiry } from '../../libs/DTO/product/product.input';
import { Products } from '../../libs/DTO/product/product';
import { ViewGroup } from '../../libs/enums/view.enum';
import { lookupVisit } from '../../libs/config';

@Injectable()
export class ViewService {
	constructor(@InjectModel('View') private readonly viewModel: Model<View>) {}

	public async recordView(input: ViewInput): Promise<View | null> {
		const viewExist = await this.checkViewExistence(input);
		if (!viewExist) {
			console.log(' - New View Insert - ');
			try {
				return await this.viewModel.create(input);
			} catch (err) {
				if ((err as { code?: number }).code !== 11000) throw err;

				return await this.viewModel
					.findOneAndUpdate(
						{
							memberId: input.memberId,
							viewRefId: input.viewRefId,
							viewGroup: { $nin: Object.values(ViewGroup) },
						},
						{ $set: { viewGroup: input.viewGroup } },
						{ new: true },
					)
					.exec();
			}
		} else return null;
	}

	private async checkViewExistence(input: ViewInput): Promise<View | null> {
		const { memberId, viewRefId, viewGroup } = input;
		const search: T = { memberId, viewRefId, viewGroup };

		return await this.viewModel.findOne(search).exec();
	}

	public async getVisitedProducts(memberId: ObjectId, input: OrdinaryInquiry): Promise<Products> {
		const { page, limit } = input;
		const match: T = {
			viewGroup: ViewGroup.PRODUCT,
			memberId: memberId,
		};

		const data: T = await this.viewModel
			.aggregate([
				{ $match: match },
				{ $sort: { updatedAt: -1 } },
				{
					$lookup: {
						from: 'products',
						localField: 'viewRefId',
						foreignField: '_id',
						as: 'visitedProduct',
					},
				},
				{ $unwind: '$visitedProduct' },
				{
					$facet: {
						list: [
							{ $skip: (page - 1) * limit },
							{ $limit: limit },
							lookupVisit,
							{ $unwind: '$visitedProduct.memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		console.log('data:', data);
		const result: Products = { list: [], metaCounter: data[0]?.metaCounter ?? [{ total: 0 }] };
		result.list = data[0]?.list.map((ele) => ele.visitedProduct) ?? [];
		console.log('result:', result);
		return result;
	}
}
