# NODE JS BAREBONE WITH SEQUELIZE AND JWT AUTH

## PREREQUISITE

- Node installed

## STEPS TO RUN LOCALLY

- Clone the project
- Run command "npm install"
- Goto .env and change the database and jwt config
- Run command "npm run dev"

## DEFINING ROLES

- In consts folder index.js file replace the ROLE object with your required roles
- In models folder users.js change role enum as per your requirement

## ROUTING

- In routes folder there are two files required to define routes(privateRoutes, publicRoutes)
- Define all your routes that requires token in privateRoutes.js

## ROUTES STRUCTURE

- 'controllerName': [
  {p: 'PATH_OF_ROUTE', m:'METHOD', a: 'FUNCTION_NAME_OF_CONTROLLER', r: [ROLES]}
  ]
- For Example: 'users': [
  {p: '/user/private', m:'GET', a: 'getPrivateUserData', r: [ROLE.CUSTOMER]}
  ]
