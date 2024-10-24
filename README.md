# Implémentation et déploiement d' une API REST qui justifie un texte passé en paramètre.

### app architecture

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
