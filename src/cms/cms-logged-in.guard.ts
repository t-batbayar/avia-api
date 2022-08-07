import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CmsLoggedInGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        return context.switchToHttp().getRequest().isAuthenticated();
    }
}
