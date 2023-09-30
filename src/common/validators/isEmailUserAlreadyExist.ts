import { Injectable } from "@nestjs/common";
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserService } from "src/user/user.service";
/* no funciona */
@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
@Injectable()
export class IsEmailUserAlreadyExistConstraint implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) 
  {}

  async validate(text: string){
    console.log(`text a verificar ${text}`);
    const result = await this.userService.findOneBy({email: text,});
    console.log(result);
    return result? true:false;
  }
}

export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUserAlreadyExistConstraint,
    });
  };
}

    //MODO
   /* Luego debe importar esta clase al módulo de usuarios

providers: [UsersService, IsEmailUserAlreadyExistConstraint]
Y después de todo, puede usar este decorador personalizado en su DTO, donde puede pasar un mensaje personalizado como salida de error

  @IsEmailUserAlreadyExist({
    message: 'Пользователь с таким email уже существует',
  })
  readonly email: string;*/

  /*info para ver sobre el tema 
  https://github.com/typestack/class-validator/blob/develop/sample/sample6-custom-decorator/IsLongerThan.ts
  https://stackoverflow.com/questions/72658454/nest-js-cannot-read-properties-of-undefined
  https://stackoverflow.com/questions/72194188/email-verification-with-class-validator-in-nestjs
  https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va
  https://github.com/nestjs/nest/issues/528#issuecomment-382330137


  check esta opcion
  https://github.com/neoteric-eu/nestjs-auth/blob/master/src/app/user/user.validator.ts


  
  */