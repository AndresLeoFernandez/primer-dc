## Endpoints del módulo auth

**Ruta general:** auth

**Aclaración:** 
1. Los datos de salida se muestran en formato raw.
2. Para mayor detalle se puede ver información de los endpoints mediante la implementación generada mediante swagger accediendo en la dirección url ruta_del_proyecto/docs.


### Inicio de Sesión de Usuario

**Verbo:** POST

**Ruta:** 'auth/loguin'

**Restricción de Acceso:** 
- No posee.

**Descripción:**
Esta funcionalidad permite a un usuario iniciar sesión en la plataforma proporcionando su correo electrónico y contraseña a través de un objeto 'loginDto'.

**Entradas:**
- **loginDto**: Un objeto que contiene el correo electrónico (email) y la contraseña del usuario para el inicio de sesión.

**Flujo de Trabajo:**
1. Un usuario desea iniciar sesión en la plataforma.
2. El usuario proporciona su correo electrónico y contraseña a través del objeto `loginDto`.
3. La plataforma verifica si las credenciales proporcionadas coinciden con una cuenta de usuario registrada en la base de datos.
4. Si las credenciales son válidas y coinciden, la plataforma autentica al usuario y permite el acceso a su cuenta.
5. Si las credenciales no son válidas o no coinciden con ninguna cuenta, la plataforma muestra un mensaje de error indicando que el inicio de sesión ha fallado.

**Salidas:**
- Confirmación de inicio de sesión exitoso si las credenciales son válidas.
- Mensaje de error si las credenciales son inválidas o el inicio de sesión falla.

**Escenarios Adicionales:**
- Esta funcionalidad proporciona a los usuarios registrados la capacidad de acceder a sus cuentas en la plataforma.
- La autenticación se basa en la coincidencia de las credenciales proporcionadas con las registradas en la base de datos.


### Registro de Usuario

**Verbo:** POST

**Ruta:**  'auth/singup'

**Restricción de Acceso:**
- No posee.

**Descripción:**
Esta funcionalidad permite a un usuario registrarse en la plataforma proporcionando la información necesaria a través de un objeto **createUserDto**. Los campos obligatorios incluyen correo electrónico (email), contraseña (password) y nombre de usuario (username), mientras que los campos opcionales son nombre (firstName) y apellido (lastName).

**Entradas:**
- **createUserDto**: Un objeto que contiene la información requerida para el registro de usuario, incluyendo correo electrónico, contraseña y nombre de usuario. También puede incluir nombre y apellido como información opcional.

**Flujo de Trabajo:**
1. Un usuario nuevo desea registrarse en la plataforma.
2. El usuario proporciona la información requerida a través del objeto `createUserDto`, incluyendo correo electrónico, contraseña y nombre de usuario.
3. La plataforma verifica si el correo electrónico proporcionado no está asociado con ninguna cuenta existente en la base de datos.
4. Si el correo electrónico es único y la información proporcionada es válida, la plataforma crea una nueva cuenta de usuario con la información proporcionada.
5. La plataforma confirma al usuario que el registro se ha completado con éxito y le proporciona acceso a su nueva cuenta.

**Salidas:**
- Confirmación de registro exitoso.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios registrarse en la plataforma de forma segura y acceder a los servicios proporcionados.
- Los campos opcionales de nombre (firstName) y apellido (lastName) permiten a los usuarios proporcionar información adicional si lo desean, pero no son obligatorios para el registro.


### Mostrar Perfil de Usuario

**Verbo:** GET

**Ruta:**  'auth/profile'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.

**Descripción:**
Esta funcionalidad permite mostrar el perfil del usuario que ha iniciado sesión en la plataforma. Se utiliza para proporcionar al usuario una vista de su propio perfil, incluyendo información como su nombre de usuario, correo electrónico y otros detalles relevantes.

**Entradas:**
- **currentUser:** El usuario actual que ha iniciado sesión y cuyo perfil se desea mostrar.

**Flujo de Trabajo:**
1. Un usuario inicia sesión en la plataforma con sus credenciales.
2. Después de iniciar sesión, el usuario desea ver su propio perfil.
3. La plataforma verifica la autenticación del usuario actual a través de un objeto **currentUser** para garantizar que está autorizado para ver su propio perfil.
4. Si la autenticación es exitosa, la plataforma muestra al usuario su perfil, que incluye detalles como el nombre de usuario, el correo electrónico y otros detalles relacionados con la cuenta.
5. El usuario puede revisar su perfil.

**Salidas:**
- Vista del perfil del usuario actual que incluye información relevante.

**Escenarios Adicionales:**
- Esta funcionalidad proporciona a los usuarios la capacidad de ver y gestionar su propio perfil en la plataforma.
- La autenticación del usuario actual (currentUser) es esencial para garantizar que solo el usuario legítimo pueda ver su propio perfil.
- Se puede agregar la opción de editar perfil del usuario.


### Renovar Token de Acceso (Refresh Token)

**Verbo:** POST

**Ruta:**  'auth/refresh'

**Restricción de Acceso:** 
- Usuario autenticado: Un usuario que ha iniciado sesión en la aplicación.

**Descripción:**
Esta funcionalidad permite a un usuario autenticado renovar su token de acceso para mantener su sesión activa. Se utiliza el objeto **currentUser** para verificar la autenticación del usuario y proporcionar un nuevo token de acceso.

**Entradas:**
- **currentUser:** El usuario actual que ha iniciado sesión y cuya sesión se desea mantener activa mediante la renovación del token de acceso.

**Flujo de Trabajo:**
1. Un usuario autenticado desea mantener su sesión activa y renovar su token de acceso.
2. La plataforma verifica la autenticación del usuario actual a través del objeto 'currentUser'.
3. Si la autenticación es exitosa y se confirma que el usuario ha iniciado sesión, la plataforma genera un nuevo token de acceso válido.
4. El nuevo token de acceso se proporciona al usuario, lo que le permite seguir utilizando la plataforma sin necesidad de volver a iniciar sesión.
5. El token anterior puede ser revocado para garantizar la seguridad de la sesión.

**Salidas:**
- Nuevo token de acceso válido para el usuario.

**Escenarios Adicionales:**
- Esta funcionalidad permite a los usuarios autenticados mantener su sesión activa sin necesidad de volver a iniciar sesión con frecuencia.
- El uso de tokens de actualización (refresh tokens) ayuda a mejorar la seguridad al limitar la vida útil de los tokens de acceso.
