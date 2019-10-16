import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models/userModel';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  get currentUser(): Observable<User> {
    return of({
      id: 1,
      name: "Dusan",
      favoriteBookId: 39
    }).pipe(
      tap(() => console.log('Fetching user data started...')),
      delay(1000),
      tap(() => console.log('Fetching user data completed.')),
    )
  }
}
