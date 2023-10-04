# Category

## Generales

## Atributos de Entidad

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
<tr><td>histories</td><td>
<ul><li>Relación que vincula el colaborador con las histories donde participa.</li>
<li>Obligatoriedad: Opcional.</li></ul></td></tr>
</tbody>
</table>
</br></br>

## Métodos Publicos de Entidad

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getCollaboratorId():number</td><td>Retorna el número de identificación del collaborador.</td></tr>
<tr><td>getRole():any </td><td>Retorna el rol del colaborador.</td></tr>
<tr><td>getUser(): User </td><td>Retorna el usuario colaborador.</td></tr>
<tr><td>getProject(): Project </td><td>Retorna el projecto.</td></tr>
</tbody>
</table>
</br>
</br>

# Endpoints del modulo Collaborator
**Ruta:** collaborator

**Aclaración:** 
1. Los datados de salida se muestran en formato raw.
2. Para mayor detalle se puede ver información de los endpoints mediante la implementación generada mediante swagger accediendo en la dirección url ruta_del_proyecto/docs.

## Mostrar Lista de Todos los Colaboradores en la aplicación
**verbo:** GET

**Ruta:** collaborator/view/all

**Acceso** 

- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
  
**Descripción:**

Esta funcionalidad permite a los usuarios autenticados ver una lista de todos los colaboradores que están registrados en la aplicación en formato raw. Proporciona una forma de conocer a otros usuarios que participan en proyectos colaborativos y fomenta la interacción entre ellos.

**Flujo de Trabajo:**

1. Un usuario autenticado inicia sesión en la plataforma.
2. El usuario navega a la sección o página que muestra la lista de colaboradores.
3. La plataforma recopila y presenta una lista de todos los colaboradores registrados, mostrando sus nombres de usuario y otra información relevante.
   
**Salidas:**

- Lista de todos los colaboradores registrados en la plataforma, que puede incluir información como nombres de usuario y los datos requeridos en el registro.
  
**Escenarios Adicionales:**
- Esta funcionalidad solo está disponible para usuarios autenticados, lo que garantiza la privacidad de la información de los colaboradores.
- El usuario puede explorar la lista de colaboradores y, opcionalmente, hacer clic en un colaborador específico para obtener más detalles o interactuar con él.
- Los usuarios pueden tener la opción de buscar o filtrar la lista de colaboradores según diversos criterios, como intereses, ubicación, proyectos en los que participan, etc.
- Se pueden proporcionar enlaces o botones que permitan a los usuarios conectarse o interactuar con los colaboradores, como enviar mensajes o invitaciones a proyectos colaborativos.

## Buscar y Mostrar un Colaborador por ID 
**verbo:** GET
**Ruta:** collaborator/:id/view
**Acceso** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
**Descripción:**
Esta funcionalidad permite a los usuarios autenticados buscar y visualizar un colaborador en particular mediante la búsqueda de su ID único en la aplicación. Si el colaborador con el ID especificado no se encuentra, se muestra un mensaje de error indicando que no se encontró la información.

**Entradas:**
- **ID del Colaborador:** El ID único del colaborador que se desea buscar.
  
**Flujo de Trabajo:**
1. Un usuario autenticado inicia sesión en la plataforma.
2. El usuario navega a la sección o página que permite buscar un colaborador por ID.
3. El usuario ingresa el ID del colaborador en un campo de búsqueda y envía la solicitud de búsqueda.
4. La plataforma verifica si existe un colaborador con el ID proporcionado en la base de datos.
5. Si se encuentra un colaborador con ese ID, se muestra la información del colaborador, que puede incluir detalles como su nombre de usuario y otra información relevante.
6. Si no se encuentra un colaborador con el ID especificado, se muestra un mensaje de error indicando que no se encontró la información buscada.
7. 
**Salidas:**
- Información del colaborador encontrado, que puede incluir su nombre de usuario y otra información relevante.
- Mensaje de error si el colaborador con el ID especificado no se encuentra en la aplicación.
- 
**Escenarios Adicionales:**
- Esta funcionalidad solo está disponible para usuarios autenticados, lo que garantiza la privacidad de la información de los colaboradores.
- Se puede proporcionar un enlace o botón de búsqueda en varias partes de la aplicación para facilitar la búsqueda de colaboradores por parte de los usuarios.
- Si se encuentra un colaborador, los usuarios pueden tener la opción de interactuar con él, como enviar mensajes o invitarlo a proyectos colaborativos.
