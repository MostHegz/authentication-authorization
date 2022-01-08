import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Constants } from 'src/common';
import { JwtPayload } from 'src/data';
import { DefaultRoles } from 'src/data/enum/role';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<DefaultRoles[]>(Constants.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const token: JwtPayload = context.switchToHttp().getRequest().user;

        for (const role of token.roles) {
            if (requiredRoles.includes(role)) {
                return true;
            }
        }

        return false;
    }
}
