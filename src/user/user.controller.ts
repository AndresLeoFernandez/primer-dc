import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {    
  }

  @Post('add')
  @ApiOperation({summary: 'Create New User', description:'',})
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createOne(@Body() createUserDto: CreateUserDto) {
    return  await this.userService.createUser(createUserDto);
    
  }

  @Get('view/all')
  @ApiOperation({summary: 'Obtain all Users', description:'',})
  @ApiResponse({ status: 201, description: 'Give all the Users.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.userService.getUsers();
  }

  /*@Get(':username')
  getUser(@Param('username') username:string): Promise<User> {
      return this.userService.findOneBy(username)
  } */

  
  @Get(':id/view')
  @ApiOperation({summary: 'Obtain User by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'userId' })
  @ApiResponse({  status: 200, 
                  description: 'The found record',
                  type: User
              })
  @ApiResponse({  status: 403,
                  description: 'Forbidden.'
              })
  async getOne(@Param('id',ParseIntPipe) userId: number): Promise<User> {
    const data = await this.userService.getOne(userId);
    return data
  }

  @Patch(':id/edit')
  @ApiOperation({summary: 'Change User by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'userId' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({  status: 201,
                  description: 'The record has been successfully modifier.'
              })  
  @ApiResponse({  status: 404,
                  description: 'Forbidden change.' 
              })
  update( @Param('id', ParseIntPipe) id: number,
          @Body() updateUserDto: UpdateUserDto
        ) {
    return this.userService.editUser(id, updateUserDto);
  }


  /*@Patch('change_password')
  async changePassword(@User() user, @Body() changePasswordDto: ChangePasswordDto) {
    return await this.usersService.update(user.id, {
      password: changePasswordDto.newPassword,
    });
  }*/
  @Delete('delete/:id')
  @ApiOperation({summary: 'Delete User by id', description:' la descripcion',})
  @ApiParam({ name: 'id', description: 'userId' })
  @ApiResponse({  status: 201,
                  description: 'The record has been successfully deleted.'
              })  
  @ApiResponse({  status: 403,
                  description: 'Forbidden.' 
              })  
  remove(@Param('id', ParseIntPipe) id: number ) {
    return this.userService.deleteUser(id);
  }
  
  

}
