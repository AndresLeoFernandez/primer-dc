import { Controller, Post, Get, Body, UseGuards,} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User  } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/Login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  )
  {}
  
  @Post('login')
  @ApiOperation({summary: 'Logs user into the app', description:'',})
  @ApiBody({ type:LoginDto, description:'Contain mandatory email and password.' })
  @ApiOkResponse({ status: 201, description: 'The acces has been successfully.'})  
  @ApiResponse({ status: 404, description: 'User not found.' })
  async signIn(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);    
    return {
      message: 'Login exitoso',
      data,
    };
  }
  
  @Post('signup')
  @ApiOperation({summary: 'Register new user in the App', description:'Add a new user to the App.',})
  @ApiBody({ type: CreateUserDto, description:'<p>The request body its an object with CreateUserDto structure.</p><p>Its mandatory username, email and password.</p><p>Email must be unique in the App.The username and password must have at least 5 characters.</p>' })
  @ApiOkResponse({ status: 201, description: 'The User has been successfully created in the App.'})  
  @ApiResponse({ status: 400, description: 'Any requirement is not met in the input data.Show error message.' })
  @ApiResponse({ status: 409, description: 'The user email is already in use in the App.' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);    
    return result;
  }
   
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Displays the profile of the logged-in user', description:'',})
  @ApiOkResponse({ status: 200, description: 'Current user profile.'})  
  @ApiResponse({ status: 401, description: 'User Unauthorized.'})  
  @Get('profile')
  async profile(@CurrentUser() user:User) {
    return {
      message: 'User Data',
      user:user,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Refresh token for user logon', description:'',})
  @ApiOkResponse({ status: 200, description: 'The token was generated correctly.'}) 
  @ApiResponse({ status: 401, description: 'User Unauthorized.'}) 
  @Post('refresh')
  refreshToken(@CurrentUser() user:User) {
    const data = this.authService.refresh(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }
}