 <h1 align="center">Proyectos Colaborativos</h1>
<p align="center"> <img src="images/logo.png" alt="logo" width="200" height="16
</hr>

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
#### ATRIBUTOS
##### email
Descripción: Representa el correo electronico del usuario.Como tal debe ser un formato valido de correo electronico.
Restricción: Debe ser unico en la Aplicación, no pudiendo ser utilizado por otro usuario. 
Obligatorio: Si.
##### password
Descripción:Representa la contraseña del usuario. 
Restricción: Debe contar con mas de 5 caracteres. No puede contener el caracter " ". 
Obligatorio: Si.
##### firstName 
Descripción: Representa el nombre de pila del usuario.
Restricción: No puede contener el caracter " ".De estar no puede ser vacio. 
Obligatoriedad: Opcional.
##### lastname
Descripción: Representa el apellido del usuario.
Restricción: No puede contener el caracter " ".De estar no puede ser vacio. 
Obligatoriedad: Opcional.
##### username
Descripción: Representa el nombre de usuario en la aplicacion.
Restricción: Debe contar con mas de 5 caracteres.No puede contener el caracter " ".
Obligatorio: Si.
##### dateRegistration
Descripción: Representa la fecha de alta del usuario en la aplicación.
Restricción: No posee. Se asigna automaticamente cuando se crea el usuario.
Obligatorio: Si.
##### isActive
Descripción: Representa si el usuario esta activo en la aplicación.
Restricción: No posee. Se asigna automaticamente cuando se crea el usuario.    

### Funciones
- getUserId():number
- getFirstName():string 
- getLastName():string 
- getEmail(): string 
- getUsername(): String
- getPassword(): string 
- getCollaborators(): Collaborator[]
- getDateRegistration(): any
- IsActive(): Boolean 
- setFirstName( newFirstName: string ): string
- setLastName( newLastName: string ): string 
- setPassword(newPassword: string): string 
- deactivate()

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
