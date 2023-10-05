# Project

## Generales

## Atributos de Entidad

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
<ul><li>Relación que vincula una categoría con el proyecto.</li> 
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

## Métodos Públicos de Entidad

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

## Endpoints del módulo Project

**Ruta general:** project

**Aclaración:** 
1. Los datados de salida se muestran en formato raw.
2. Para mayor detalle se puede ver información de los endpoints mediante la implementación generada mediante swagger accediendo en la dirección url ruta_del_proyecto/docs.
   

### Crear un Proyecto

**Verbo:** POST

**Ruta:**  'project/add'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.

**Descripción:**
Esta funcionalidad permite a los usuarios autenticados crear un nuevo proyecto en la plataforma. Se verifica que la categoría especificada exista en la base de datos y que el título del proyecto no esté repetido en otros proyectos.

**Entrada:**
- **createProjectDto:** Un objeto de transferencia de datos (DTO) que contiene la siguiente información:
  - **Título del Proyecto (title):** El título del proyecto que el usuario desea crear.
  - **Categoría del Proyecto (category):** La categoría a la que se asignará el proyecto.

**Flujo de Trabajo:**
1. Un usuario autenticado inicia sesión en la plataforma.
2. El usuario navega a la sección o página que permite crear un nuevo proyecto.
3. El usuario completa un formulario o proporciona la información requerida en el **createProjectDto**, que incluye el título y la categoría del proyecto.
4. La plataforma verifica si la categoría especificada existe en la base de datos de categorías.
5. La plataforma verifica si el título del proyecto ya está siendo utilizado por otro proyecto.
6. Si la categoría existe y el título no está duplicado, se crea un nuevo proyecto en la base de datos, asignando el título y la categoría proporcionados por el usuario.
7. Se muestra un mensaje de confirmación al usuario indicando que el proyecto se ha creado con éxito.

**Salidas:**
- Confirmación de que el proyecto se ha creado con éxito.
- Mensaje de error si la categoría no existe en la base de datos.
- Mensaje de error si el título del proyecto ya está siendo utilizado por otro proyecto.

**Escenarios Adicionales:**
- Esta funcionalidad solo está disponible para usuarios autenticados, lo que garantiza la autoría de proyectos.
- Después de la creación exitosa, el usuario puede ser redirigido a la página de detalles del proyecto recién creado.


### Agregar Colaborador a un Proyecto

**Verbo:** POST

**Ruta:**  'project/:id/add/document'

**Restricción de Acceso:**
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto: El usuario antes descripto debe ser dueño del proyecto.

**Descripción:**
Esta funcionalidad permite al propietario de un proyecto agregar un colaborador al mismo. El propietario debe proporcionar el ID del proyecto al que desea agregar al colaborador y el correo electrónico del colaborador que se desea agregar. Se realizan verificaciones para garantizar que el usuario que realiza la acción sea el propietario del proyecto y que el colaborador no esté ya asociado con el proyecto.

**Entradas:**
- **projectId:** El ID del proyecto al que se desea agregar un colaborador.
- **emailUserDto:** Un objeto de transferencia de datos (DTO) que contiene la siguiente información:
  - **email:** El correo electrónico del colaborador que se desea agregar.

**Flujo de Trabajo:**
1. El propietario del proyecto inicia sesión en la plataforma.
2. El propietario navega a la sección o página de administración del proyecto y selecciona la opción para agregar un colaborador.
3. El propietario proporciona el ID del proyecto y el correo electrónico del colaborador.
4. La plataforma verifica si el usuario está autenticado y es el propietario del proyecto.
5. Se verifica si el correo electrónico proporcionado en el **emailUserDto** está registrado en el sistema.
6. Se verifica si el colaborador ya está asociado con el proyecto. Si lo está, se muestra un mensaje de error indicando que el colaborador ya es parte del proyecto.
7. Si todas las verificaciones son exitosas, el colaborador se agrega al proyecto.
8. Se muestra un mensaje de confirmación de que el colaborador se ha agregado con éxito al proyecto.

