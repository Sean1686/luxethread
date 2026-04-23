import { registerEnumType } from "@nestjs/graphql";

export enum Message{
    SOMETHING_WENT_WRONG = "Something went wrong",
    NO_DATA_FOUND = "No data found",
    CREATED_FAILED = "Creation failed",
    UPDATE_FAILED = "Update failed",
    DELETION_FAILED = "Deletion failed",
    UPLOAD_FAILED = "Upload failed",
    BAD_REQUEST = "Bad request",
    REMOVE_FAILED = "Removing the object is failed",
    CAN_NOT_FOLLOW_MYSELF = "You cannot follow yourself",

    DATA_ALREADY_EXISTS = "Property already exists with same parameters",
    USED_MEMBER_NICK_OR_PHONE = "Member nickname or phone number already in use",
    NO_MEMBER_NICKN = "No member nickname provided",
    BLOCKED_USER = "Blocked user",
    WRONG_PASSWORD = "Wrong password",
    NOT_AUTHENTICATED = "Not authenticated",
    TOKEN_EXPIRED = "Token expired",
    ONLY_SPECIFIC_ROLE = "Only specific role can access this resource",
    NOT_ALLOWED_REQUEST = "Not allowed",
    PROVIDE_VALID_DATA = "Please provide valid data",
    SEKF_SUBSCRIPTION_DENIED = "Self subscription is not allowed",
	MEMBER_NOT_FOUND = "MEMBER_NOT_FOUND",
	MEMBER_BLOCKED = "MEMBER_BLOCKED",
	TOKEN_NOT_EXIST = "TOKEN_NOT_EXIST",
	PROVIDE_ALLOWED_FORMAT = "PROVIDE_ALLOWED_FORMAT",
    CREATE_COMMENT_FAILED = "CREATE_COMMENT_FAILED",
}

export enum Direction {
    ASC = 1,
    DESC = -1,
}

registerEnumType(Direction, {
    name: "Direction"
})