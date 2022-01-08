import { DefaultRoles, TokenType } from '../enum';

export interface JwtPayload {
    userId: number;
    roles: DefaultRoles[];
    userDevice: string;
    firstName: string;
    lastName: string;
    email: string;
    expire?: string;
    type: TokenType;
}
