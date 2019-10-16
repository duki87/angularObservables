import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/bookModel';
import { User } from '../models/userModel';
import { interval, Observable, Subject, BehaviorSubject, forkJoin } from 'rxjs';
import { map, debounceTime, delay, mergeMap, startWith, merge, combineLatest } from 'rxjs/operators';
import { filter } from 'minimatch';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent {
  refreshDataClickSubject = new BehaviorSubject({});

  model$: Observable<{ books: Book[], isLoading: boolean }>;

  constructor(private bookDataService: BookService, private userDataService: UserDataService, private activatedRoute: ActivatedRoute) {
    const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
    const refreshTrigger$ = refreshDataClick$.pipe(
      startWith({}),
      combineLatest(activatedRoute.queryParams),
      map(([_, params]) => {
        if(params.available === undefined) return undefined;
        return params.available === "true";
      })
    );
    const bookList$ = refreshTrigger$.pipe(
      mergeMap(available => forkJoin(
        this.bookDataService.getBooks(available),
        this.userDataService.currentUser
      )),
      map(([books, currentUser]) => 
        books.map(book => book.id === currentUser.favoriteBookId ? {...book, favorite: true} : book
        )
      ) 
    );

    this.model$ = refreshDataClick$
                  .pipe(map(() => ({ books: [], isLoading: true }))).pipe(
                    merge(
                        bookList$.pipe(map(books => ({ books: books, isLoading: false }))
                      ),
                  )
    );   
 
  }
}