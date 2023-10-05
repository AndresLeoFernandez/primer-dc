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

## Métodos Públicos de Entidad

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

**Ruta general:** document

**Aclaración:** 
1. Los datados de salida se muestran en formato raw.
2. Para mayor detalle se puede ver información de los endpoints mediante la implementación generada mediante swagger accediendo en la dirección url ruta_del_proyecto/docs.


### Mostrar la Última Versión del Documento Actualizado

**Verbo:** GET

**Ruta:**  'document/:idDoc/view'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a los usuarios mostrar la última versión del documento actualizado en la plataforma. No se requiere autenticación para utilizar esta función.

**Entradas:**
- **documentId:** El ID único del documento del cual se desea mostrar la última versión.
- **currentDocument:** El documento actual que se actualizará.

**Flujo de Trabajo:**
1. Cualquier usuario, ya sea que esté logueado o no, desea ver la última versión actualizada de un documento específico.
2. El usuario proporciona el ID del documento del cual desea ver la última versión.
3. La plataforma verifica si el documento con el ID especificado existe en la plataforma.
4. Si se encuentra el documento con el ID proporcionado, la plataforma muestra la última versión actualizada del documento.
5. Si no se encuentra ningún documento con el ID especificado, se muestra un mensaje indicando que no se ha encontrado el documento.

**Salidas:**
- Última versión actualizada del documento que coincide con el ID proporcionado.
- Mensaje de error si no se encuentra ningún documento con el ID especificado.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios acceder fácilmente a la última versión actualizada de un documento específico sin necesidad de autenticación.


### Buscar y Mostrar el Historial de un Documento

**Verbo:** GET

**Ruta:**  'document/:idDoc/histories'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
- documento existente: El id del documento debe ser valido.

**Descripción:**
Esta funcionalidad permite a los usuarios buscar y mostrar el historial de un documento en particular. Los usuarios deben estar autenticados para utilizar esta función.

**Entradas:**
- **documentId:** El ID único del documento del cual se desea buscar el historial.
- **currentDocument:** El documento actual.

**Flujo de Trabajo:**
1. Un usuario autenticado desea buscar y mostrar el historial de un documento específico.
2. El usuario proporciona el ID del documento del cual desea ver el historial.
3. La plataforma verifica si el documento con el ID especificado existe en la plataforma.
4. Si se encuentra el documento con el ID proporcionado, la plataforma muestra el historial de versiones y cambios asociados al documento.
5. Si no se encuentra ningún documento con el ID especificado, se muestra un mensaje indicando que no se ha encontrado el documento.

**Salidas:**
- Historial de versiones y cambios asociados al documento que coincide con el ID proporcionado.
- Mensaje de error si no se encuentra ningún documento con el ID especificado.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios revisar el historial de cambios en un documento específico, lo que puede ser útil para rastrear y entender las modificaciones realizadas a lo largo del tiempo.
- La autenticación es necesaria para acceder a esta función, lo que garantiza la privacidad y seguridad de los historiales de documentos.


### Obtener el Total de Visitas de un Documento

**Verbo:** GET

**Ruta:** 'document/total-visits'

**Restricción de Acceso:** 
- documento existente: El id del documento debe ser valido.

**Descripción:**
Esta funcionalidad permite a los usuarios buscar y mostrar el total de visitas que tiene un documento en particular en la plataforma. No se requiere autenticación para utilizar esta función.

**Entradas:**
- **ocumentId:** El ID único del documento del cual se desea obtener el total de visitas.
- **currentDocument:** El documento actual.

**Flujo de Trabajo:**
1. Cualquier usuario, ya sea que esté logueado o no, desea obtener el total de visitas de un documento específico.
2. El usuario proporciona el ID del documento del cual desea obtener el total de visitas.
3. La plataforma verifica si el documento con el ID especificado existe en la plataforma.
4. Si se encuentra el documento con el ID proporcionado, la plataforma muestra el total de visitas que ha recibido dicho documento.
5. Si no se encuentra ningún documento con el ID especificado, se muestra un mensaje indicando que no se ha encontrado el documento.

**Salidas:**
- Total de visitas del documento que coincide con el ID proporcionado.
- Mensaje de error si no se encuentra ningún documento con el ID especificado.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios conocer la popularidad de un documento específico al mostrar el total de visitas que ha recibido.
- No es necesario estar logueado para utilizar esta función, lo que permite a cualquier usuario acceder a esta información.


###  Documentos Más Visitados

**Verbo:** GET

**Ruta:**  'document/most-viewed'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a los usuarios ver una lista de documentos ordenados por la cantidad de visitas que han recibido en la plataforma. No se requieren parámetros ni autenticación para utilizar esta función.

**Entradas:**
Ninguna.

**Flujo de Trabajo:**
1. Cualquier usuario, ya sea que esté logueado o no, desea ver una lista de documentos ordenados por la cantidad de visitas que han recibido.
2. El usuario accede a la función "documetos mas vistos" para obtener la lista.
3. La plataforma recopila y muestra una lista de documentos, ordenados en orden descendente según la cantidad de visitas que han recibido.

**Salidas:**
- Lista de documentos ordenados por la cantidad de visitas que han recibido, comenzando con los más visitados.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios descubrir documentos populares y ampliamente visitados en la plataforma.
- No se requiere autenticación ni la introducción de parámetros para utilizar esta función, lo que facilita el acceso a la lista de documentos más visitados.
- No es necesario estar logueado para utilizar esta función, lo que permite a cualquier usuario acceder a esta información.


### Mostrar Documentos Más Recientes

 **Verbo:** GET

**Ruta:**  'document/most-recent'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a los usuarios ver una lista de documentos ordenados por la fecha de creación, desde los más nuevos hasta los más antiguos. No se requieren parámetros ni autenticación para utilizar esta función.

**Entradas:**
Ninguna.

**Flujo de Trabajo:**
1. Cualquier usuario, ya sea que esté logueado o no, desea ver una lista de documentos ordenados por la fecha de creación.
2. El usuario accede a la función "documentos mas recientes" para obtener la lista.
3. La plataforma recopila y muestra una lista de documentos, ordenados en orden descendente según la fecha de creación, comenzando con los más recientes.

**Salidas:**
- Lista de documentos ordenados por la fecha de creación, desde los más nuevos hasta los más antiguos.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios descubrir los documentos más recientes que se han agregado a la plataforma.
- No se requiere autenticación para utilizar esta función, lo que facilita el acceso a la lista de documentos más recientes.


###  Mostrar Todos los Documentos

**Verbo:** GET

**Ruta:**  'document/view/all'

**Restricción de Acceso:** 
- No posee.
  
**Descripción:**
Esta funcionalidad permite a los usuarios ver una lista completa de todos los documentos disponibles en la plataforma, sin necesidad de proporcionar parámetros ni autenticarse.

**Entradas:**
Ninguna.

**Flujo de Trabajo:**
1. Cualquier usuario, ya sea que esté logueado o no, desea ver una lista completa de todos los documentos disponibles en la plataforma.
2. El usuario accede a la función "ver documentos" para obtener la lista.
3. La plataforma recopila y muestra una lista de todos los documentos disponibles.

**Salidas:**
- Lista completa de todos los documentos disponibles en la plataforma.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios explorar todos los documentos disponibles sin restricciones.
- No se requiere autenticación ni la introducción de parámetros para utilizar esta función, lo que facilita el acceso a la lista completa de documentos.
