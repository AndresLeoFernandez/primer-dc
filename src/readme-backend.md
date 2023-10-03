

# Proyectos Colaborativos
<p align="center"><img src="images/logo.png" alt="logo" width="300" height="300"/></p>

## Idea Original
<p align="justify">Generar una aplicación web que albergue de forma online proyectos, con distintos escritos (documentos), que puedan ser consultados por cualquier persona que navegue el sitio. Los proyectos estarán categorizados y los documentos podrán ser editados por distintos usuarios registrados que estén asignados para tal fin.</p>


## Descripción
<p align="justify">Para poder llevar a cabo la idea se resuelve entonces la creación de la aplicación <strong>Proyectos Colaborativos</strong>. De manera resumida podemos decir que los usuarios una vez registrados en la plataforma contarán con la posibilidad de crear uno o más proyectos, al que le deberán asignar una categoría al momento de su creación, conforme a las existentes, y además; el autor contara con la facultad de poder agregar distintos colaboradores (usuarios registrados en la plataforma) para que puedan ser parte en la edición, actualización y eliminación de los distintos documentos con que contará en su interior el proyecto creado.
Para poder lograr el sistema vamos a contar principalmente con las siguientes entidades que estarán interactuando según la necesidad planteada:
<ul>
<li>Usuario</li>
<li>Proyecto</li>
<li>Categoría</li>
<li>Colaborador</li>
<li>Documento</li>
<li>Revisión</li>
<li>Comentario</li>
</ul>
</p>

## Entidad USUARIO

<strong>Atributos</strong>

<table border="1">
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
 <tr><td>userId</td><td>Descripción: Representa el número de identificación del usuario.</br>Se genera automaticamente de forma incremental al darse de alta el usuario.</br>
Restricción: Único para cada usuario en la Aplicación. </br>
Obligatorio: Si.</td></tr>
<tr><td>email</td><td>Descripción: Representa el correo electrónico del usuario.</br>Como tal debe ser un formato válido de correo electrónico.</br>
Restricción: Debe ser único en la Aplicación, no pudiendo ser utilizado por otro usuario. </br>
Obligatorio: Si.</td></tr>
<tr><td>password</td><td>
Descripción:Representa la contraseña del usuario.</br> 
Restricción: Debe contar con mas de 5 caracteres. No puede contener el caracter " ". </br>
Obligatorio: Si.</td></tr>
<tr><td>firstName</td><td>
Descripción: Representa el nombre de pila del usuario.</br>
Restricción: No puede contener el caracter " ".De estar no puede ser vacio. </br>
Obligatoriedad: Opcional.</td></tr>
<tr><td>lastName</td><td>
Descripción: Representa el apellido del usuario.</br>
Restricción: No puede contener el caracter " ".De estar no puede ser vacio. </br>
Obligatoriedad: Opcional.
</td></tr>
<tr><td>username</td><td>
Descripción: Representa el nombre de usuario en la aplicacion.</br>
Restricción: Debe contar con mas de 5 caracteres.No puede contener el caracter " ".</br>
Obligatorio: Si.
</td></tr>
<tr><td>dateRegistration</td><td>
Descripción: Representa la fecha de alta del usuario en la aplicación.</br>
Restricción: No posee. Se asigna automaticamente cuando se crea el usuario.</br>
Obligatorio: Si.
</td></tr>
<tr><td>isActive</td><td>
Descripción: Representa si el usuario esta activo en la aplicación.</br>
Restricción: No posee. Se asigna automaticamente cuando se crea el usuario.</br>
Obligatorio: Si. 
</td></tr>    
</tbody>
</table>


<strong>Funcionalidades</strong>

<table border="1" style="width:100%">
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getUserId():number</td><td>Retorna el numero de identificación del usuario.</td></tr>
<tr><td>getFirstName():string </td><td>Retorna el firstname del usuario.</td></tr>
<tr><td>getLastName():string </td><td>Retorna el lastname del usuario.</td></tr>
<tr><td>getEmail(): string </td><td>Retorna el email del usuario.</td></tr>
<tr><td>getUsername(): String</td><td>Retorna el username del usuario.</td></tr>
<tr><td>getPassword(): string </td><td>Retorna el password encriptado del usuario.</td></tr>
<tr><td>getDateRegistration(): any</td><td>Retorna la fecha de alta en la aplicación del usuario.</td></tr>
<tr><td>IsActive(): Boolean </td><td>Retorna verdadero si el usuario se encuentra activo, falso en caso contrario.</td></tr>
<tr><td>setFirstName( newFirstName: string ): string</td><td>Asigna newFirstName al firstName del usuario.</td></tr>
<tr><td>setLastName( newLastName: string ): string </td><td>Asigna newLastName al lastName del usuario.</td></tr>
<tr><td>setPassword(newPassword: string): string </td><td>Asigna newLastName al lastName del usuario.</td></tr>
<tr><td>deactivate()</td><td>Asigna estado falso al usuario.</td></tr>
</tbody>
</table>

### Entidad PROYECTO

<strong>Atributos</strong>

<table border="1">
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>projectId</td><td>Descripción: Representa el número de identificación del projecto.</br>
 Se genera automaticamente de forma incremental al darse de alta el projecto.</br>
Restricción: Único para cada usuario en la Aplicación. </br>
Obligatorio: Si.</td></tr>

<tr><td>title</td><td>Descripción: Representa el título del projecto.</br>
Restricción: El título debe ser único por autor de projecto. No puede ser vacio.</br>
Obligatorio: Si.</td></tr>
<tr><td>category</td><td>
Descripción:Representa la categoría del projecto.</br> 
Restricción: Debe estar vigente dentro de la aplicación. De no existir la puede crear previamnente.</br>
Obligatorio: Si.</td></tr>
<tr><td>creationDate</td><td>
Descripción: Representa la fecha de creación del projecto en la aplicación.</br>
Restricción: No posee. Se asigna automaticamente cuando se crea el projecto.</br>
Obligatorio: Si.
</td></tr>

</tbody>
</table>

<strong>Funcionalidades</strong>

<table border="1" style="width:100%">
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getProjectId():number</td><td>Retorna el numero de identificación del projecto.</td></tr>
<tr><td>getTitle():string </td><td>Retorna el título del projecto.</td></tr>
<tr><td>getCreationDate():any </td><td>Retorna la fechad de creación del projecto.</td></tr>
<tr><td>getAuthor(): User </td><td>Retorna el usuario autor del projecto.</td></tr>
<tr><td>getCategory(): Category</td><td>Retorna la Categoría del projecto.</td></tr>
<tr><td>setTitle(newTitle:String): void </td><td>Asigna newTitle al titulo del projecto.</td></tr>
</tbody>
</table>
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
