import { ExecutionContext, Injectable } from '@nestjs/common';

import { CmsLoggedInGuard } from './cms-logged-in.guard';

@Injectable()
export class CmsAdminGuard extends CmsLoggedInGuard {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        return (
            super.canActivate(context) &&
            req.session.passport.user.role === 'admin'
        );
    }
}
