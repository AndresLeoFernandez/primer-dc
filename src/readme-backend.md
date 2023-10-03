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

## DML Proyectos Colaborativos
<p>Como resultado del analisis se resuelve ejecutar el siguiente modelado para cubrir las necesidades del proyecto.</p>
<p align=center><img src="images/diagrama.png" alt="diagrama" width="70%"/></p> 
</br>
<p>A continuación se detallan las entidades con sus atributos, funcionalidaes declaradas y se comenta tambien la relación que van a mantener entre las mismas.</p>
</br>

## Entidad USUARIO (tabla users)

<strong>Atributos</strong>
<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>userId</td><td>
<ul>
<li>Representa el número de identificación del usuario.</li>
<li>Se genera automáticamente de forma incremental al darse de alta los usuarios.</li>
<li>Es único para cada usuario en la aplicación. </li>
</ul></td></tr>
<tr><td>email</td><td><ul>
<li>Representa el correo electrónico del usuario.</li>
<li>Como tal debe ser un formato válido de correo electrónico.</li>
<li>Debe ser único su uso en la aplicación, no pudiendo ser utilizado por otro usuario.</li>
<li>Obligatoriedad: Requerida.</li></ul> </td></tr>
<tr><td>password</td><td>
<ul><li>Representa la contraseña del usuario.</li> 
<li>Restricción: Debe contar con mas de 5 caracteres. No puede contener el caracter " ". </li>
<li>Obligatoriedad: Requerida.</li></ul> </td></tr>
<tr><td>firstName</td><td>
<ul><li>Representa el nombre de pila del usuario.</li>
<li>Restricción: No puede contener el caracter " ".De estar no puede ser vacio. </li>
<li>Obligatoriedad: Opcional.</li></ul></td></tr>
<tr><td>lastName</td><td>
<ul><li>Representa el apellido del usuario.</li>
<li>Restricción: No puede contener el caracter " ".De estar no puede ser vacio. </li>
<li>Obligatoriedad: Opcional.</li></ul>
</td></tr>
<tr><td>username</td><td>
<ul><li>Representa el nombre de usuario en la aplicación.</li>
<li>Restricción: Debe contar con mas de 5 caracteres.No puede contener el caracter " ".</li>
<li>Obligatoriedad: Requerida.</li></ul>
</td></tr>
<tr><td>dateRegistration</td><td>
<ul><li>Representa la fecha de alta del usuario en la aplicación.</li>
<li>Se asigna automaticamente cuando se crea el usuario.</li>
</ul>
</td></tr>
<tr><td>isActive</td><td>
<ul><li>Representa si el usuario esta activo en la aplicación.</li>
<li>Se asigna automáticamente cuando se crea el usuario.</li>
</ul></td></tr>    
<tr><td>projects</td><td>
<ul><li>Relación que vincula al usuario con los proyectos de su autoría.</li>
<li>Obligatoriedad: Opcional.</li></ul>
</td></tr>    
<tr><td>collaborators</td><td>
<ul><li>Relación que vincula al usuario como collaborador de los distintos proyectos donde es participe.</li>
<li>Obligatoriedad: Opcional.</li></ul> 
</td></tr>    
</tbody>
</table>
</br>
<strong>Funcionalidades</strong>
</br>
</br>

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getUserId():number</td><td>Retorna el número de identificación del usuario.</td></tr>
<tr><td>getFirstName():string </td><td>Retorna el firstname del usuario.</td></tr>
<tr><td>getLastName():string </td><td>Retorna el lastname del usuario.</td></tr>
<tr><td>getEmail(): string </td><td>Retorna el email del usuario.</td></tr>
<tr><td>getUsername(): String</td><td>Retorna el username del usuario.</td></tr>
<tr><td>getPassword(): string </td><td>Retorna el password encriptado del usuario.</td></tr>
<tr><td>getDateRegistration(): any</td><td>Retorna la fecha de alta del usuario en la aplicación.</td></tr>
<tr><td>IsActive(): Boolean </td><td>Retorna verdadero si el usuario se encuentra activo,</br> falso en caso contrario.</td></tr>
<tr><td>setFirstName( newFirstName: string ): string</td><td>Asigna newFirstName al firstName del usuario.</td></tr>
<tr><td>setLastName( newLastName: string ): string </td><td>Asigna newLastName al lastName del usuario.</td></tr>
<tr><td>setPassword(newPassword: string): string </td><td>Asigna newPassword al usuario.</td></tr>
<tr><td>deactivate()</td><td>Asigna estado falso a isActive.</td></tr>
</tbody>
</table>
</br>
</br>

## Entidad PROYECTO (tabla projects)

<strong>Atributos</strong>
<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>projectId</td><td><ul><li>Representa el número de identificación del proyecto.</li>
<li>Se genera automáticamente de forma incremental al darse de alta el proyecto.</li>
<li>Restricción: Valor único para cada proyecto de la aplicación. </li>
</ul></td></tr>
<tr><td>title</td><td><ul><li>Representa el título del proyecto.</li>
<li>Restricción: El título debe ser único por autor de proyecto. No puede ser vacio.</li>
<li>Obligatoriedad: Requerida.</li></ul></td></tr>
<tr><td>creationDate</td><td>
<ul><li>Representa la fecha de creación del proyecto en la aplicación.</li>
<li>Se asigna automáticamente cuando se crea el proyecto.</li>
</ul></td></tr>
<tr><td>author</td><td><ul><li>Relación que vincula a un usuario como author del proyecto.</li>
<li>Obligatoriedad: Requerida.</li></ul></td></tr>
<tr><td>category</td><td>
<ul><li>Relacion que vincula una categoría con el proyecto.</li> 
<li>Restricción: La categoría debe estar vigente dentro de la aplicación. De no existir la puede crear previamnente.</li>
<li>Obligatoriedad: Requerida.</li></ul></td></tr>
<tr><td>documents</td><td>
<ul><li>Relación que vincula los documentos que posee el proyecto.</li> 
<li>Obligatoriedad: Opcional.</li></ul></td></tr>
<tr><td>collaborators</td><td>
<ul><li>Relación que vincula los collaboradores que posee el proyecto.</li>
<li>Obligatoriedad: Opcional.</li>
</ul></td></tr>
 
