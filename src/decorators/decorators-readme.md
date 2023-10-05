# Decorators

## Descripción

Con motivo de mejorar la legibilidad en la escritura de los Endpoints y garantizar el funcionamiento de los controles requeridos de acceso. Se disponibilizaron cinco decoradores que contribuyen directamente en la reducción de las consultas reiteradas a la base de datos para verificar la veracidad de los datos ingresados, generando la recuperación de los mismos desde la request directamente. 
Esta operatoria diseñanda en conjunto con los guards permite que los Guards verifique las condiciones de autorizacion y en caso de ser correcta la continuidad, registran los datos consultados en la request para que queden disponibles a lo largo del resto de la operación. 
De esa forma luego los decoradores las extraen para su utilizacion directamente.

## Detalle

1. @User() Devuelve un objeto { userid, email} datos del usuario Actual.

2. @CurrentUser() Devuelve un objeto de tipo User que se corresponde con el usuario Actual.

3. @CurrentCollaborator() Devuelve un objeto de tipo Collaborator que se corresponde con el usuario Actual como collaborador del proyecto.

4. @CurrentProject() Devuelve un objeto de tipo Project que se corresponde con el id Project por el que se esta queriendo operar.

5. @CurrentDocument() Devuelve un objeto de tipo Document que se corresponde con el idDoc por el que se esta queriendo operar.

Para mas información, verificar el código de los archivos correspondientes.



