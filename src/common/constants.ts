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

    // Auth Configuration
    public static AUTH_HEADER_KEY = 'authorization';
    public static AUTH_TYPE = 'Bearer';
    public static JWT_SECRET_KEY = 'JG!g9MvCsKR=-Y=aVkF3EjRTYFJd-?qS=yf_FRRz@%!q3zdwb#=adHNdT#hC$?#A3yCZLcWqjq9RSX46GAQ*Z&y3d5*rBXZ=4RcHpX+Gs_eRZfrjwq&snC#G*jmU7mg@vey8rk@Wkp!jQw!9n_j35A@_+cAmusP8jg94*=zH%w^qCqb@p#^XE$8=G+pLW#&YbSJ!C$xvhrgVW3nmr^AvK9#?cu=!9QfXBj*NqcaC6XRA!U!+EJ67C3R4?pCCX@+8';
    public static JWT_ENCODE_ALGORITHM = 'HS256';
    public static JWT_ACCESS_EXPIRY = '2h';
    public static JWT_REFRESH_EXPIRY = '30d';

    // Auth Path
    public static AUTH_PATH = 'auth';
    public static AUTH_TAG = 'Auth';
    public static LOGIN_PATH = 'login';
    public static LOGOUT_PATH = 'logout';
    public static REGISTER_DEVICE_PATH = 'register-device';
    public static REFRESH_ACCESS_TOKEN = 'refresh-access-token';

    // Auth Path
    public static USER_PATH = 'user';
    public static USER_TAG = 'User';

    // CRUD Paths
    public static ADD_PATH = 'add';
    public static UPDATE_PATH = 'update';
    public static BY_ID_PATH = '/:id';

    // Regex
    public static PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%+.*_?&#-]{8,15}$/;

    // Context Keys
    public static ROLES_KEY = 'roles';

}