**Salidas:**
- Confirmación de que el colaborador se ha agregado con éxito al proyecto.
- Mensaje de error si el usuario no está autenticado o si no es el propietario del proyecto.
- Mensaje de error si el correo electrónico proporcionado no está registrado en el sistema.
- Mensaje de error si el colaborador ya es parte del proyecto.

**Escenarios Adicionales:**
- Solo el propietario del proyecto debe tener permisos para agregar colaboradores.
- Se debe realizar una validación para garantizar que el correo electrónico proporcionado esté en un formato válido.

### Agregar un Documento a un Proyecto

**Verbo:** POST

**Ruta:**  'project/:id/add/document'

**Restricción de Acceso:**
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto o Colaborador: El usuario antes descripto debe ser dueño del proyecto o colaborador.
- Proyecto existente: El id del proyecto debe ser valido.

**Descripción:**
Esta funcionalidad permite a los colaboradores agregar documentos a un proyecto específico. Se verifica que el proyecto exista y que el usuario sea un colaborador del proyecto antes de permitir la adición del documento.

**Entradas:**
- **projectId:** El ID único del proyecto al que se desea agregar el documento.
- **createDocumentDto:** Un objeto de transferencia de datos (DTO) que contiene la siguiente información:
  - **title (obligatorio):** El título del documento.
  - **content (obligatorio):** El contenido del documento.
  - **messagesLog (opcional):** Un registro de mensajes o notas relacionados con el documento.

**Flujo de Trabajo:**
1. Un colaborador que ha iniciado sesión en la plataforma desea agregar un nuevo documento a un proyecto.
2. El colaborador selecciona el proyecto al que desea agregar el documento.
3. El colaborador proporciona los detalles del documento, incluyendo el título y el contenido en el objeto **createDocumentDto**.
4. La plataforma verifica si el proyecto con el ID especificado existe utilizando **currentProject**.
5. Se verifica si el colaborador actual es un colaborador válido del proyecto utilizando **currentCollaborator**.
6. Si el proyecto existe y el colaborador es un colaborador válido, el documento se agrega al proyecto.
7. Se muestra una confirmación de que el documento se ha agregado con éxito.

**Salidas:**
- Confirmación de que el documento se ha agregado con éxito.
- Mensaje de error si el proyecto con el ID especificado no existe en la aplicación.
- Mensaje de error si el usuario actual no es un colaborador válido del proyecto.

**Escenarios Adicionales:**
- Los documentos pueden incluir un registro de mensajes o notas adicionales (messagesLog) que proporcionen contexto o comentarios relacionados con el documento.
- Se realiza una validación para garantizar que el título y el contenido del documento cumplan con los requisitos establecidos.
- Los colaboradores tienen la opción de editar o eliminar documentos existentes en el proyecto según la configuración de permisos.

- ### Buscar y Mostrar Colaboradores de un Proyecto

**Verbo:** GET

**Ruta:**  'project/:id/collaborators'

**Restricción de Acceso:**
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto o Colaborador: El usuario antes descripto debe ser dueño del proyecto o colaborador.
- Proyecto existente: El id del proyecto debe ser valido.

**Descripción:**
Esta funcionalidad permite a los usuarios autenticados dueños o colaboradores del proyecto buscar y mostrar todos los colaboradores asociados a un proyecto específico utilizando su ID único. La función verifica que el usuario esté logueado y recibe el ID del proyecto y 'currentProject' para verificar la existencia del proyecto. Si el proyecto no existe, se muestra un mensaje de error.

**Entradas:**
- **projectId:** El ID único del proyecto del cual se desean buscar los colaboradores.

