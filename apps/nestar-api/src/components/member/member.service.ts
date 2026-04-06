import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberInput } from '../../libs/DTO/member/member.input';

@Injectable()
export class MemberService {

    constructor(@InjectModel("Member") private readonly memberModel: Model<null>) {}

    public async signup(): Promise<string> {
          return "signup executed"
    }

    public async login(): Promise<string> {
          return "login executed"
    }

    public async updatemember(): Promise<string> {
          return "updatemember executed"
    }

    public async getmember(): Promise<string> {
          return "getmember executed"
    }

}
