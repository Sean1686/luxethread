import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberInput } from '../../libs/DTO/member/member.input';
import { Member } from '../../libs/DTO/member/member';

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

	public async login(): Promise<string> {
		return 'login executed';
	}

	public async updatemember(): Promise<string> {
		return 'updatemember executed';
	}

	public async getmember(): Promise<string> {
		return 'getmember executed';
	}
}