**Flujo de Trabajo:**
1. Un usuario autenticado inicia sesión en la plataforma.
2. El usuario navega a la sección o página que muestra los colaboradores de un proyecto por ID.
3. El usuario proporciona el ID del proyecto en un campo de búsqueda y envía la solicitud de búsqueda.
4. La plataforma verifica si el usuario está autenticado.
5. La plataforma utiliza **currentProject** para verificar la existencia del proyecto con el ID especificado.
6. Si el proyecto existe, se recopila una lista de todos los colaboradores asociados a ese proyecto.
7. Se muestra la lista de colaboradores con detalles como nombre de usuario, correo electrónico y otros datos relevantes.
8. Si el proyecto no existe, se muestra un mensaje de error indicando que el proyecto no existe en la aplicación.

**Salidas:**
- Lista de colaboradores asociados al proyecto, con detalles como nombre de usuario, correo electrónico y otros datos relevantes.
- Mensaje de error si el proyecto con el ID especificado no existe en la aplicación.

**Escenarios Adicionales:**
- Esta funcionalidad solo está disponible para usuarios autenticados, lo que garantiza la privacidad de la información de los colaboradores.
- Los colaboradores pueden ser presentados en forma de lista o tarjetas, y se pueden proporcionar enlaces para acceder a los perfiles de colaboradores.


### Buscar y Mostrar Documentos de un Proyecto por ID 

**Verbo:** GET

**Ruta:**  'project/:id/documents'

**Restricción de Acceso:**
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto o Colaborador: El usuario antes descripto debe ser dueño del proyecto o colaborador.
- Proyecto existente: El id del proyecto debe ser valido.

**Descripción:**
Esta funcionalidad permite a los usuarios autenticados buscar y mostrar todos los documentos asociados a un proyecto específico utilizando su ID único. La función verifica que el usuario esté logueado y recibe el ID del proyecto y `currentProject` para verificar la existencia del proyecto. Si el proyecto no existe, se muestra un mensaje de error.

**Entradas:**
- **projectId:** El ID único del proyecto del cual se desean buscar los documentos.

**Flujo de Trabajo:**
1. Un usuario autenticado inicia sesión en la plataforma.
2. El usuario navega a la sección o página que muestra los documentos de un proyecto por ID.
3. El usuario proporciona el ID del proyecto en un campo de búsqueda y envía la solicitud de búsqueda.
4. La plataforma verifica si el usuario está autenticado.
5. La plataforma utiliza 'currentProject' para verificar la existencia del proyecto con el ID especificado.
6. Si el proyecto existe, se recopila una lista de todos los documentos asociados a ese proyecto.
7. Se muestra la lista de documentos con detalles como título, contenido y cualquier otro dato relevante.
8. Si el proyecto no tiene documentos, se muestra un mensaje indicando que no contiene documentos. 
9. Si el proyecto no existe, se muestra un mensaje de error indicando que el proyecto no existe en la aplicación.

**Salidas:**
- Lista de documentos asociados al proyecto, con detalles como título, contenido y otros datos relevantes.
- Mensaje de error si el proyecto con el ID especificado no existe en la aplicación.

**Escenarios Adicionales:**
- Esta funcionalidad solo está disponible para usuarios autenticados, lo que garantiza la privacidad de los documentos.
- Los documentos pueden ser presentados en forma de lista o tarjetas, y se pueden proporcionar enlaces para acceder a cada documento.


### Buscar y Mostrar un Proyecto por ID 

**Verbo:** GET

**Ruta:** 'project/:id/view'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a cualquier usuario, incluso aquellos que no están autenticados, buscar y visualizar un proyecto en particular utilizando su ID único en la aplicación. Si el proyecto con el ID especificado no se encuentra, se muestra un mensaje de error indicando que no se encontró la información.

**Entradas:**
- **ID del Proyecto:** El ID único del proyecto que se desea buscar.

**Flujo de Trabajo:**
1. Cualquier usuario, autenticado o no, accede a la página o la sección que permite buscar y visualizar un proyecto por ID.
2. El usuario ingresa el ID del proyecto en un campo de búsqueda y envía la solicitud de búsqueda.
3. La plataforma verifica si existe un proyecto con el ID proporcionado en la base de datos.
4. Si se encuentra el proyecto con ese ID, se muestra la información completa del proyecto, que puede incluir su título, categoría y cualquier otro contenido relevante.
5. Si no se encuentra un proyecto con el ID especificado, se muestra un mensaje de error indicando que no se encontró la información buscada.

