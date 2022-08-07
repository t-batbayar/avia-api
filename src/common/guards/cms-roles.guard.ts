import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CmsRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getClass());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        return this.matchRoles(roles, request.user?.role);
    }

    private matchRoles(roles: string[], userRole: string) {
        if (roles.includes(userRole)) {
            return true;
        }
        return false;
    }
}
