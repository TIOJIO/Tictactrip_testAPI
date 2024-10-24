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