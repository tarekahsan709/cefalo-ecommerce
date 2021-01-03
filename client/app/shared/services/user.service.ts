import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/v1/users/register', user);
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/v1/users/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/v1/users/all');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('/api/v1/users/count');
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`/api/v1/users/${user.id}`);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`/api/v1/users/${user.id}`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`/api/v1/users/${user.id}`, { responseType: 'text' });
  }

}
