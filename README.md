## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Setting Up Database

1. Download and install [pgadmin](https://www.pgadmin.org/download/)
2. Create a new database named `auth_db`
3. Create a new schema named `auth_schema`

## .env File

1. create a file and name it to `.env` which should contain the following:

```
PORT=3000
API_VERSION=v0.0.1
ENABLE_LOGGING=true
DB_PORT=5432
# ------------------------------------------
# >>>>> DB
DB_HOST=localhost
DB_USERNAME= [database user name]
DB_PASSWORD= [database password]
DB_NAME=auth_db
DB_SCHEMA=auth_schema
## ----------------------------------
# >>>> Super admin seeding data
SUPER_ADMIN_EMAIL=[super admin email]
SUPER_ADMIN_PASSWORD= [any password of your choosing]
```

## ormconfig.json

1. Create a file named `ormconfig.json` and it should be as follows:

```
{
    "type": "postgres",
    "host": "localhost",
    "port": "5432",
    "username": "Same as DB_USERNAME",
    "password": "Same as DB_PASSWORD",
    "database": "auth_db",
    "schema": "auth_schema",
    "entities": [
        "src/**/*.model.{ts,js}"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "synchronize": false,
    "logging": true,
    "migrationsRun": true,
    "cli": {
        "entitiesDir": "src/model",
        "migrationsDir": "src/migration"
    }
}
```

## Initializing Database

1. In the cli write `npm run migrate`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
