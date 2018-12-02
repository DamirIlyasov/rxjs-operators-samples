import {Component, OnInit} from '@angular/core';
import {combineLatest, concat, from, interval, merge, Observable, of} from 'rxjs';
import {catchError, share, startWith, tap, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Operators';

  ngOnInit(): void {
    // this.combineLatest();
    // this.concat();
    // this.merge();
    // this.startWith();
    // this.withLatestFrom();
    // this.from();
    // this.of();
    this.catchError();
    // this.tap();
    // this.share();
  }

  combineLatest() {
    const firstObs = new Observable(observer => {
      setTimeout(() => observer.next(1), 4000);
    });
    const secondObs = new Observable(observer => {
      observer.next(1);
      setTimeout(() => observer.next(2), 2000);
    });

    const thirdObs = new Observable(observer => {
      observer.next(1);
      setTimeout(() => observer.next(2), 2000);
    });

    const result = combineLatest(firstObs, secondObs, thirdObs);
    result.subscribe(([first, second, third]) => {
      console.log(`First: `, first);
      console.log(`Second: `, second);
      console.log(`Third: `, third);
    });
  }

  concat() {
    const firstObs = of(1, 2, 3);
    const secondObs = of(4, 5, 6);
    const result = concat(firstObs, secondObs);
    result.subscribe(value => {
      console.log(value);
    });
  }

  merge() {
    const firstObs = of(1, 1, 1);
    const secondObs = of(2, 2, 2);
    const merged = merge(firstObs, secondObs);
    merged.subscribe(value => {
      console.log(value);
    });
  }

  startWith() {
    const firstObs = of(1, 2, 3);
    const result = firstObs.pipe(startWith(0));
    result.subscribe(value => {
      console.log(value);
    });
  }

  withLatestFrom() {
    const firstObs = interval(5000);
    const secondObs = interval(1000);
    const result = firstObs.pipe(
      withLatestFrom(secondObs),
      tap(([firstValue, secondValue]) => {
        console.log('First value: ', firstValue);
        console.log('Second value: ', secondValue);
      })
    );
    result.subscribe(() => {
    });
    // попробуйте поменять местами first и second
  }

  from() {
    const firstObs = from([1, 2, 3, 4]);
    firstObs.subscribe(value => {
      console.log('Value: ', value);
    });
  }

  of() {
    const object: {
      field1: string,
      field2: number
    } = {
      field1: 'qwe',
      field2: 123
    };

    const obs = of(object, () => {
      console.log('I`m a function inside observable');
    });
    obs.subscribe(value => {
      console.log(value);
    });
  }

  catchError() {
    const errorObservable = new Observable(observer => {
      observer.error('Error value');
      // вторая ошибка не будет обработана, т.к. catchError завершает observable
      observer.error('Error value');
    });


    // errorObservable.subscribe(() => {
    //   console.log('Everything is fine!');
    // });
    // ошибка вывелась в браузер, т.к. мы её не обработали

    // теперь обработаем:
    errorObservable.pipe(
      catchError(error => {
        console.log('Error caught: ', error);
        return of('Error caught: ', error);
      })
    ).subscribe();
  }

  tap() {
    const firstObs = of(1, 2, 3);
    firstObs.pipe(
      tap(v => {
        console.log('tap: ', v);
      })
    ).subscribe(v => {
      console.log(v);
    });
  }

  share() {
    let counter = 0;
    const notShared = new Observable(observer => {
      console.log('Counter: ', counter);
      counter++;
      observer.next(123);
    });

    const shared = notShared.pipe(share());

    notShared.subscribe(() => {
    });
    notShared.subscribe(() => {
    });
  }
}