**Salidas:**
- Información completa del proyecto encontrado, que puede incluir su título, categoría, detalles y cualquier otro contenido relevante.
- Mensaje de error si el proyecto con el ID especificado no se encuentra en la aplicación.

**Escenarios Adicionales:**
- Esta funcionalidad no requiere que el usuario esté logueado, lo que permite a cualquier visitante del sitio web buscar y visualizar proyectos por su ID.
- Se puede proporcionar un enlace o una opción de búsqueda desde varias partes de la aplicación para facilitar la búsqueda de proyectos por ID.
- Después de encontrar un proyecto, los usuarios pueden tener la opción de interactuar con él, como unirse al proyecto, seguirlo o acceder a más detalles.


### Buscar y Mostrar Proyectos Propios del Usuario

**Verbo:** GET

**Ruta:**  'project/my-projects'

**Restricción de Acceso:**
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.

**Descripción:**
Esta funcionalidad permite a los usuarios autenticados buscar y mostrar todos los proyectos en los que son propietarios. La función verifica que el usuario esté logeado y devuelve la lista de sus proyectos como propietario o un mensaje si no tiene proyectos como propietario.

**Entradas:**
 - No posee.

**Flujo de Trabajo:**
1. Un usuario autenticado inicia sesión en la plataforma.
2. El usuario navega a la sección o página que muestra sus proyectos como propietario.
3. La plataforma verifica si el usuario está autenticado a través de 'currentUser'.
4. La plataforma busca y recopila una lista de todos los proyectos en los que el usuario es propietario.
5. Si el usuario es propietario de al menos un proyecto, se muestra la lista de proyectos con detalles como título, categoría y otros datos relevantes.
6. Si el usuario no es propietario de ningún proyecto, se muestra un mensaje indicando que no tiene proyectos como propietario.

**Salidas:**
- Lista de proyectos en los que el usuario es propietario, con detalles como título, categoría y otros datos relevantes.
- Mensaje indicando que no tiene proyectos como propietario si ese es el caso.

**Escenarios Adicionales:**
- Esta funcionalidad solo está disponible para usuarios autenticados, lo que garantiza la privacidad de la información de los proyectos.
- Los usuarios tienen la opción de editarlos, eliminarlos o agregar colaboradores si lo desean.
- Los proyectos pueden ser presentados en forma de lista o tarjetas, y se pueden proporcionar enlaces para acceder a los proyectos directamente.


### Buscar y Mostrar Proyectos donde el Usuario es Colaborador

**Verbo:** GET

**Ruta:** 'project/my-collaboration-projects'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.

**Descripción:**
Esta funcionalidad permite a los usuarios autenticados buscar y mostrar todos los proyectos en los que son colaboradores. La función verifica que el usuario esté logeado y devuelve la lista de sus proyectos o un mensaje si no tiene proyectos asociados.

**Entradas:**
- No posee.

**Flujo de Trabajo:**
1. Un usuario autenticado inicia sesión en la plataforma.
2. El usuario navega a la sección o página que muestra sus proyectos.
3. La plataforma verifica si el usuario está autenticado a través de **currentUser**.
4. La plataforma busca y recopila una lista de todos los proyectos en los que el usuario es propietario o colaborador.
5. Si el usuario tiene proyectos asociados, se muestra la lista de proyectos con detalles como título, categoría y otros datos relevantes.
6. Si el usuario no tiene proyectos asociados, se muestra un mensaje indicando que no hay resultados disponibles.

**Salidas:**
- Lista de proyectos en los que el usuario es propietario o colaborador, con detalles como título, categoría y otros datos relevantes.
- Mensaje indicando que no hay resultados disponibles si el usuario no tiene proyectos asociados.

**Escenarios Adicionales:**
- Esta funcionalidad solo está disponible para usuarios autenticados, lo que garantiza la privacidad de la información de los proyectos.
- Los proyectos pueden ser presentados en forma de lista o tarjetas, y se pueden proporcionar enlaces para acceder a los proyectos directamente.


