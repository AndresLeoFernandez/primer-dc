# User 

## Generales

## Atributos de Entidad

<table border="1" width=100%>
<thead><tr><th>Nombre</th><th>Detalle</th></tr></thead>
<tbody>
<tr><td>userId</td><td>
<ul>
<li>Representa el número de identificación del usuario.</li>
<li>Se genera automáticamente de forma incremental al darse de alta los usuarios.</li>
<li>Es único para cada usuario en la aplicación. </li>
</ul></td></tr>
<tr><td>email</td><td><ul>
<li>Representa el correo electrónico del usuario.</li>
<li>Como tal debe ser un formato válido de correo electrónico.</li>
<li>Debe ser único su uso en la aplicación, no pudiendo ser utilizado por otro usuario.</li>
<li>Obligatoriedad: Requerida.</li></ul> </td></tr>
<tr><td>password</td><td>
<ul><li>Representa la contraseña del usuario.</li> 
<li>Restricción: Debe contar con mas de 5 caracteres. No puede contener el caracter " ". </li>
<li>Obligatoriedad: Requerida.</li></ul> </td></tr>
<tr><td>firstName</td><td>
<ul><li>Representa el nombre de pila del usuario.</li>
<li>Restricción: No puede contener el caracter " ".De estar no puede ser vacio. </li>
<li>Obligatoriedad: Opcional.</li></ul></td></tr>
<tr><td>lastName</td><td>
<ul><li>Representa el apellido del usuario.</li>
<li>Restricción: No puede contener el caracter " ".De estar no puede ser vacio. </li>
<li>Obligatoriedad: Opcional.</li></ul>
</td></tr>
<tr><td>username</td><td>
<ul><li>Representa el nombre de usuario en la aplicación.</li>
<li>Restricción: Debe contar con mas de 5 caracteres.No puede contener el caracter " ".</li>
<li>Obligatoriedad: Requerida.</li></ul>
</td></tr>
<tr><td>dateRegistration</td><td>
<ul><li>Representa la fecha de alta del usuario en la aplicación.</li>
<li>Se asigna automaticamente cuando se crea el usuario.</li>
</ul>
</td></tr>
<tr><td>isActive</td><td>
<ul><li>Representa si el usuario esta activo en la aplicación.</li>
<li>Se asigna automáticamente cuando se crea el usuario.</li>
</ul></td></tr>    
<tr><td>projects</td><td>
<ul><li>Relación que vincula al usuario con los proyectos de su autoría.</li>
<li>Obligatoriedad: Opcional.</li></ul>
</td></tr>    
<tr><td>collaborators</td><td>
<ul><li>Relación que vincula al usuario como colaborador de los distintos proyectos donde es participe.</li>
<li>Obligatoriedad: Opcional.</li></ul> 
</td></tr>    
</tbody>
</table>
</br>

   
## Métodos Públicos de Entidad

<table border="1" width=100%>
<thead><tr><th>Función</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td>getUserId():number</td><td>Retorna el número de identificación del usuario.</td></tr>
<tr><td>getFirstName():string </td><td>Retorna el firstname del usuario.</td></tr>
<tr><td>getLastName():string </td><td>Retorna el lastname del usuario.</td></tr>
<tr><td>getEmail(): string </td><td>Retorna el email del usuario.</td></tr>
<tr><td>getUsername(): String</td><td>Retorna el username del usuario.</td></tr>
<tr><td>getPassword(): string </td><td>Retorna el password encriptado del usuario.</td></tr>
<tr><td>getDateRegistration(): any</td><td>Retorna la fecha de alta del usuario en la aplicación.</td></tr>
<tr><td>IsActive(): Boolean </td><td>Retorna verdadero si el usuario se encuentra activo,</br> falso en caso contrario.</td></tr>
<tr><td>setFirstName( newFirstName: string ): string</td><td>Asigna newFirstName al firstName del usuario.</td></tr>
<tr><td>setLastName( newLastName: string ): string </td><td>Asigna newLastName al lastName del usuario.</td></tr>
<tr><td>setPassword(newPassword: string): string </td><td>Asigna newPassword al usuario.</td></tr>
<tr><td>deactivate()</td><td>Asigna estado falso a isActive.</td></tr>
</tbody>
</table>
</br>
</br>


## Endpoints del módulo User

**Ruta:** user

**Aclaración:** 
1. Los datados de salida se muestran en formato raw.
2. Para mayor detalle se puede ver información de los endpoints mediante la implementación generada mediante swagger accediendo en la dirección url ruta_del_proyecto/docs.

### Mostrar Todos los Usuarios

**Verbo:** GET

**Ruta:**  'user/view'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.

