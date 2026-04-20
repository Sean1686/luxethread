import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { PropertyService } from '../property/property.service';
import { Model, ObjectId } from 'mongoose';
import { BoardArticleService } from '../board-article/board-article.service';
import { InjectModel } from '@nestjs/mongoose';
import { CommentInput, CommentsInquiry } from '../../libs/DTO/comment/comment.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { Comment, Comments } from '../../libs/DTO/comment/comment';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { CommentUpdate } from '../../libs/DTO/comment/comment.update';
import { lookup } from 'dns';
import { lookupMember } from '../../libs/config';
import { T } from '../../libs/types/common';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel('Comment') private readonly commentModel: Model<Comment>,
		private readonly memberService: MemberService,
		private readonly propertyService: PropertyService,
		private readonly boardArticleService: BoardArticleService,
	) {}

	public async createComment(memberId: ObjectId, input: CommentInput): Promise<Comment> {
		input.memberId = memberId;

		let result: Comment;
		try {
			result = (await this.commentModel.create(input)) as Comment;
		} catch (err) {
			if (err instanceof Error) {
				console.log('Error, Service.model:', err.message);
			} else {
				console.log('Error, Service.model:', err);
			}
			throw new BadRequestException(Message.CREATED_FAILED);
		}

		switch (input.commentGroup) {
			case CommentGroup.PROPERTY:
				await this.propertyService.propertyStatsEditor({
					_id: input.commentRefId,
					targetKey: 'propertyComments',
					modifier: 1,
				});
				break;
			case CommentGroup.ARTICLE:
				await this.boardArticleService.boardArticleStatsEditor({
					_id: input.commentRefId,
					targetKey: 'articleComments',
					modifier: 1,
				});
				break;
			case CommentGroup.MEMBER:
				await this.memberService.memberStatsEditor({
					_id: input.commentRefId,
					targetKey: 'memberComments',
					modifier: 1,
				});
				break;
		}

		if (!result) throw new InternalServerErrorException(Message.CREATED_FAILED);
		return result as Comment;
	}

	public async updateComment(memberId: ObjectId, input: CommentUpdate): Promise<Comment> {
		const { _id } = input;
		const result = await this.commentModel
			.findOneAndUpdate(
				{
					_id: _id,
					memberId: memberId,
					commentStatus: CommentStatus.ACTIVE,
				},
				input,
				{ new: true },
			)
			.exec();

		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}

	public async getComments(input: CommentsInquiry, memberId: ObjectId): Promise<Comments> {
		const { commentRefId } = input.search;
		const match: T = { commentRefId: commentRefId, commentStatus: CommentStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result = await this.commentModel.aggregate([
			{ $match: match },
			{ $sort: sort },
			{
				$facet: {
					list: [
						{ $skip: (input.page - 1) * input.limit },
						{ $limit: input.limit },
						// meLiked
						lookupMember,
						{ $unwind: '$memberData' },
					],
					metaCounter: [{ $count: 'total' }],
				},
			},
		]);
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result[0];
	}

	public async removeCommentByAdmin(input: ObjectId): Promise<Comment> {
		const result = await this.commentModel.findByIdAndDelete(input);
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);

		return result;
	}
}