### Buscar y Mostrar Proyectos por Nombre de Categoría

**Verbo:** GET

**Ruta:**  'project/by-category/:name'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a cualquier usuario buscar y mostrar todos los proyectos asociados a una categoría específica utilizando el nombre de la categoría. No se requiere estar logueado para acceder a esta función. Si la categoría no existe, se muestra un mensaje de error.

**Entradas:**
- **categoryName**: El nombre de la categoría por la cual se desean buscar los proyectos.

**Flujo de Trabajo:**
1. Un usuario visita la página o sección de búsqueda de proyectos por categoría.
2. El usuario proporciona el nombre de la categoría en un campo de búsqueda y envía la solicitud de búsqueda.
3. La plataforma verifica si la categoría con el nombre especificado existe.
4. Si la categoría existe, se recopila una lista de todos los proyectos asociados a esa categoría.
5. Se muestra la lista de proyectos con detalles como título, descripción y otros datos relevantes.
6. Si la categoría no existe, se muestra un mensaje de error indicando que la categoría no existe en la aplicación.

**Salidas:**
- Lista de proyectos asociados a la categoría especificada, con detalles como título, descripción y otros datos relevantes.
- Mensaje de error si la categoría especificada no existe en la aplicación.

**Escenarios Adicionales:**
- Esta funcionalidad está disponible para cualquier usuario, independientemente de si están autenticados o no.
- Los proyectos pueden ser presentados en forma de lista o tarjetas, y se pueden proporcionar enlaces para acceder a los proyectos directamente desde la lista.


### Buscar y Mostrar Proyectos según el filtro aplicado

**Verbo:** GET

**Ruta:**  'project/search'

**Restricción de Acceso:** 
- No posee.
  
**Descripción:**
Esta funcionalidad permite a los usuarios buscar y mostrar proyectos en la plataforma en función de diferentes criterios, como título y autor. Los resultados pueden ser ordenados en forma ascendente o descendente, y se puede limitar la cantidad de proyectos buscados.

**Entradas:**
- **query:** Objeto que contiene los siguientes parámetros:
  - **title (opcional):** Título del proyecto por el cual se desea buscar.
  - **author (opcional):** Nombre del autor del proyecto por el cual se desea buscar.
  - **sortBy (opcional):** Opción para ordenar la lista de proyectos en forma ascendente ('ASC') o descendente ('DESC'). Por defecto, se puede dejar sin especificar para mostrar proyectos en su orden natural.
  - **skip(opcional):** Número de proyectos para omitir al principio de la lista, lo que permite paginar los resultados.

**Flujo de Trabajo:**
1. El usuario accede a la función de búsqueda de proyectos en la plataforma sin necesidad de iniciar sesión.
2. El usuario ingresa uno o más de los siguientes criterios de búsqueda: título y/o autor.
3. El usuario puede especificar si desea ordenar los resultados en forma ascendente o descendente utilizando 'sortBy'.
4. El usuario puede especificar cuántos proyectos desea omitir al principio de la lista para paginar los resultados utilizando 'skip'.
5. La plataforma realiza una búsqueda de proyectos que coincidan con los criterios proporcionados.
6. La plataforma muestra los proyectos encontrados de acuerdo a los criterios de búsqueda y las opciones de orden y paginación.
7. El usuario puede explorar los proyectos encontrados y acceder a los detalles de cada proyecto si lo desea.

**Salidas:**
- Lista de proyectos que coinciden con los criterios de búsqueda y las opciones de orden y paginación especificadas por el usuario.

**Escenarios Adicionales:**
- Si no se especifican criterios de búsqueda, la funcionalidad puede mostrar una lista de proyectos sin filtrar.
- El usuario puede elegir no aplicar orden y recibir una lista completa de proyectos encontrados.
- Los proyectos se muestran en función de los criterios de búsqueda proporcionados, lo que permite a los usuarios encontrar proyectos específicos de manera eficiente.

