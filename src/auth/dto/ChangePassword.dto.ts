import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto/create-user.dto";


export class ChangePasswordDto extends PartialType(OmitType(CreateUserDto,['firstName','lastName','username','email'] as const),) {} 