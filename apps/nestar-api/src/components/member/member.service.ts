import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput, MemberInput } from '../../libs/DTO/member/member.input';
import { Member } from '../../libs/DTO/member/member';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Messages } from '../../libs/enums/common.enum';
import { error } from 'console';
import { AuthService } from '../auth/auth.service';

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
			// TODO: Authentication via Token
			console.log('Member created successfully:', result);
			return result;
		} catch (err) {
			console.log('Error occurred while creating member:', (err as Error).message);
			throw new BadRequestException(Messages.USED_MEMBER_NICK_OR_PHONE);
		}
	}

	public async login(input: LoginInput): Promise<Member> {
		const { memberNick, memberPassword } = input;
		const response = await this.memberModel
		.findOne({ memberNick: memberNick })
		.select('+memberPassword')
		.exec();

		if (!response || response.memberStatus === MemberStatus.DELETED) {
			throw new BadRequestException(Messages.MEMBER_NOT_FOUND);
		} else if (response.memberStatus === MemberStatus.BLOCKED) {
			throw new BadRequestException(Messages.MEMBER_BLOCKED);
		} else if (!response.memberPassword) {
			throw new BadRequestException(Messages.MEMBER_NOT_FOUND);
		}

		// TODO: Implement password comparison logic here (e.g., using bcrypt)
		const isMatch = await this.authService.comparePasswords(input.memberPassword, response.memberPassword)
		if (!isMatch) throw new BadRequestException(Messages.WRONG_PASSWORD);

		return response;
	}

	public async updatemember(): Promise<string> {
		return 'updatemember executed';
	}

	public async getmember(): Promise<string> {
		return 'getmember executed';
	}
}
