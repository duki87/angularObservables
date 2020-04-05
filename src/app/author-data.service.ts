import { Injectable } from '@angular/core';
import { Author } from './models/authorModel';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorDataService {

  private authors: Author[] = [
    {
      id: 1,
      name: 'Растко Петровић',
      numOfBooks: 53,
      bio: 'Растко Петровић (рођен 3. марта 1898. године, преминуо 15. августа 1949) је био српски књижевник, песник, приповедач, романсијер, есејиста, сликар и дипломата. Бавио се ликовном.[1][2][3] и књижевном критиком[4] Са многобројних путовања оставио је занимљиве путописе'
    },
    {
      id: 2,
      name: 'Милош Црњански',
      numOfBooks: 20,
      bio: 'Милош Црњански (Чонград, 26. октобар 1893 — Београд, 30. новембар 1977) је био српски књижевник и један од најзначајнијих стваралаца српске литературе 20. века. Истакао се као песник, приповедач, романсијер и публициста. Бавио се и ликовном критиком. Убрајан је и међу 100 најзнаменитијих Срба.'
    },
    {
      id: 3,
      name: 'Иво Андрић',
      numOfBooks: 40,
      bio: 'Иво Андрић (Долац, код Травника, 9. октобар 1892 — Београд, 13. март 1975) био је српски и југословенски[a] књижевник и дипломата Краљевине Југославије. Године 1961. добио је Нобелову награду за књижевност „за епску снагу којом је обликовао теме и приказао судбине људи током историје своје земље.',
    },
    {
      id: 4,
      name: 'Меша Селимовић',
      numOfBooks: 35,
      bio: 'Рођен је 26. априла 1910. године у Тузли. У родном граду завршио је основну школу и гимназију. Године 1930. уписао се на студијску групу српскохрватски језик и југословенска књижевност Филозофског факултета у Београду. Дипломирао је 1934. године, а од 1935. до 1941. године ради као професор Грађанске школе, а потом је 1936. године постављен за суплента у Реалној гимназији у Тузли.',
    },
    {
      id: 5,
      name: 'Драгослав Михаиловић',
      numOfBooks: 15,
      bio: 'Рођен у Ћуприји, студирао у Београду Филозофски факултет на Групи за југословенску књижевност и српскохрватски језик. Према његовим речима, долази у сукобе са Удбом, након што се побунио против хапшења својих другова, који су ухапшени због политичких вицева.',
    }
  ];

  constructor() { }

  getAuthors() {
    console.log('Fetching data...');
    return of([
      ...this.authors
      .map(author => ({...author}))
    ]).pipe(
      delay(1000),
      tap(() => console.log('Fetching data complete')),
    ) 
  }
}