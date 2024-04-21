export interface Me {
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  authProviderType: OAuth2ProviderType
  authorities: Array<String>
}

export enum OAuth2ProviderType {
  DISCORD,
  GITHUB,
  GOOGLE,
  NON_OAUTH2_USER
}
