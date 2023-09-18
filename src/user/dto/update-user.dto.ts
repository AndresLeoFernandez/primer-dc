/*import { PartialType } from '@nestjs/mapped-types';*/
import { CreateUserDto } from './create-user.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto,['email','password'] as const),) {}
