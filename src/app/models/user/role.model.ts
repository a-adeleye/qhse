import {PermissionModel} from '@shared/models/user/permission.model';

export class RoleModel {
  id!: string;
  name!: string;
  description !: string;
  permissions!: PermissionModel[];
}