### Mostrar Todos los Proyectos

**Verbo:** GET

**Ruta:**  'project/view/all'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a cualquier usuario acceder y ver todos los proyectos disponibles en la plataforma sin necesidad de estar logueado. Proporciona una vista general de todos los proyectos disponibles.

**Entradas:**
No posee.

**Flujo de Trabajo:**
1. Un usuario visita la página o sección que muestra todos los proyectos disponibles en la plataforma.
2. La plataforma recopila una lista de todos los proyectos existentes en la base de datos.
3. Se muestra la lista de proyectos con detalles como título, descripción y otros datos relevantes.
4. El usuario puede explorar y acceder a cualquier proyecto de la lista sin necesidad de iniciar sesión.

**Salidas:**
- Lista de todos los proyectos disponibles en la plataforma, con detalles como título, descripción y otros datos relevantes.

**Escenarios Adicionales:**
- Esta funcionalidad está disponible para cualquier usuario, sin requerir autenticación.
- Los proyectos pueden ser presentados en forma de lista o tarjetas, y se pueden proporcionar enlaces para acceder a los proyectos directamente desde la lista.
- Los usuarios tienen la opción de realizar acciones adicionales en los proyectos, como filtrar proyectos por categoría o realizar búsquedas específicas.


### Editar un Documento en un Proyecto

**Verbo:** PUT

**Ruta:**  'project/:id/edit/:idDoc/'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto o Colaborador: El usuario antes descripto debe ser dueño del proyecto o colaborador.
- Proyecto existente: El id del proyecto debe ser valido.
- Documento existente: El idDoc del documento debe ser valido.

**Descripción:**
Esta funcionalidad permite a los colaboradores modificar documentos en un proyecto específico. Se verifica que el proyecto, el documento, y el usuario sean válidos antes de permitir la edición del documento.

**Entradas:**
- **projectId:** El ID único del proyecto al que pertenece el documento que se desea editar.
- **documentId:** El ID único del documento que se desea editar en el proyecto.
- **updateDocumentDto:** Un objeto de transferencia de datos (DTO) que contiene la siguiente información (todos los campos son opcionales):
  - **title:** El nuevo título del documento.
  - **content:** El nuevo contenido del documento.
  - **messagesLog:** Un registro actualizado de mensajes o notas relacionados con el documento.

**Flujo de Trabajo:**
1. Un colaborador que ha iniciado sesión en la plataforma desea editar un documento en un proyecto.
2. El colaborador selecciona el proyecto al que pertenece el documento que desea editar.
3. El colaborador selecciona el documento específico que desea editar.
4. El colaborador proporciona los detalles de la edición del documento, incluyendo el nuevo título, contenido y mensajes (si es necesario) en el objeto 'updateDocumentDto'.
5. La plataforma verifica si el proyecto con el ID especificado existe.
6. Se verifica si el documento con el ID especificado existe en el proyecto.
7. Se verifica si el colaborador actual es un colaborador válido del proyecto utilizando 'currentCollaborator'.
8. Si el proyecto, el documento y el colaborador son válidos, se realiza la edición del documento con los nuevos detalles proporcionados.
9. Se muestra una confirmación de que el documento se ha editado con éxito.

**Salidas:**
- Confirmación de que el documento se ha editado con éxito.
- Mensaje de error si el proyecto con el ID especificado no existe en la aplicación.
- Mensaje de error si el documento con el ID especificado no existe en el proyecto.
- Mensaje de error si el usuario actual no es un colaborador válido del proyecto.

**Escenarios Adicionales:**
- Los campos 'title', 'content' y 'messagesLog' son opcionales, lo que significa que el usuario puede editar uno o varios de estos campos, según sea necesario.
- Los usuarios pueden tener la opción de cancelar la edición en cualquier momento antes de guardar los cambios si se proporciona esa funcionalidad en la plataforma.


### Eliminar un Proyecto

**Verbo:** DELETE

