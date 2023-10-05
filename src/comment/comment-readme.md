
# Comment

## Generales

## Atributos de Entidad

<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>commentId</td>
<td>
<ul><li>Representa el número de identificación del comentario.</li>
<li>Se genera automáticamente de forma incremental al darse de alta.</li>
<li>Valor único para cada comentario en la aplicación.</li>
</ul>
</td></tr>
<tr><td>author</td>
<td><ul><li>Representa el nombre del usuario que inscribe el comentario.</li>
<li>Puede contener un maximo de 255 caracteres y no tiene restricciones sobre letras y numeros a utilizar.</li>
<li>Obligatoriedad: Requerida.</li>
</ul></td></tr>
<tr><td>email</td><td><ul>
<li>Representa el correo electrónico del usuario.</li>
<li>Como tal debe ser un formato válido de correo electrónico.</li>
<li>Obligatoriedad: Requerida.</li></ul> </td></tr>
<tr><td>content</td>
<td><ul><li>Representa el contenido del comentario.</li>
<li>Puede contener un maximo de 65.535 caracteres y no tiene restricciones sobre letras y numeros a utilizar en su interior.</li>
<li>Obligatoriedad: Requerida.</li>
</ul></td></tr>
<tr><td>creationDate</td>
<td>
<ul><li>Representa la fecha de creación del comentario en la aplicación.</li>
<li>Se asigna automáticamente cuando se crea el comentario.</li>
</ul></td></tr>
<tr><td>document</td><td>
<ul><li>Relación que vincula los comentarios con el documento al cual se aplica.</li>
<li>Obligatoriedad: Requerida.</li>
</ul></td></tr>
</tbody>
</table>
</br>
</br>

## Métodos Publicos de Entidad

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getCommentId():number</td><td>Retorna el número de identificación del comentario.</td></tr>
<tr><td>getTitle():string </td><td>Retorna el nombre de la revisión.</td></tr>
<tr><td>getCreationDate()</td><td>Retorna la fecha de creación del comentario.</td></tr>
<tr><td>getAuthor():string</td><td>Retorna el nombre descriptivo del escritor del comentario.</td></tr>
<tr><td>getContent():string </td><td>Retorna el contenido del comentario.</td></tr>
<tr><td>getEmailCommentAuthor():string </td><td>Retorna el correo electronico informado en el comentario.</td></tr>
</tbody>
</table>
</br>
</br>


