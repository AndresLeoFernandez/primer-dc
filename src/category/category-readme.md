# Endpoints del modulo Category
**RUTA GENERAL:** category

**Aclaración:** 
1. Los datos de salida se muestran en formato raw.
2. Para mayor detalle se puede ver información de los endpoints mediante la implementación generada mediante swagger accediendo en la dirección url ruta_del_proyecto/docs.

### Crear una Nueva Categoría 
**verbo:** POST

**Ruta:** category/add

**Acceso** 

- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
  
**Descripción:**
  
Esta funcionalidad permite a los usuarios crear una nueva categoría para organizar y clasificar proyectos en la plataforma. Al crear una categoría, los usuarios pueden asignar proyectos a esa categoría, facilitando la búsqueda y navegación para otros usuarios.

**Entradas:**
- **createCategoryDto:** Un objeto de transferencia de datos (DTO) que contiene la siguiente información:
  - **Nombre de la Categoría(name):** El nombre de la categoría que el usuario desea crear.
    
**Flujo de Trabajo:**
1. Un usuario autenticado inicia sesión en la plataforma.
2. El usuario navega a la sección de administración de categorías o a una página dedicada para crear categorías.
3. El usuario completa un formulario y proporciona el nombre de la nueva categoría.
4. El usuario envía la solicitud para crear la categoría.
5. La plataforma verifica si la categoría ya existe o si el nombre de la categoría es único.
6. Si el nombre de la categoría es válido y único, se crea la nueva categoría en la base de datos.
7. La plataforma confirma la creación exitosa de la categoría y proporciona retroalimentación al usuario.
   
**Salidas:**
- Confirmación de que la categoría se ha creado con éxito.
- Mensaje de error si la categoría ya existe o si hay un problema en el proceso de creación.
- 
**Escenarios Adicionales:**
- Si un usuario no autenticado intenta crear una categoría, la plataforma debe redirigirlo a la página de inicio de sesión o solicitarle que inicie sesión antes de continuar.
- Se debe implementar una validación para garantizar que el nombre de la categoría sea único y cumpla con los requisitos de formato.
Esta funcionalidad permitirá a los usuarios organizar de manera efectiva los proyectos en la plataforma y mejorar la experiencia general de navegación y búsqueda.


### Mostrar Todas las Categorías

**verbo:** GET

**Ruta:** category/view/all

**Acceso** 

- Publico
  
**Descripción:**

Esta funcionalidad permite a los usuarios ver una lista completa de todas las categorías disponibles en la plataforma en formato raw. Proporciona una visión general de las categorías existentes, lo que facilita la búsqueda y la navegación de proyectos para los usuarios.

**Entradas:**
- No posee.
  
**Flujo de Trabajo:**

1.  Un usuario, autenticado o no, accede a la página o la sección que muestra todas las categorías.
2. La plataforma recopila la lista de todas las categorías disponibles en la base de datos.
3. La lista de categorías se presenta en la interfaz de usuario de manera organizada, posiblemente en una lista o una tabla.
   
**Salidas:**

- Una lista completa de todas las categorías disponibles en la plataforma.

**Escenarios Adicionales:**
  
- Los usuarios pueden realizar búsquedas específicas dentro de la lista de categorías si se implementa una barra de búsqueda.
- Cada categoría en la lista puede estar vinculada a una página que muestra los proyectos relacionados con esa categoría.
- Los usuarios pueden examinar la lista de categorías y hacer clic en una categoría específica para ver proyectos relacionados si así lo desean.
- Se pueden aplicar filtros o funciones de ordenamiento para organizar la lista de categorías según las preferencias del usuario.
La funcionalidad "findAll" es esencial para proporcionar a los usuarios una visión general de las categorías disponibles en la plataforma, lo que facilita la navegación y el descubrimiento de proyectos relacionados con sus intereses.

### Funcionalidad: Mostrar Categoría por ID 
**verbo:** GET
**Ruta:** category/:id/view
**Acceso** 
- Publico
**Descripción:**
Esta funcionalidad permite a los usuarios buscar y ver una categoría específica en la plataforma utilizando su ID numérico único. No es necesario estar autenticado para utilizar esta función. Si no se encuentra la categoría con el ID proporcionado, se muestra un mensaje de error informando que la categoría no se ha encontrado.
**Entradas:**
- **ID de la Categoría(Id):** El ID numérico único de la categoría que el usuario desea buscar y ver.
**Flujo de Trabajo:**
1. Un usuario, autenticado o no, visita un formulario de búsqueda en la plataforma.
2. El usuario ingresa el ID numérico único de la categoría que desea buscar en el campo de búsqueda.
3. El usuario envía la solicitud de búsqueda.
4. La plataforma realiza una consulta a la base de datos para buscar la categoría por su ID.
5. Si se encuentra una coincidencia, la plataforma muestra la categoría encontrada en la interfaz de usuario.
6. Si no se encuentra ninguna coincidencia, la plataforma muestra un mensaje de error que indica que la categoría no se ha encontrado.
**Salidas:**
- La categoría encontrada por su ID, incluyendo sus detalles.
- Un mensaje de "Categoría no encontrada" si no se encuentra ninguna categoría con el ID proporcionado.
**Escenarios Adicionales:**
- Cada categoría encontrada puede estar vinculada a una página que muestra proyectos relacionados con esa categoría si corresponde.
Esta funcionalidad "findOne" proporciona a los usuarios la capacidad de buscar y acceder a categorías específicas en la plataforma utilizando su ID único.


### Funcionalidad: Mostrar una Categoría por Nombre
**verbo:** GET
**Ruta:** category/:name
**Acceso** 
- Publico
**Descripción:**
Esta funcionalidad permite a los usuarios, incluso aquellos que no están autenticados, buscar y ver una categoría específica en la plataforma utilizando su nombre. Si no se encuentra la categoría con el nombre proporcionado, se muestra un mensaje de error informando que la categoría no se ha encontrado.
**Entradas:**
- **Nombre de la Categoría(name):** El nombre de la categoría que el usuario desea buscar.
**Flujo de Trabajo:**
1. Un usuario, autenticado o no, visita un formulario de búsqueda en la plataforma.
2. El usuario ingresa el nombre de la categoría que desea buscar en el campo de búsqueda.
3. El usuario envía la solicitud de búsqueda.
4. La plataforma realiza una consulta a la base de datos para buscar la categoría por nombre.
5. Si se encuentra una coincidencia, la plataforma muestra la categoría encontrada en la interfaz de usuario.
6. Si no se encuentra ninguna coincidencia, se muestra un mensaje indicando que no se encontró la categoría con el nombre proporcionado.
**Salidas:**
- La categoría encontrada por nombre, incluyendo sus detalles.
- Un mensaje de "Categoría no encontada" si no se encuentra ninguna categoría con el nombre proporcionado.
**Escenarios Adicionales:**
- Se pueden implementar opciones de búsqueda avanzada, como búsqueda por palabras clave o filtros adicionales para refinar los resultados.
- Se pueden implementar opciones avanzadas de búsqueda, como la coincidencia parcial del nombre de la categoría.
- Cada categoría encontrada puede estar vinculada a una página que muestra proyectos relacionados con esa categoría.
Esta funcionalidad "findByName" es útil para permitir a los usuarios encontrar rápidamente una categoría específica en la plataforma.