**Ruta:**  'project/:id/delete/'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto: El usuario antes descripto debe ser dueño del proyecto.
- Proyecto existente: El id del proyecto debe ser valido.

**Descripción:**
Esta funcionalidad permite al dueño del proyecto eliminar un proyecto y todos sus colaboradores, siempre que el proyecto no tenga documentos vigentes. Si el proyecto tiene documentos vigentes, se muestra un mensaje de error.

**Entradas:**
- **projectId**: El ID único del proyecto que se desea eliminar.

**Flujo de Trabajo:**
1. El dueño del proyecto, que ha iniciado sesión en la plataforma, desea eliminar un proyecto.
2. El dueño del proyecto selecciona el proyecto específico que desea eliminar.
3. La plataforma verifica si el proyecto con el ID especificado existe utilizando 'currentProject'.
4. Se verifica si el usuario actual es el dueño del proyecto y está autorizado para eliminarlo utilizando 'currentUser'.
5. Si el proyecto tiene documentos vigentes, se muestra un mensaje de error indicando que no es posible eliminar el proyecto mientras haya documentos pendientes.
6. Si el proyecto no tiene documentos vigentes y el usuario es el dueño autorizado, se procede con la eliminación del proyecto.
7. Se muestra una confirmación de que el proyecto y sus colaboradores han sido eliminados con éxito.

**Salidas:**
- Confirmación de que el proyecto y sus colaboradores han sido eliminados con éxito.
- Mensaje de error si el proyecto con el ID especificado no existe en la aplicación.
- Mensaje de error si el usuario actual no es el dueño del proyecto o si el proyecto tiene documentos vigentes que impiden la eliminación.

**Escenarios Adicionales:**
- Los documentos vigentes en el proyecto actúan como una restricción para la eliminación del proyecto. Los usuarios pueden tener la opción de eliminar documentos vigentes antes de proceder con la eliminación del proyecto si se proporciona esa funcionalidad en la plataforma.


### Eliminar un Documento Específico de un Proyecto

**Verbo:** DELETE

**Ruta:**  'project/:id/delete/:idDoc'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto o Colaborador: El usuario antes descripto debe ser dueño del proyecto o colaborador.
- Proyecto existente: El id del proyecto debe ser valido.
- Documento existente: El idDoc del documento debe ser valido.


**Descripción:**
Esta funcionalidad permite al dueño del proyecto eliminar un documento específico, incluyendo su historial, de un proyecto. Solo el dueño del proyecto está autorizado para realizar esta acción.

**Entradas:**
- **projectId:** El ID único del proyecto al que pertenece el documento que se desea eliminar.
- **documentId:** El ID único del documento que se desea eliminar.

**Flujo de Trabajo:**
1. El dueño del proyecto, que ha iniciado sesión en la plataforma, desea eliminar un documento específico del proyecto.
2. El dueño del proyecto selecciona el proyecto al que pertenece el documento que desea eliminar.
3. El dueño del proyecto selecciona el documento específico que desea eliminar.
4. La plataforma verifica si el proyecto con el ID especificado existe.
5. La plataforma verifica si el documento con el ID especificado existe en el proyecto utilizando 'currentDocument'.
6. Se verifica si el usuario actual es el dueño del proyecto y está autorizado para realizar esta acción.
7. Si el proyecto, el documento y el usuario son válidos, se procede con la eliminación del documento y su historial del proyecto.
8. Se muestra una confirmación de que el documento ha sido eliminado con éxito.

**Salidas:**
- Confirmación de que el documento ha sido eliminado con éxito.
- Mensaje de error si el proyecto con el ID especificado no existe en la aplicación.
- Mensaje de error si el documento con el ID especificado no existe en el proyecto.
- Mensaje de error si el usuario actual no es el dueño del proyecto.

**Escenarios Adicionales:**
- Esta funcionalidad elimina el documento específico del proyecto, lo que implica que se borrará todo su historial y contenido relacionado con el documento.


### Eliminar Todos los Documentos de un Proyecto

**Verbo:** DELETE

