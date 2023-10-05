# Document

## Generales

## Atributos de Entidad

<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>documentId</td>
<td>
<ul><li>Representa el número de identificación del documento.</li>
<li>Se genera automáticamente de forma incremental al darse de alta.</li>
<li>Valor único para cada documento en la aplicación.</li>
</ul>
</td></tr>
<tr><td>type</td>
<td><ul><li>Representa un tipo de documento.</li>
<li>Se aplica un valor predeterminado de nombre "TEXT".</br> Esta pensado para poder ampliar en un futuro tipo de documentos que se puedan generar.</li>
</ul></td></tr>
<tr><td>creationDate</td>
<td>
<ul><li>Representa la fecha de creación del documentos en la aplicación.</li>
<li>Se asigna automáticamente cuando se crea el documento.</li>
</ul></td></tr>
<tr><td>lastHistoryId</td><td>
<ul><li>Registra el ultimo identificador de history genenerado del documento.</li>
<li>Se asigna automáticamente cuando se crea el proyecto.</li>
</ul></td></tr>
<tr><td>visits</td><td>
<ul><li>Registra la cantidad de visitas que obtuvo el documento desde su creación.</li>
<li>Se incrementa a partir de las visualizaciones de forma automática.</li>
</ul></td></tr> 
<tr><td>project</td><td>
<ul><li>Relación que vincula los documentos con el projecto al cual pertenece.</li>
<li>Obligatoriedad: Requerida.</li>
</ul></td></tr>
<tr><td>author</td><td>
<ul><li>Relación que vincula los documentos con el colaborador que es el autor del documento.</li>
<li>Obligatoriedad: Requerida.</li></ul></td></tr>
<tr><td>comments</td><td>
<ul><li>Relación que vincula el documento con los comentarios asignados.</li>
<li>Obligatoriedad: Opcional.</li></td></tr>
<tr><td>histories</td><td>
<ul><li>Relación que vincula el documento con las revisiones que obtuvo.</li>
</td></tr>
</tbody>
</table>
</br>
</br>

## Métodos Publicos de Entidad

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getDocumentId():number</td><td>Retorna el número de identificación del documento.</td></tr>
<tr><td>getCreationDate()</td><td>Retorna la fecha de creación del documento.</td></tr>
<tr><td>getType():string </td><td>Retorna el tipo de documento.</td></tr>
<tr><td>getLastHistoryId():number </td><td>Retorna el último número de revisión generada en el documento.</td></tr>
<tr><td>getVisits():number </td><td>Retorna la cantidad de visitas que obtuvo el documentos hasta el momento.</td></tr>
<tr><td>setLastHistoryId(newHistoryId:number) void </td><td>Asigna newHistoryId como ultima revisión del documento.</td></tr>
<tr><td>setAddVisit():number </td><td>Incrementa el número de visitas del documentos en uno.</td></tr>
</tbody>
</table>
</br>
</br>

## Endpoints del módulo Document

**Ruta:** document

**Aclaración:** 
1. Los datados de salida se muestran en formato raw.
2. Para mayor detalle se puede ver información de los endpoints mediante la implementación generada mediante swagger accediendo en la dirección url ruta_del_proyecto/docs.
