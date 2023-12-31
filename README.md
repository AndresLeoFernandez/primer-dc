# Proyectos Colaborativos
<p align="center"><img src="src/images/logo.png" alt="logo" width="300" height="300"/></p>

## Idea
<p align="justify">Generar una aplicación web que albergue de forma online proyectos, con distintos escritos (documentos), que puedan ser consultados por cualquier persona que navegue el sitio. Los proyectos estarán categorizados y los documentos podrán ser editados por distintos usuarios registrados que estén asignados para tal fin.</p>
<p align="justify"> El sitio brindara herramientas para visualizar los proyectos a los usuarios por medio de un buscador general y ademas mostrara distintas secciones que agruparan por mas vistos, mas recientes entre otros.
Como particularidad cualquier usuario podra generar comentarios en los documentos para conocimientos del autor.</p>


## Descripción
<p align="justify">Para poder llevar a cabo la idea se resuelve entonces la creación de la aplicación <strong>Proyectos Colaborativos</strong>. De manera resumida podemos decir que los usuarios una vez registrados en la plataforma contarán con la posibilidad de crear uno o más proyectos, al que le deberán asignar una categoría al momento de su creación, conforme a las existentes, y además; el autor contara con la facultad de poder agregar distintos colaboradores (usuarios registrados en la plataforma) para que puedan ser parte en la edición, actualización y eliminación de los distintos documentos con que contará en su interior el proyecto creado.
Para poder lograr el sistema vamos a contar principalmente con las siguientes entidades que estarán interactuando según la necesidad planteada:
<ul>
<li>Usuario (user)</li>
<li>Proyecto (project)</li>
<li>Categoría (category)</li>
<li>Colaborador (collaborator)</li>
<li>Documento (document)</li>
<li>Revisión(history)</li>
<li>Comentario (comment)</li>
</ul>
</p>

## DML Proyectos Colaborativos
<p>Como resultado del analisis se resuelve ejecutar el siguiente modelado para cubrir las necesidades del proyecto.</p>
<p align=center><img src="src/images/diagrama.png" alt="diagrama" width="70%"/></p> 
</br>
<p>En la sección de documentación se encuentra el detalle tecnico de cada una de las entidades mencionadas con sus atributos, metodos, relaciones y el detalle exhaustivo de cada uno de los Endpoints disponibles para su utilización segun modulo de pertenencia.</p>
</br>


## Documentación 

### Aclaraciones Importantes

1. Del proyecto
   
<p align="justify">Actualmente el proyecto es funcional conforme a lo pactado y planeado por el Grupo de Trabajo. Probablemente cuando se genere el Front End se detectara alguna necesidad la cual se adecuara conforme al requerimiento del momento. 
Si tenemos que dejar realizada la aclaración que a efectos de realizar las pruebas, el proyecto se configuro en su totalidad para poder utilizar swagger en la direccion localhost:puerto/docs y hay un endpoint puntualmente el de generar busquedas de proyectos, conforme a titulo, author, categoria el cual no pudimos generar la configuración en Swagger para que se pueda ejecutar desde alli debido a que no detectamos como aplicar el decorador @ApiQuery correspondiente para array[]. 
Para este caso particular utilizamos el programa Thunder Client sin problemas.</p>
   
3. [Del Grupo de Trabajo](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/readme-backend.md)


### Estructura del Proyecto

>src
>
>  - [auth](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/auth/auth-readme.md)
>
>  - [category](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/category/category-readme.md)
>
>  - [collaborator](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/collaborator/collaborator-readme.md)
>
>  - [comment](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/comment/comment-readme.md)
>
>  - common
>
>  - constants
>
>  - [decorators](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/decorators/decorators-readme.md)
>
>  - [document](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/document/document-readme.md)
>
>  - [guards](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/guards/guards-readme.md)
>
>  - helpers
>
>  - [history](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/category/history-readme.md)
>
>  - images
>
>  - [project](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/project/project-readme.md)
>
>  - [user](https://github.com/AndresLeoFernandez/primer-dc/blob/main/src/user/user-readme.md)
>

## Tecnologías Utilizadas
- [Node.js](https://nodejs.org/es)
- [Typescript](https://www.typescriptlang.org/)
- [NestJS](https://github.com/nestjs/nest)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- [Typeorm](https://typeorm.io/)
- [Swagger](https://swagger.io/)

## Instalación

**Accede a tu carpeta de Trabajo**
```bash
cd nombre-carpeta
```
**Clona el proyecto**

```bash
git clone https://github.com/AndresLeoFernandez/primer-dc.git **nombre-carpeta-proyecto**
```

**Accede a tu carpeta nombre-carpeta**

```bash
cd nombre-carpeta-proyecto
```
**Instalación**

```bash
$ npm install
```
**Crea BD y aplica los datos en el archivo correpondiente**
```bash
1. Crea una base de datos vacia en algun Gestor de Base de Datos
2. Accede a la carpeta del proyecto src
3. Edita el archivo de nombre app.module.ts
4. Modifica key username por el que asignaste en el administrador de base de datos del punto 1.
5. Modifica key password por el que asignaste en el administrador de base de datos del punto 1.
6. Modifica key database por el que asignaste en el administrador de base de datos del punto 1.
7. Para correr el proyecto por primera vez deberas dejar la key synchronize: true  
```    

**Corre la aplicación**

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Grupo de Trabajo

- Author - [Andrés Fernández](https://github.com/AndresLeoFernandez)
- Author - [Gisela Gentile](https://github.com/Gisela-Gentile)
