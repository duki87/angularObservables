import { Component, OnInit } from '@angular/core';
import { AuthorDataService } from '../author-data.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../models/authorModel';
import { interval, Observable, Subject, BehaviorSubject, forkJoin } from 'rxjs';
import { map, debounceTime, delay, mergeMap, startWith, merge, combineLatest } from 'rxjs/operators';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  refreshDataClickSubject = new Subject();
  model$: Observable<{ authors: Author[], isLoading: boolean }>;

  constructor(private authorDataService: AuthorDataService, private activatedRoute: ActivatedRoute) {
    const refreshDataClick$ = this.refreshDataClickSubject.asObservable();

    const refreshTrigger$ = refreshDataClick$.pipe(
      startWith({}),
    );

    const authorList$ = refreshTrigger$.pipe(
      mergeMap(() => authorDataService.getAuthors()),
    );

    this.model$ = refreshTrigger$
                  .pipe(
                    map(() => ({ authors: [], isLoading: true })),
                    merge(
                      authorList$.pipe(map(authors => ({ authors: authors, isLoading: false }))
                    ),
                )
            )
  }

  ngOnInit() {
  }

}
