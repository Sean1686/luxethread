import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/DTO/member/member.input';
import { Member } from '../../libs/DTO/member/member';
import { LoggingInterceptor } from '../../libs/interseptor/Logging.interceptor';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Mutation(() => Member)
    public async signup(@Args("input") input: MemberInput): Promise<Member> {

            console.log("Mutation signup called");
            return this.memberService.signup(input);
    }

    @Mutation(() => Member)
    public async login(@Args("input") input: LoginInput): Promise<Member> {
            console.log("Mutation login called");
            console.log("Input received:", input);
            return this.memberService.login(input);
    }

    @Mutation(() => String)
    public async updatemember(@Args("input") input: MemberInput): Promise<string> {
        console.log("Mutation updatemember called");
        return this.memberService.updatemember();
    }

    
    @Query(() => String)
    public async getmember(): Promise<string> {
        console.log("Query getmember called");
        return this.memberService.getmember();
    }
}
