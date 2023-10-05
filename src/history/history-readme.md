# History

## Generales

## Atributos de Entidad

<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>historyId</td>
<td>
<ul><li>Representa el número de identificación de la revisión.</li>
<li>Se genera automáticamente de forma incremental al darse de alta.</li>
<li>Valor único para cada documento en la aplicación.</li>
</ul>
</td></tr>
<tr><td>title</td>
<td><ul><li>Representa el título del documento.</li>
<li>Puede contener un maximo de 255 caracteres y no tiene restricciones sobre letras y numeros a utilizar.</li>
<li>Obligatoriedad: Requerida.</li>
</ul></td></tr>
<tr><td>content</td>
<td><ul><li>Representa el contenido del documento.</li>
<li>Puede contener un maximo de 65.535 caracteres y no tiene restricciones sobre letras y numeros a utilizar en su interior.</li>
<li>Obligatoriedad: Opcional.</li>
</ul></td></tr>
<tr><td>creationDate</td>
<td>
<ul><li>Representa la fecha de creación de la revisión en la aplicación.</li>
<li>Se asigna automáticamente cuando se crea la revisión.</li>
</ul></td></tr>
<tr><td>messaggeLog</td><td>
<ul><li>Representa un mensaje que se quiera dejar acentado al momento de hacer los cambios en el documento.</li>
<li>Obligatoriedad: Opcional.</li>
</ul></td></tr>
<tr><td>visits</td><td>
<ul><li>Registra la cantidad de visitas que obtuvo la revisión desde su creación.</li>
<li>Se incrementa a partir de las visualizaciones de forma automática.</li>
</ul></td></tr> 
<tr><td>document</td><td>
<ul><li>Relación que vincula las revisiones con el documento al cual pertenecen.</li>
<li>Obligatoriedad: Requerida.</li>
</ul></td></tr>
<tr><td>author</td><td>
<ul><li>Relación que vincula las revisiones con el colaborador que la genera.</li>
<li>Obligatoriedad: Requerida.</li></ul></td></tr>
</tbody>
</table>
</br>
</br>


## Métodos Publicos de Entidad

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getHistoryId():number</td><td>Retorna el número de identificación de la revisión.</td></tr>
<tr><td>getTitle():string </td><td>Retorna el nombre de la revisión.</td></tr>
<tr><td>getCreationDate()</td><td>Retorna la fecha de creación de la revisión.</td></tr>
<tr><td>getAuthor():Collaborator </td><td>Retorna el Collaborator que es el escritor de la revisión.</td></tr>
<tr><td>getContent():string </td><td>Retorna el contenido de la revisión.</td></tr>
<tr><td>getMessageLog():string </td><td>Retorna el mensaje registrado en la revisión.</td></tr>
<tr><td>getVisits():number </td><td>Retorna la cantidad de visitas que obtuvo la revisión.</td></tr>
<tr><td>setAddVisit():number </td><td>Incrementa el número de visitas de la revisión en uno.</td></tr>
</tbody>
</table>
</br>
</br>