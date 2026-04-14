import { registerEnumType  } from "@nestjs/graphql";


export enum MemberType {
    ADMIN = 'admin',
    USER = 'user',
    AGENT = 'agent',
}

registerEnumType(MemberType, { 
    name: "MemberType" 
});


export enum MemberStatus {
    ACTIVE = 'active',
    BLOCK = 'blocked',
    DELET = 'deleted',
}

registerEnumType(MemberStatus, { 
    name: "MemberStatus" 
});


export enum MemberAuthType {
    EMAIL = 'email',
    PHONE = 'phone',
    TELEGRAM = 'telegram',
}

registerEnumType(MemberAuthType, { 
    name: "MemberAuthType" 
});