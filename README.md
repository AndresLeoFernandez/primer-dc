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
<p>A continuación se detallan las entidades con sus atributos, funcionalidades declaradas y se comenta tambien la relación que van a mantener entre las mismas.</p>
</br>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Code Contributors

- Author - [Andrés Fernández](https://github.com/AndresLeoFernandez)
- Author - [Gisela Gentile](https://github.com/Gisela-Gentile)
