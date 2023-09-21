import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, UseGuards, Delete } from '@nestjs/common';
import {User as userEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from 'src/auth/dto/ChangePassword.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
/*import { CurrentUser } from 'src/common/decorators/currentUser.decorator';*/


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) 
  {}

  @Get('view/all')
  @ApiOperation({summary: 'Obtain all Users', description:'',})
  @ApiOkResponse({ status: 200, description: 'Give all the Users.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.userService.getUsers();
  }

  /*@Get(':username')
  getUser(@Param('username') username:string): Promise<User> {
      return this.userService.findOneBy(username)
  } */

  
  @Get('/:id/view')
  @ApiOperation({summary: 'Obtain User by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'userId' })
  @ApiOkResponse({ status: 200, description: 'The found record', type: User })
  @ApiResponse({  status: 403, description: 'Forbidden.'})
  async getOne(@Param('id',ParseIntPipe) userId: number): Promise<userEntity> {
    const data = await this.userService.getOne(userId);
    return data
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/edit')
  @ApiOperation({summary: 'Update Current User', description:' la descripcion',})
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({  status: 201, description: 'The record has been successfully modifier.'})  
  @ApiResponse({  status: 401,description: 'Not Authorized. Need log for this operation.'})  
  async update( @Body() updateUserDto: UpdateUserDto,@User() user:any) {
    const data = await this.userService.editUser(updateUserDto,user);
    return { message: 'Modificación correcta',data    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Change password', description:' la descripcion',})
  @ApiOkResponse({ status: 200, description: 'The password is successfully changed.'})  
  @ApiResponse({ status: 401,description: 'Not Authorized. Need log for this operation.'})  
  @ApiBody({ type: ChangePasswordDto, description:'Change the password'})
  @Patch('/change-password')
  async changeUserPassword( @Body() changePasswordDto: ChangePasswordDto,@User() user:any) {
    const data = await this.userService.changePassword(changePasswordDto,user);
    return { message: 'Modificación de Password correcta',data }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)  
  @Delete('delete')
  @ApiOperation({summary: 'Delete Current User', description:' la descripcion',})
  @ApiOkResponse({  status: 201, description: 'The record has been successfully deleted.'})  
  @ApiResponse({  status: 404,description: 'The entered ID does not exist.'})  
  async remove(@User() user:any) {
    return await this.userService.deleteUser(user.userId);
  } 

}
