import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CmsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        return true;
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            return false;
        }
        return true;
    }

    private matchRoles(roles: string[], userRole: string) {
        if (roles.includes(userRole)) {
            return true;
        }
        return false;
    }
}
