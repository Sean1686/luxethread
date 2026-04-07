import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput, MemberInput } from '../../libs/DTO/member/member.input';
import { Member } from '../../libs/DTO/member/member';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Messages } from '../../libs/enums/common.enum';

@Injectable()
export class MemberService {
	constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}

	public async signup(input: MemberInput): Promise<Member> {
		//  TODO: Implement Hash password

            try {
                const result = await this.memberModel.create(input);
                // TODO: Authentication via Token
                console.log("Member created successfully:", result);
                return result;
            } catch (error) {
                console.error("Error occurred while creating member:", error);
                throw new BadRequestException(error);
            }
	}

	public async login(input: LoginInput): Promise<Member> {
		const {memberNickname, memberPassword} = input;
		const response = await this.memberModel
		.findOne({ memberNickname: memberNickname })
		.select('+memberPassword')
		.exec();

		if (!response || response.memberStatus === MemberStatus.DELETED) {
			throw new BadRequestException(Messages.MEMBER_NOT_FOUND);
		} else if (response.memberStatus === MemberStatus.BLOCKED) {
			throw new BadRequestException(Messages.MEMBER_BLOCKED);
		}

		// TODO: Implement password comparison logic here (e.g., using bcrypt)
	    const isMatch = memberPassword === response.memberPassword;
		if(!isMatch) throw new BadRequestException(Messages.WRONG_PASSWORD);

		return response;
	}

	public async updatemember(): Promise<string> {
		return 'updatemember executed';
	}

	public async getmember(): Promise<string> {
		return 'getmember executed';
	}
}
