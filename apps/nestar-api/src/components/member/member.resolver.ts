import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/DTO/member/member.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Mutation(() => String)
    @UsePipes(ValidationPipe)
    public async signup(@Args("input") input: MemberInput): Promise<string> {
        console.log("Mutation signup called");
        console.log("Input received:", input);
        return this.memberService.signup();
    }

    @Mutation(() => String)
    @UsePipes(ValidationPipe)
    public async login(@Args("input") input: LoginInput): Promise<string> {
        console.log("Mutation login called");
        console.log("Input received:", input);
        return this.memberService.login();
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
