# Implementation and deployment of a REST API which justifies a text passed as a parameter.

## installation of outbuildings

```
$ npm install typescript ts-node nodemon express body-parser jsonwebtoken rate-limiter-flexible
$ npm install --save-dev jest supertest ts-jest @types/express @types/jest @types/jsonwebtoken @types/body-parser
```
## init TypeScript and configuration

```
$ npx tsc --init
```

## app architecture

```
/src
  /controllers
    authController.ts
    justifyController.ts
  /middlewares
    authMiddleware.ts
    rateLimitMiddleware.ts
  /routes
    authRoutes.ts
    justifyRoutes.ts
  /services
    tokenService.ts
    justificationService.ts
  app.ts
/tests
  authController.test.ts
  justifyController.test.ts
package.json
tsconfig.json
```

## tests configurations
```
"scripts": {
  "start": "ts-node src/app.ts",
  "dev": "nodemon src/app.ts",
  "test": "jest"
}

```
## local tests Files

### file authController.test.ts
```
npx jest tests/authController.test.ts
```
### file justifyController.test.ts
```
npx jest tests/justifyController.test.ts
```

### deployement documentation

- download and install Heroku CLI
- login in your Heroku account
```
heroku login
```
-create new app

```
heroku create app-name
```

### project configuration
your package.json must have
```
"engines": {
  "node": "16.x"
}
```

"scripts": {
  "start": "node dist/app.js"
}

#### execute this command to configure environnement variable
```
heroku config:set JWT_SECRET=your_secret_value
```

- create file procfile and put command : web: npm run start

#### buil your app and push

```
npm run build
git add .
git commit -m "Prepare app for deployment"
git push heroku main
```
