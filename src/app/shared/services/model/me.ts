export interface Me {
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  oauth2ProviderType: OAuth2ProviderType
  authorities: Array<String>
}

export enum OAuth2ProviderType {
  DISCORD,
  GITHUB
}
