export interface TokenModel {
  Id: number;
  authorityType: string;
  environment: string;
  homeAccountId: string;
  idToken: string;
  idTokenClaims: Record<string, string>;
  localAccountId: string;
  name: string;
  nativeAccountId: undefined;
  tenantId: string;
  tenantProfiles: string;
  username: string;
}
