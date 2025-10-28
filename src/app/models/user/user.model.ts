import {PermissionModel} from '@shared/models/user/permission.model';

export interface UserModel {
  id: string;
  email: string;
  phone?: string;
  name: string;
  has_verified_email?: string;
  has_verified_phone?: string;
  image: string;
  permissions?: PermissionModel[];
}

