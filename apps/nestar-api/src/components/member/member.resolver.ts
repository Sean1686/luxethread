import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/DTO/member/member.input';
import { InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Member } from '../../libs/DTO/member/member';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Mutation(() => Member)
    @UsePipes(ValidationPipe)
    public async signup(@Args("input") input: MemberInput): Promise<Member> {
        try {
            console.log("Mutation signup called");
            console.log("Input received:", input);
            return this.memberService.signup(input);
        } catch (error) {
            console.error("Error occurred while signing up:", error);
            throw new InternalServerErrorException(error);
        }
    }

    @Mutation(() => Member)
    @UsePipes(ValidationPipe)
    public async login(@Args("input") input: LoginInput): Promise<Member> {
        try {
            console.log("Mutation login called");
            console.log("Input received:", input);
            return this.memberService.login(input);
        } catch (error) {
            console.error("Error occurred while logging in:", error);
            throw new InternalServerErrorException(error);
        }
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
