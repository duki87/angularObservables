import { Injectable } from '@angular/core';
import { Book } from './models/bookModel';
import { filter, map, delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = [
    {
      id: 12,
      title: 'Дан шести',
      author: 'Растко Петровић',
      publisher: 'Нолит Београд',
      year: '1982.',
      available: true
    },
    {
      id: 15,
      title: 'Сеобе',
      author: 'Милош Црњански',
      publisher: 'БИГЗ Београд',
      year: '1989.',
      available: true
    },
    {
      id: 19,
      title: 'На Дрини ћуприја',
      author: 'Иво Андрић',
      publisher: 'Просвета Београд',
      year: '1995.',
      available: true
    },
    {
      id: 28,
      title: 'Дервиш и смрт',
      author: 'Меша Селимовић',
      publisher: 'ГГ Београд',
      year: '2009.',
      available: false
    },
    {
      id: 39,
      title: 'Кад су цветале тикве',
      author: 'Драгослав Михаиловић',
      publisher: 'Народна књига Београд',
      year: '2002.',
      available: true
    }
  ];

  constructor() { }

  getBooks(available?: boolean) {
    console.log('Fetching data...');
    return of([
      ...this.books
      .map(book => ({...book}))
      .filter(book => available === undefined ? true : book.available === available)
    ]).pipe(
      delay(1000),
      tap(() => console.log('Fetching data complete')),
    ) 
  }

  updateAvailability(id: number, available: boolean) {
    console.log(`Setting availability to ${available} for book with id ${id}`);
    const book = this.books.find(book => book.id === id);
    book.available = available;
    return of({...book}).pipe(
      delay(1000)
    );
  }
}
