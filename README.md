# AWS-Serverless-API

![Serverless](https://img.shields.io/badge/-serverless-C80A2D?style=flat-square&logo=serverless&logoColor=ffffff)
![AWS](https://img.shields.io/badge/-AWS-0F79AF?style=flat-square&logo=amazon&logoColor=ffffff)
![Nodejs](https://img.shields.io/badge/-Nodejs-339933?style=flat-square&logo=Node.js&logoColor=ffffff)
![DynamoDB](https://img.shields.io/badge/-DynamoDB-4053D6?style=flat-square&logo=Amazon%20DynamoDB&logoColor=white)


Este proyecto implementa una arquitectura de API utilizando **AWS Lambda** y **Amazon API Gateway** para gestionar solicitudes de usuarios y manejar operaciones con bases de datos y APIs externas.

## Despliegue

Instalar las dependencias con:

```
npm install
```

y luego hacer el despliegue con:

```
serverless deploy
```

Luego de desplegar el proyecto se puede agregar el ARN del DynamoDB creado en la variable de entorno `dynamo_db_arn` para mejorar la seguridad de la aplicación.

```json
// Archivo env-stage.json
{
  "project_name":     "project_name",
  "external_api_url": "https://api.com",
  "dynamo_db_arn":    "*",// <--- Cambiar aquí
  "datatable_name":   "dybamo_table"
}
```

## URLS

| Función            | Método | Ruta               | Descripción                                                              | Observaciones                             |
|--------------------|--------|--------------------|--------------------------------------------------------------------------|-------------------------------------------|
| Listar Planetas    | GET    | `/planetas`        | Consume la API Starwars y trae la relacion de planetas.                  | Solo traduce las rutas de paginación      |
| Mostrar Planeta    | GET    | `/planetas/{id}`   | Consume la API Starwars y muestra la información del planeta específico. | Ninguna                                   |
| Listar Libros      | GET    | `/libros`          | Lista los libros creados por el usuario.                                 | Ninguna                                   |
| Crear Libro        | POST   | `/libros`          | Crea un nuevo libro con la información proporcionada por el usuario.     | Aplica validación de datos                |

### Para más información acerca de las APIs, puede consultar la [documentación](https://app.swaggerhub.com/apis-docs/JesusLlica/documentacion-aws_serverless_api/1.0.0) de las rutas realizada en swagger

## Funcionalidad General

- **API Gateway**: Actúa como punto de entrada para las solicitudes de los usuarios y dirige las peticiones a las funciones Lambda correspondientes.
- **Lambda POST** y **Lambda GET**: Ejecutan la lógica para interactuar con las bases de datos o para consumir la API externa.
- **DynamoDB**: Almacena la información procesada.
- **API Externa**: El proyecto actua como intermediario de la [API de Star Wars](https://swapi.py4e.com/documentation) leyendo la información de planetas y devolviendo una estructura en español.


## Diagrama de Arquitectura

A continuación se muestra un diagrama que ilustra la arquitectura del proyecto:

![Diagrama de Arquitectura](https://mizterfrek.com/img/serverless-app.png)

---

## Configuraciones adicionales

### Configuración de Variables de Entorno

Este proyecto utiliza un archivo JSON para gestionar las variables de entorno, lo cual permite un manejo flexible de configuraciones según el stage o entorno en el que se despliegue la aplicación (desarrollo, producción, etc.).

### Nombre del archivo .JSON

Es fundamental que el archivo de variables de entorno tenga un nombre específico que incluya el sufijo del stage de la aplicación. De esta manera, el proyecto puede identificar y utilizar el archivo de configuración adecuado. A continuación se muestran ejemplos de nombres de archivo según el stage:

- **Entorno de desarrollo (dev)**: `env-dev.json`
- **Entorno de producción (prod)**: `env-prod.json`

### Stage Predeterminado

El stage predeterminado de la aplicación es `dev`, por lo que el proyecto incluye el archivo `env-dev.json` con las configuraciones básicas para un despliegue rápido y sencillo. Esto permite que la aplicación pueda iniciarse en un entorno de desarrollo sin necesidad de configuraciones adicionales.

## Configuración de Otros Stages

Para configurar otros stages, basta con crear un archivo JSON siguiendo el formato `env-<stage>.json`, donde `<stage>` representa el nombre del entorno deseado (por ejemplo, `test` para testing).


---


