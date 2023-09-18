import { Controller, Post, Get, Body, UseGuards, Headers, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,)
    {}

  
  @Post('login')
  @ApiOperation({summary: 'Sign In the app', description:'',})
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'The acces has been successfully.'})  
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async signIn(@Body() loginDto: LoginDto) {
      
    /*console.log(userEntity);*/
    return await this.authService.login(loginDto);
    /*const data = await this.authService.login(loginDto.email,loginDto.password);
    return {
      message: 'Login exitoso',
      data,
    };*/
  }
  
  @Post('signup')
  @ApiOperation({summary: 'Register in the app', description:'',})
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})  
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto)
  }

  
  /*@UseGuards(AuthGuard)
  @Get('signout')
  async signOut(@Headers('authorization') bearer: string) {
    return this.authService.signOut(bearer)
  }*/



  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@User() user) {
    return {
      message: 'Petición correcta',
      user,
    };
  }

  /*@Auth() falta crear este decorador
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user.getEmail(),user.getPassword());
    return {
      message: 'Refresh exitoso',
      data,
    };
  }*/
}