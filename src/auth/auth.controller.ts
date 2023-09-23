import { Controller, Post, Get, Body, UseGuards, Headers, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({summary: 'Logs user into the system', description:'',})
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'The acces has been successfully.'})  
  @ApiResponse({ status: 404, description: 'User not found.' })
  async signIn(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);
    
    return {
      message: 'Login exitoso',
      data,
    };
  }
  
  @Post('signup')
  @ApiOperation({summary: 'Register user in the app', description:'Add a new user to the system.',})
  @ApiBody({ type: CreateUserDto,description:'<p>The request body its an object with CreateUserDto structure.Its mandatory username, email and password. Email must be unique in the system.The username and password must have at least 5 characters.</p>' })
  @ApiResponse({ status: 201, description: 'The User has been successfully created.'})  
  @ApiResponse({ status: 400, description: 'Any requirement is not met in the input data.Show error message.' })
  @ApiResponse({ status: 409, description: 'The user email is already in use in the system.' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);    
    return result;
  }
  
  /*@UseGuards(AuthGuard)
  @Get('signout')
  async signOut(@Headers('authorization') bearer: string) {
    return this.authService.signOut(bearer)
  }*/

 
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Show profile user logon', description:'',})
  @ApiOkResponse({ status: 201, description: 'This is the user profile.'})  
  @ApiResponse({ status: 401, description: 'User Unauthorized'})  
  @Get('profile')
  async profile(@User() user) {
    const datos = await this.userService.buscarPorEmail(user.email);
    return {
      message: 'Petición correcta',
      datos,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('refresh')
  refreshToken(@User() user) {
    const data = this.authService.refresh(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }
}