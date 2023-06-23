import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

const API_URL = `http://${environment.ip}:${environment.port}/api/v1/users/`;
const options = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + "register", {
      username,
      password
    }, options);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + "login", {
      username,
      password
    }, options);
  }
}
