import { SetMetadata } from '@nestjs/common';
import { Constants } from 'src/common';
import { DefaultRoles } from 'src/data';

export const AuthorizedRoles = (...roles: DefaultRoles[]) => SetMetadata(Constants.ROLES_KEY, roles);
