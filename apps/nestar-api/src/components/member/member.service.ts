import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { LoginInput, MemberInput } from '../../libs/DTO/member/member.input';
import { Member } from '../../libs/DTO/member/member';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';
import { error } from 'console';
import { AuthService } from '../auth/auth.service';
import { MemberUpdate } from '../../libs/DTO/member/member.update';
import { T } from '../../libs/types/common';

@Injectable()
export class MemberService {
	constructor(
		@InjectModel('Member') private readonly memberModel: Model<Member>,
		private authService: AuthService,
	) {}

	public async signup(input: MemberInput): Promise<Member> {
		input.memberPassword = await this.authService.hashPassword(input.memberPassword);
		try {
			const result = await this.memberModel.create(input);
			result.accessToken = await this.authService.createToken(result);
			return result;
		} catch (err) {
			console.log('Error occurred while creating member:', (err as Error).message);
			throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
		}
	}

	public async login(input: LoginInput): Promise<Member> {
		const { memberNick, memberPassword } = input;
		const response = await this.memberModel.findOne({ memberNick: memberNick }).select('+memberPassword').exec();

		if (!response || response.memberStatus === MemberStatus.DELET) {
			throw new BadRequestException(Message.MEMBER_NOT_FOUND);
		} else if (response.memberStatus === MemberStatus.BLOCK) {
			throw new BadRequestException(Message.MEMBER_BLOCKED);
		} else if (!response.memberPassword) {
			throw new BadRequestException(Message.MEMBER_NOT_FOUND);
		}

		// TODO: Implement password comparison logic here (e.g., using bcrypt)
		const isMatch = await this.authService.comparePasswords(input.memberPassword, response.memberPassword);
		if (!isMatch) throw new BadRequestException(Message.WRONG_PASSWORD);

		response.accessToken = await this.authService.createToken(response);

		return response;
	}

	public async updateMember(memberId: ObjectId, input: MemberUpdate): Promise<Member> {
		const result: Member | null = await this.memberModel.findOneAndUpdate(
			{ _id: memberId, memberStatus: MemberStatus.ACTIVE },
			input,
			{ new: true },
		).exec();
		if(!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		result.accessToken = await this.authService.createToken(result)
		return result;
	}

	public async getmember(targetId: ObjectId): Promise<Member> {
		const search: T = {
			_id: targetId,
			memberStatus: {
				$in: [MemberStatus.ACTIVE, MemberStatus.BLOCK]
			}, 
		};
		const targetMember = await this.memberModel.findOne(search).exec();
		if (!targetMember) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
		return targetMember;
	}

	public async getAllMembersByAdmin(): Promise<string> {
		return 'updatemember executed';
	}

	public async updateMemberByAdmin(): Promise<string> {
		return 'getmember executed';
	}
}
