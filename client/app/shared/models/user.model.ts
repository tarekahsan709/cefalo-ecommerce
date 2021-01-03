export class User {
  // tslint:disable-next-line: variable-name
  id?: string;
  email: string;
  password: string;
}

export interface IApiResponse {
  status: boolean;
  error?: string;
}
