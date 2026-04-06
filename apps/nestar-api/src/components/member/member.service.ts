import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {

    public async signUp(): Promise<string> {
          return "signUp executed"
    }

    public async login(): Promise<string> {
          return "login executed"
    }

    public async updateMember(): Promise<string> {
          return "updateMember executed"
    }

    public async getMember(): Promise<string> {
          return "getMember executed"
    }

}
