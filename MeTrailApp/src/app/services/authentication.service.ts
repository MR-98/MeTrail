import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.currentUserSubject = new BehaviorSubject(null);
    storage.get('currentUser').then((val) => {
      this.currentUserSubject = new BehaviorSubject(JSON.parse(val));
      this.currentUser = this.currentUserSubject.asObservable();
    })
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('https://mytrail-2k20.ew.r.appspot.com/auth/signIn', { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
          this.storage.set('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  updateUser(user) {
    this.storage.set('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    // remove user from local storage to log user out
    this.storage.remove('currentUser');
    this.storage.remove('username');
    this.storage.remove('password');
    this.currentUserSubject.next(null);
  }
}