**Ruta:**  'project/:id/delete/documents'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto: El usuario antes descripto debe ser dueño del proyecto.
- Proyecto existente: El id del proyecto debe ser valido.

**Descripción:**
Esta funcionalidad permite al dueño del proyecto eliminar todos los documentos, incluyendo su historial, de un proyecto específico. Solo el dueño del proyecto está autorizado para realizar esta acción.

**Entradas:**
- **projectId:** El ID único del proyecto al que se desea eliminar todos los documentos.

**Flujo de Trabajo:**
1. El dueño del proyecto, que ha iniciado sesión en la plataforma, desea eliminar todos los documentos de un proyecto.
2. El dueño del proyecto selecciona el proyecto específico del cual desea eliminar todos los documentos.
3. La plataforma verifica si el proyecto con el ID especificado existe utilizando 'currentProject'.
4. Se verifica si el usuario actual es el dueño del proyecto y está autorizado para realizar esta acción utilizando 'currentUser'.
5. Si el proyecto y el usuario son válidos, se procede con la eliminación de todos los documentos y su historial del proyecto.
6. Se muestra una confirmación de que todos los documentos han sido eliminados con éxito.

**Salidas:**
- Confirmación de que todos los documentos han sido eliminados con éxito.
- Mensaje de error si el proyecto con el ID especificado no existe en la aplicación.
- Mensaje de error si el usuario actual no es el dueño del proyecto.

**Escenarios Adicionales:**
- Esta funcionalidad elimina todos los documentos del proyecto, lo que implica que se borrará todo el historial y contenido relacionado con los documentos.


###  Eliminar un Colaborador de un Proyecto

**Verbo:** DELETE

**Ruta:**  'project/:id/delete/collaborator'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- Dueño del Proyecto: El usuario antes descripto debe ser dueño del proyecto.
- Proyecto existente: El id del proyecto debe ser valido.

**Descripción:**
Esta funcionalidad permite al dueño del proyecto eliminar un colaborador específico del proyecto. Se verifica que el proyecto exista, que el email proporcionado sea correcto y que el usuario actual esté autorizado para realizar esta acción (solo el dueño del proyecto).

**Entradas:**
- **projectId:** El ID único del proyecto al que se desea eliminar un colaborador.
- **emailUserDto:** Objeto que contiene el email del colaborador que se desea eliminar.

**Flujo de Trabajo:**
1. El dueño del proyecto, que ha iniciado sesión en la plataforma, desea eliminar un colaborador del proyecto.
2. El dueño del proyecto selecciona el proyecto específico del cual desea eliminar un colaborador.
3. La plataforma verifica si el proyecto con el ID especificado existe utilizando 'currentProject'.
4. Se verifica si el usuario actual es el dueño del proyecto y está autorizado para realizar esta acción utilizando'currentUser'.
5. Se verifica si el email proporcionado en 'emailUserDto' corresponde a un usuario registrado en el sistema.
6. Si el email no corresponde a ningún usuario registrado, se muestra un mensaje indicando que el email no se encuentra en el sistema.
7. Si el email corresponde a un usuario registrado pero no es un colaborador del proyecto, se muestra un mensaje indicando que el colaborador no existe en el proyecto.
8. Si el email corresponde a un colaborador válido del proyecto y el usuario actual es el dueño autorizado, se procede con la eliminación del colaborador del proyecto.
9. Se muestra una confirmación de que el colaborador ha sido eliminado con éxito.

**Salidas:**
- Confirmación de que el colaborador ha sido eliminado con éxito.
- Mensaje de error si el proyecto con el ID especificado no existe en la aplicación.
- Mensaje de error si el usuario actual no es el dueño del proyecto.
- Mensaje de error si el email proporcionado no corresponde a un usuario registrado en el sistema.
- Mensaje de error si el email corresponde a un usuario registrado pero no es un colaborador del proyecto.

**Escenarios Adicionales:**
- Los colaboradores eliminados del proyecto pierden el acceso a los documentos y a las funciones relacionadas con el proyecto.
