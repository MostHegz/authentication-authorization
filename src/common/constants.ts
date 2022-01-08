export class Constants {
    public static DOT_ENV = require('dotenv').config();

    // API Routes
    public static API_VERSION = 'v0.0.1';
    public static API_PREFIX = 'api';

    // Admin data seeding
    public static SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
    public static SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;
    public static SUPER_ADMIN_FIRST_NAME = process.env.SUPER_ADMIN_FIRST_NAME ? process.env.SUPER_ADMIN_FIRST_NAME : 'N/A';
    public static SUPER_ADMIN_LAST_NAME = process.env.SUPER_ADMIN_LAST_NAME ? process.env.SUPER_ADMIN_LAST_NAME : 'N/A';

    // DB Configuration
    public static DATABASE_SCHEMA = process.env.DB_SCHEMA;

    // Server Configuration
    public static PORT = process.env.PORT;

    // Swagger
    public static API_TITLE = 'Authentication and Authorization API';
    public static API_TAG = 'Docs';
    public static API_AUTH_TYPE = 'http';
    public static API_AUTH_SCHEMA = 'bearer';
    public static API_AUTH_BEARER_FORMAT = 'JWT';
    public static API_AUTH_PATH = 'header';
    public static API_AUTH_NAME = 'Authorization';

}