**Descripción:**
Esta funcionalidad permite a los usuarios autenticados ver una lista completa de todos los usuarios registrados en la plataforma. No se requiere proporcionar parámetros adicionales.

**Entradas:**
Ninguna.

**Flujo de Trabajo:**
1. Un usuario autenticado desea ver una lista completa de todos los usuarios registrados en la plataforma.
2. El usuario accede a la función "Ver usuarios" de usuarios para obtener la lista.
3. La plataforma recopila y muestra una lista de todos los usuarios registrados.

**Salidas:**
- Lista completa de todos los usuarios registrados en la plataforma.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios conocer a otros usuarios registrados en la plataforma.
- Es necesario estar autenticado para utilizar esta función, lo que garantiza la privacidad de la lista de usuarios y el acceso solo para usuarios autorizados.


### Obtener un Usuario por ID

**Verbo:** GET

**Ruta:** 'user/:id/view'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.

**Descripción:**
Esta funcionalidad permite a los usuarios autenticados obtener la información de un usuario específico según su ID. Se requiere proporcionar el ID del usuario como parámetro para utilizar esta función.

**Entradas:**
- **userId:** El ID único del usuario del cual se desea obtener la información.

**Flujo de Trabajo:**
1. Un usuario autenticado desea obtener la información de otro usuario específico en la plataforma.
2. El usuario proporciona el ID del usuario del cual desea obtener información.
3. La plataforma verifica si el usuario con el ID especificado existe en la plataforma.
4. Si se encuentra el usuario con el ID proporcionado, la plataforma muestra la información detallada de ese usuario.
5. Si no se encuentra ningún usuario con el ID especificado, se muestra un mensaje indicando que no se ha encontrado el usuario.

**Salidas:**
- Información detallada del usuario que coincide con el ID proporcionado.
- Mensaje de error si no se encuentra ningún usuario con el ID especificado.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios obtener información detallada de otros usuarios en la plataforma.
- Es necesario estar autenticado y proporcionar el ID del usuario para utilizar esta función, lo que garantiza la privacidad y seguridad de la información de usuario.


### Cambiar Contraseña de Usuario

**Verbo:** PATCH

**Ruta:** 'user/change-password'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.
  
**Descripción:**
Esta funcionalidad permite a un usuario autenticado cambiar su contraseña actual por una nueva. Para ello, se debe proporcionar una nueva contraseña que se verifica a través del objeto **changePasswordDto**.

**Entradas:**
- **newPasswordDto:** Nueva contraseña del usuario.
- **currentUser:** El usuario actual que desea cambiar su contraseña.

**Flujo de Trabajo:**
1. Un usuario autenticado desea cambiar su contraseña actual por una nueva.
2. El usuario proporciona la nueva contraseña a través del objeto 'changePasswordDto'.
3. La plataforma verifica la autenticación del usuario actual (currentUser) para garantizar que tiene permiso para cambiar su contraseña.
4. Si la autenticación es exitosa y se proporciona una nueva contraseña válida, la plataforma actualiza la contraseña del usuario con la nueva contraseña.
5. La plataforma confirma al usuario que la contraseña ha sido cambiada exitosamente.

**Salidas:**
- Confirmación de que la contraseña ha sido cambiada con éxito.

**Escenarios Adicionales:**
- Esta funcionalidad proporciona a los usuarios la capacidad de mantener su contraseña segura y actualizarla según sea necesario.
- La autenticación del usuario actual (currentUser) es esencial para garantizar que solo el usuario legítimo pueda cambiar su contraseña.

### Eliminar la cuenta de Usuario

*Verbo:** DELETE

**Ruta:** 'user/delete'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.

**Descripción:**
Esta funcionalidad permite a un usuario autenticado eliminar su propia cuenta de usuario en la plataforma.

**Entradas:**
- **currentUser:** El usuario actual que desea eliminar su cuenta.

**Flujo de Trabajo:**
1. Un usuario autenticado decide eliminar su cuenta de usuario en la plataforma.
2. El usuario proporciona su información de autenticación a través de 'currentUser' para confirmar su identidad.
3. La plataforma verifica la autenticación del usuario y confirma que tiene permiso para eliminar su cuenta.
4. Si la autenticación es exitosa y se confirma que el usuario tiene permiso, la plataforma procede a eliminar la cuenta del usuario.
5. La plataforma muestra un mensaje de confirmación al usuario informándole que su cuenta ha sido eliminada con éxito.

**Salidas:**
- Mensaje de confirmación de que la cuenta del usuario ha sido eliminada con éxito.

**Escenarios Adicionales:**
- Esta funcionalidad proporciona a los usuarios la capacidad de eliminar su cuenta si lo desean.
- La autenticación del usuario actual (currentUser) es fundamental para garantizar que solo el usuario legítimo pueda eliminar su cuenta.  
