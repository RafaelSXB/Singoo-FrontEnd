import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { AuthRequest, AuthResponse, UserDto } from './auth-models';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
 
  private readonly DB_USERS_KEY = 'singoo_mock_db_users';
  private readonly SESSION_KEY = 'singoo_session';

  constructor() {
   
    if (!localStorage.getItem(this.DB_USERS_KEY)) {
      localStorage.setItem(this.DB_USERS_KEY, JSON.stringify([]));
    }
  }


  register(payload: AuthRequest): Observable<AuthResponse> {
    const users = JSON.parse(localStorage.getItem(this.DB_USERS_KEY)!);

    const userExists = users.find((u: UserDto) => u.email === payload.email);
    if (userExists) {
      return throwError(() => new Error('Este e-mail já está em uso.'));
    }


    const newUser = {
      id: crypto.randomUUID(), 
      email: payload.email,
      password: payload.password, 
      tier: 'FREE'
    };

 
    users.push(newUser);
    localStorage.setItem(this.DB_USERS_KEY, JSON.stringify(users));


    const response: AuthResponse = this.generateAuthResponse(newUser);


    return of(response).pipe(delay(800));
  }


  login(payload: AuthRequest): Observable<AuthResponse> {
    const users = JSON.parse(localStorage.getItem(this.DB_USERS_KEY)!);

   
    const user = users.find((u: AuthRequest) => u.email === payload.email && u.password === payload.password);
  
    if (!user) {
 
      return throwError(() => new Error('E-mail ou senha incorretos.'));
    }

   
    const response: AuthResponse = this.generateAuthResponse(user);

  
    return of(response).pipe(delay(800));
  }

 
  private generateAuthResponse(user: any): AuthResponse {
    const response: AuthResponse = {
      token: 'mock-jwt-token-' + new Date().getTime(),
      user: {
        id: user.id,
        email: user.email,
        tier: user.tier as 'FREE' | 'PRO'
      }
    };
    

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(response));
    return response;
  }
}