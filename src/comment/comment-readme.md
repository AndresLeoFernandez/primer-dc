
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

## Métodos Públicos de Entidad

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

## Endpoints del módulo comment

**Ruta general:** comment

**Aclaración:** 
1. Los datados de salida se muestran en formato raw.
2. Para mayor detalle se puede ver información de los endpoints mediante la implementación generada mediante swagger accediendo en la dirección url ruta_del_proyecto/docs.


### Agregar un Comentario a un Documento del Proyecto

**Verbo:** POST

**Ruta:**  'comment/:idDoc'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a los usuarios agregar comentarios a los documentos de un proyecto. Los comentarios incluyen información como el autor, el contenido y el email del autor. No es necesario estar logueado para utilizar esta funcionalidad.

**Entradas:**
- **projectId:** El ID único del documento al que se desea agregar un comentario.
- **commentDto:** Objeto que contiene la siguiente información:
  - **email**: El email del autor del comentario.
  - **author:** El nombre del autor del comentario.
  - **content:**: El contenido del comentario.

**Flujo de Trabajo:**
1. Un usuario, que puede o no estar logueado, desea agregar un comentario a un documento específico de un proyecto.
2. El usuario proporciona el ID del documento y los detalles del comentario, que incluyen el email y el nombre del autor, así como el contenido del comentario.
3. La plataforma verifica si el documento con el ID especificado existe en la aplicación.
4. La plataforma agrega el comentario al documento correspondiente, incluyendo la información proporcionada por el usuario.
5. Se muestra una confirmación de que el comentario ha sido agregado con éxito.

**Salidas:**
- Confirmación de que el comentario ha sido agregado con éxito.

**Escenarios Adicionales:**
- Los comentarios se asocian con documentos específicos en un proyecto, lo que permite a los usuarios proporcionar retroalimentación y discutir contenido específico.
- No es necesario estar logueado para agregar comentarios, lo que fomenta la participación abierta en la plataforma.


### Mostrar Todos los Comentarios

**Verbo:** GET

**Ruta:**  'comment/view/all'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a los usuarios ver todos los comentarios disponibles en la plataforma, sin necesidad de estar logueados.

**Entradas:**
Ninguna.

**Flujo de Trabajo:**
1. Cualquier usuario, ya sea que esté logueado o no, desea ver todos los comentarios disponibles en la plataforma.
2. El usuario accede a la función "Mostra comentarios" que muestra todos los comentarios.
3. La plataforma recopila y muestra una lista de todos los comentarios disponibles en la plataforma, sin filtrarlos.

**Salidas:**
- Lista de todos los comentarios disponibles en la plataforma.

**Escenarios Adicionales:**
- Esta funcionalidad proporciona una visión general de todos los comentarios en la plataforma, lo que puede ser útil para la revisión general del contenido y las discusiones en curso.
- No es necesario estar logueado para utilizar esta función, lo que permite a cualquier usuario acceder a la lista de comentarios disponibles.


### Buscar y Mostrar Comentario por ID

**Verbo:** GET

**Ruta:**  'comment/':id/view'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a los usuarios buscar y mostrar un comentario específico en la plataforma utilizando su ID único. No es necesario estar logueado para utilizar esta función.

**Entradas:**
- **commentId**: El ID único del comentario que se desea buscar y mostrar.

**Flujo de Trabajo:**
1. Cualquier usuario, ya sea que esté logueado o no, desea buscar y mostrar un comentario específico por su ID.
2. El usuario proporciona el ID del comentario que desea buscar.
3. La plataforma verifica si existe un comentario con el ID especificado en la plataforma.
4. Si se encuentra un comentario con el ID proporcionado, la plataforma muestra el comentario.
5. Si no se encuentra ningún comentario con el ID especificado, se muestra un mensaje indicando que no se ha encontrado el comentario.

**Salidas:**
- Comentario encontrado que coincide con el ID proporcionado.
- Mensaje de error si no se encuentra ningún comentario con el ID especificado.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios acceder directamente a un comentario específico utilizando su ID único.
- No es necesario estar logueado para buscar y mostrar comentarios por ID, lo que facilita el acceso a la información a cualquier usuario.
