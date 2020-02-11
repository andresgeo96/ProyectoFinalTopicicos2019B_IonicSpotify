Se presenta el proceso de desarollo de una aplicación movil el cual fue implementada en Ionic-Angular utilizando la API de spotify developer para consumir las playlist y reproducir las canciones que tengamos en ellas. 
Adicional se muestra la implementación del servidor node.js que nos sirve para la autentificación en spotify con el fin de refrescar o cambiar el token

Requisitos:

Cuenta de Develloper en Spotify
Cuenta en Heroku
Ionic
Visual Studio Code (Opcional)

Desarrollo de la solución:

SERVIDOR DE AUTENTIFICACION EN HEROKU
Creamos una cuenta en https://signup.heroku.com/login
Procedemos a crear un nuevo proyecto dentro de heroku, este nos ayudara autentificarnos con la cuenta de spotify y refrescar el token o cambiarlo en caso de que se haya caducado
Crearemos un servidor con node.js e instalaremos las dependecias body-parser cors crypto-js dotenv express http request
Procederemos a subir nuestro servidor a heroku

DESAROLLO DE LA APLICACION EN IONIC - FRAMEWORK ANGULAR 
Procederemos a crear el proyecto en ionic con el framework de angular
Procederemos a instalar el plugin ionic cordova plugin add cordova-plugin-media, npm i @ionic-native/media
Despues procedemos a instalar el plugin spotify en ionic npm i spotify-web-api-js
Creamos un proyecto nuevo proyecto en blanco dentro de Ionic
Configuramos el nombre que tendra nuestro proyecto y seleccionamos el framework Angular
Procedemos con el desarollo tal como se explica en el video
Deberemos crear una paguina en donde mostraremos nuestra playlist
Procederemos a crear nuestra aplicacion con el comando ionic cordova buil android
Procedemos a ejecutar el comando ionic cordova run android para instalar la apk en neustro telefono
Probamos la funcionalidad de nuestra aplicación 

LINK DEL VIDEO TUTORIAL 

https://www.youtube.com/watch?v=wpudfz3z0mo
