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

## Métodos Publicos de Entidad

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

