import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
