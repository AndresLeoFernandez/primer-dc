import { Controller, Get, Body, Patch, Param, ParseIntPipe, UseGuards, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {User } from './entities/user.entity';
import { UserService } from './user.service';
import { ChangePasswordDto } from 'src/auth/dto/ChangePassword.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) 
  {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('view/all')
  @ApiOperation({summary: 'Obtain all Users raw', description:'',})
  @ApiOkResponse({ status: 200, description: 'Give all the Users.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.userService.getUsers();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/:id/view')
  @ApiOperation({summary: 'Obtain User by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiOkResponse({ status: 200, description: 'The found record', type: User })
  @ApiResponse({  status: 403, description: 'Forbidden.'})
  async getOne(
    @Param('id',ParseIntPipe) userId: number
  ): Promise<User> {
    const data = await this.userService.getOne(userId);
    return data
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Change password current User', description:' la descripcion',})
  @ApiOkResponse({ status: 200, description: 'The password is successfully changed.'})  
  @ApiResponse({ status: 401,description: 'Not Authorized. Need log for this operation.'})  
  @ApiBody({ type: ChangePasswordDto, description:'Change the password'})
  @Patch('/change-password')
  async changeUserPassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() user:User) {
    const data = await this.userService.changePassword(changePasswordDto,user);
    return { message: 'Modificación de Password correcta',data }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)  
  @Delete('delete')
  @ApiOperation({summary: 'Delete current User', description:' la descripcion',})
  @ApiOkResponse({  status: 201, description: 'The record has been successfully deleted.'})  
  @ApiResponse({  status: 404,description: 'The entered ID does not exist.'})  
  async remove(@CurrentUser() currentUser:User) {
    return await this.userService.deleteUser(currentUser);
  } 
}
