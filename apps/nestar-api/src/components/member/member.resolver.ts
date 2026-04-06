import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Mutation(() => String)
    public async signUp(): Promise<string> {
        console.log("Mutation signUp called");
        return this.memberService.signUp();
    }

    @Mutation(() => String)
    public async login(): Promise<string> {
        console.log("Mutation login called");
        return this.memberService.login();
    }

    @Mutation(() => String)
    public async updateMember(): Promise<string> {
        console.log("Mutation updateMember called");
        return this.memberService.updateMember();
    }

    
    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log("Query getMember called");
        return this.memberService.getMember();
    }
}