</tbody>
</table>
</br>
<strong>Funcionalidades</strong>
</br></br>

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getProjectId():number</td><td>Retorna el número de identificación del proyecto.</td></tr>
<tr><td>getTitle():string </td><td>Retorna el título del proyecto.</td></tr>
<tr><td>getCreationDate():any </td><td>Retorna la fecha de creación del proyecto.</td></tr>
<tr><td>getAuthor(): User </td><td>Retorna el usuario autor del proyecto.</td></tr>
<tr><td>getCategory(): Category</td><td>Retorna la categoría del proyecto.</td></tr>
<tr><td>setTitle(newTitle:String): void </td><td>Asigna newTitle al título del proyecto.</td></tr>
</tbody>
</table>
</br>
</br>

## Entidad CATEGORÍA (tabla categories)

<strong>Atributos</strong>
<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>categoryId</td><td><ul>
<li>Representa el número de identificación de la categoria.</li>
<li>Se genera automáticamente de forma incremental al darse de alta.</li>
<li>Restricción: Valor único para cada categoría en la aplicación.</li>
</ul></td></tr>
<tr><td>name</td><td><ul>
<li>Representa el nombre de la categoría.</li>
<li>No puede ser vacia.</li>
<li>Obligatoriedad: Requerida.</li></ul></td></tr>
<tr><td>createdAt</td><td><ul>
<li>Representa la fecha de creación de la categoría en la aplicación.</li>
<li>Se asigna automáticamente cuando se crea.</li>
</ul></td></tr>
<tr><td>createdAt</td><td>
<ul><li>Representa la fecha de última actualización del nombre de la categoría.</li>
<li>Se aplica automáticamente cuando se modifica.</li>
</ul></td></tr>
 <tr><td>projects</td><td>
 <ul><li>Relación que vincula la categoría con los proyectos donde es asignada.</li>
<li>Obligatoriedad: Opcional.</li></ul>
</td></tr>
</tbody>
</table>
</br></br>

<strong>Funcionalidades</strong>

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getCategoryId():number</td><td>Retorna el número de identificación de la categoría.</td></tr>
<tr><td>getName():string </td><td>Retorna el nombre de la categoría.</td></tr>
<tr><td>setName(newName:String): void </td><td>Asigna newName como nombre de la categoría.</td></tr>
</tbody>
</table>
</br>
</br>

## Entidad COLABORADOR (tabla collaborators)

<strong>Atributos</strong>
<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>collaboratorId</td>
<td><ul><li>Representa el número de identificación del colaborador.</li>
<li>Se genera automáticamente de forma incremental al darse de alta.</li>
<li>Valor único para cada collaborador segun el proyecto.</li>
</ul></td></tr>
<tr><td>role</td><td><ul>
<li>Representa el rol que tendra el usuario dentro del proyecto pudiendo ser "OWNER" o "COLLABORATOR".</li>
<li>No puede ser vacia,solo una de las opciones.</li>
<li>Obligatoriedad: Requerida.</li></ul></td></tr>
<tr><td>project</td><td>
<ul><li>Relación que vincula el colaborador con el proyecto.</li>
<li>Obligatoriedad: Opcional.</li></ul></td></tr>
<tr><td>user</td><td>
<ul><li>Relación que vincula el colaborador con el usuario.</li>
<li>Obligatoriedad: Opcional.</li></ul></td></tr>
<tr><td>documents</td><td>
<ul><li>Relación que vincula el colaborador con los documentos donde puede operar.</li>
<li>Obligatoriedad: Opcional.</li></ul></td></tr>
</tbody>
</table>
</br></br>

<strong>Funcionalidades</strong>

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getCategoryId():number</td><td>Retorna el número de identificación de la categoría.</td></tr>
<tr><td>getName():string </td><td>Retorna el nombre de la categoría.</td></tr>
<tr><td>setName(newName:String): void </td><td>Asigna newName como nombre de la categoría.</td></tr>
</tbody>
</table>
</br>
</br>


## Entidad DOCUMENTO (tabla documents)

<strong>Atributos</strong>
<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>documentId</td>
<td><ul><li>Representa el número de identificación del documento.</li>
<li>Se genera automáticamente de forma incremental al darse de alta.</li>
<li>Valor único para cada documento en la aplicacion proyecto.</li>
</ul></td></tr>
<tr><td>type</td>
<td><ul><li>Representa el número de identificación del documento.</li>
<li>Se genera automáticamente de forma incremental al darse de alta.</li>
<li>Valor único para cada documento en la aplicacion proyecto.</li>
</ul></td></tr>
 
## Entidad REVISION (tabla histories)

## Entidad COMENTARIO (tabla comments)


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