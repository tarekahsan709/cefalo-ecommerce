export class IUser {
  // tslint:disable-next-line: variable-name
  id?: string;
  email: string;
  password: string;
  token: string;
}

export interface IApiResponse {
  status: boolean;
  error?: string;
}
