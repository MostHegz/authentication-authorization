# Description

This is an application to show authentication and authorization using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Table of Content

1. [ Features. ](#features)
2. [ How It Works. ](#how)
3. [ Example ](#example)
4. [ Getting Started. ](#start)
5. [ Todo List. ](#todo)

<a name="features"></a>

## Features

1. Register device api that should send uuid for each device
2. Login and Logout apis
3. Refresh token api
4. User Management APIs
5. Dummy APIs to show the Roles Auth
6. Exception filter to map all errors in the following interface

   ```json
   {
     "code": 201,
     "errors": [
       {
         "message": "String showing error message",
         "property": "showing the failed property name in DTO"
       }
     ]
   }
   ```

<a name="how"></a>

# How It works

1. Client register device uuid through `register-device` api
2. User enter email and password to login sending the same uuid
3. Access JWT is generated with expiry of 2 hours and Refresh JWT with expiry of 30 days for this device
4. The token payload interface is in [jwt.interface.ts](https://github.com/MostHegz/authentication-authorization/blob/development/src/data/interface/jwt.interface.ts)
5. User id is then added to the device table which contains the tokens
6. Each action after that is authenticated by checking expiry of the token and the device uuid by Using [access-jwt.guard.ts](https://github.com/MostHegz/authentication-authorization/blob/main/src/modules/shared/guards/access-jwt.guard.ts) and [refresh-jwt.guard.ts](https://github.com/MostHegz/authentication-authorization/blob/main/src/modules/shared/guards/refresh-jwt.guard.ts)
7. Role authorization is done by setting the authorized roles for this route in the request metadata through [authorized-roles.decorator.ts](https://github.com/MostHegz/authentication-authorization/blob/main/src/utilities/decorators/authorized-roles.decroator.ts) then checking users token if it contains the authorized roles through [role.guard.ts](https://github.com/MostHegz/authentication-authorization/blob/main/src/modules/shared/guards/role.guard.ts)

<a name="example"></a>

# Example

```typescript
@Post(`${Constants.ADD_TO_CART}`)
@AuthorizedRoles(DefaultRoles.SuperAdmin, DefaultRoles.Admin, DefaultRoles.Buyer) // Setting authorized roles in metadata
@UseGuards(AccessJwtGuard, RoleGuard) // using access jwt guard and role guard
addItemToCart(): Promise<string> {
    try {
        //Only Super admin, Admins, and Buyers can reach this
        return Promise.resolve(SuccessMessage.ItemsAddedToCartSuccessfully);
    } catch (error) {
        this.logger.error(error);
        throw new InternalServerErrorException();
    }
}
```

<a name="start"></a>

# Getting Started

## 1. Installing Packages

```bash
$ npm install
```

## 2. Setting Up Database Environment

1. Download and install [pgadmin](https://www.pgadmin.org/download/)
2. Create a new database named `auth_db`
3. Create a new schema named `auth_schema`
4. Create a file and name it to `.env` in the root folder which should contain the following:

   ```bash
   PORT=3000
   # ------------------------------------------
   # >>>>> DB
   DB_PORT=5432
   DB_HOST=localhost
   DB_USERNAME= [database user name]
   DB_PASSWORD= [database password]
   DB_NAME=auth_db
   DB_SCHEMA=auth_schema
   ## ----------------------------------
   # >>>> Super admin seeding data
   SUPER_ADMIN_EMAIL=[super admin email] #If not set it will be [dummy@dummydomain.com]
   SUPER_ADMIN_PASSWORD= [any password of your choosing] #If not set it will be [Auth@123]
   SUPER_ADMIN_FIRST_NAME= [First name]
   SUPER_ADMIN_LAST_NAME= [Last name]
   ```

5. Create a file named `ormconfig.json` and it should be as follows:
   ```json
   {
     "type": "postgres",
     "host": "localhost",
     "port": "5432",
     "username": "Same as DB_USERNAME",
     "password": "Same as DB_PASSWORD",
     "database": "auth_db",
     "schema": "auth_schema",
     "entities": ["src/**/*.model.{ts,js}"],
     "migrations": ["src/migration/**/*.ts"],
     "synchronize": false,
     "logging": true,
     "migrationsRun": true,
     "cli": {
       "entitiesDir": "src/model",
       "migrationsDir": "src/migration"
     }
   }
   ```
6. Run the database migration script through the terminal

   ```bash
   $ npm run migrate
   ```

7. After database migration is finished you should find 3 tables in you `auth_schema` called `users`, `user_devices`, and `migrations`

## 3. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## 4. API Collection

After running the App you can go to `localhost:3000/swagger` to check the available apis

<a name="todo"></a>

# To do List

1. Adding property name to errors from validating dto
2. Using redis to cache tokens and verify tokens from it instead of PostgreSQL
