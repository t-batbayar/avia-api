import { SetMetadata } from '@nestjs/common';

export const CmsRoles = (...roles: string[]) => SetMetadata('roles', roles);
