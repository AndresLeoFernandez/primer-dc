 <h1 align="center">Proyectos Colaborativos</h1>
<p align="center"> <img src="images/logo.png" alt="logo" width="200" height="165">
</p>

***

## Idea Original
<p align="justify">Generar una aplicación web que albergue de forma online proyectos,con distintos escritos(documentos), que puedan ser consultados por cualquier persona que navegue el sitio. Los proyectos estarán categorizados y los documentos podrán ser editados por distintos usuarios registrados que estén asignados para tal fin.</p>


## Descripción
<p align="justify">Para poder llevar a cabo la idea se resuelve entonces la creación de la aplicación Proyectos Colaborativos. De manera resumida podemos decir que los usuarios una vez registrados en la plataforma contarán con la posibilidad de crear uno o más proyectos, al que le deberán asignar una categoría al momento de su creación, conforme a las vigentes, y además; contara con la facultad de poder agregar distintos colaboradores (usuarios registrados en la plataforma) para que puedan ser parte en la edición, actualización y eliminación de los distintos documentos con que contará en su interior el proyecto creado.
Para poder lograr el sistema vamos a contar principalmente con las siguientes entidades que estarán interactuando según la necesidad planteada:
<ol>
<li>Usuario</li>
<li>Proyecto</li>
<li>Categoría</li>
<li>Colaborador</li>
<li>Documento</li>
<li>Revisione</li>
<li>Comentario</li>
</ol>
</p>

### Descripción de Entidad USUARIO
El usuario contara con los siguientes atributos:

email: Representara el correo electronico del usuario. 
Descripcion: Como tal debe ser un formato valido.
Restriccion: Debe ser unico en la Aplicacion, no pudiendo ser utilizado por otro usario. 
Obligatorio: Si.

password: Representara la contraseña del usuario.
Descripcion: 
Restriccion: Debe contar con mas de 5 caracteres. No puede contener el caracter " ". 
Obligatorio: Si.

firstName: Representa el nombre de pila del usuario;
Descripcion: 
Restriccion: Debe ser unico en la Aplicacion, no pudiendo ser utilizado por otro usario. 
Obligatorio: No.

Descripcion: 
Restriccion: Debe ser unico en la Aplicacion, no pudiendo ser utilizado por otro usario. 
Obligatorio: Si.

Descripcion: 
Restriccion: Debe ser unico en la Aplicacion, no pudiendo ser utilizado por otro usario. 
Obligatorio: Si.

  
  @ApiPropertyOptional({ required: false, example: 'Nombre',})
  @IsString()
  @NotContains(" ", { message: "No spaces allowed in firstname."})
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  @Matches(/^(?!\s*$).+/, { message: 'Name can not be empty or have whitespace.' })
  readonly firstName?: string;
  
  @ApiPropertyOptional({ type: () => String, required: false, example: 'Apellido',})
  @IsString()
  @NotContains(" ", { message: "No spaces allowed in lastname."})
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  @Matches(/^(?!\s*$).+/, { message: 'LastName can not be empty or have whitespace.' })
  readonly lastName?: string;

  @ApiProperty({ type: () => String, required: true, example: 'Manue23',})
  @IsString()
  @IsNotEmpty()
  @NotContains(" ", { message: "No spaces allowed."})
  @Transform(({ value }) => sanitizeInput(value))
  @MinLength(5, { message: 'Username should contain more than 5 letters.' })
  readonly username: string;
### Descripción de Entidad PROYECTO

### Descripción de Entidad CATEGORIA

### Descripción de Entidad COLABORADOR

### Descripción de Entidad DOCUMENTO

### Descripción de Entidad REVISION

### Descripción de Entidad COMENTARIO


### Objetivo General
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

 <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Code Contributors

- Author - [Andrés Fernández](https://github.com/AndresLeoFernandez)
- Author - [Gisela Gentile](https://github.com/Gisela-Gentile)


## License

Nest is [MIT licensed](LICENSE).
