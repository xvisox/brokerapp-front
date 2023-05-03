import {Injectable} from '@angular/core';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public getToken(): any {
    const token = window.sessionStorage.getItem(TOKEN);
    if (token) {
      return JSON.parse(token);
    }
    return {};
  }

  public saveToken(token: any): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, JSON.stringify(token));
  }

  public isLogged(): boolean {
    return this.getToken() !== null;
  }
}
