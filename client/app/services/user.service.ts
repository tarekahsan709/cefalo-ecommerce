import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/v1/users', user);
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

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/api/v1/users', user);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`/api/v1/users/${user._id}`);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`/api/v1/users/${user._id}`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`/api/v1/users/${user._id}`, { responseType: 'text' });
  }

}
