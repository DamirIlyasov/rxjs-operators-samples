import {Component, OnInit} from '@angular/core';
import {combineLatest, concat, from, fromEvent, interval, merge, Observable, of, Subject, timer} from 'rxjs';
import {
  bufferTime,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  scan,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';

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
    // this.catchError();
    // this.tap();
    // this.debounceTime();
    // this.distinctUntilChanged();
    // this.filter();
    // this.take();
    // this.takeUntil();
    // this.share(); НЕ ГОТОВО
    // this.shareReply(); НЕ ГОТОВО
    // this.bufferTime();
    // this.map();
    // this.switchMap();
    // this.mergeMap();
    this.scan();
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
    // Turn an array, promise, or iterable into an observable
    // берёт один объект
    from([{qwe: 'qwe'}]);
    const firstObs = from([1, 2, 3, 4]);
    firstObs.subscribe(value => {
      console.log('Value: ', value);
    });
  }

  of() {
    // Emit variable amount of values in a sequence and then emits a complete notification
    // берёт массив тоже
    // TODO: отличия from от of
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

  debounceTime() {
    const button = document.getElementById('F');
    // fromEvent(source, eventName) - превращает всё это дело в обсервабл
    // интервал между нажатиями > 2с
    const observable = fromEvent(button, 'click').pipe(debounceTime(2000));
    observable.subscribe(() => console.log('hah, not working :('));
  }

  distinctUntilChanged() {
    const observable = of(1, 1, 2, 2, 3, 3, 4, 4);
    observable.pipe(distinctUntilChanged()).subscribe(v => console.log(v));
  }

  filter() {
    const observable = of(1, 1, 2, 2, 3, 3, 4, 4);
    observable.pipe(
      filter(v => v > 2)
    ).subscribe(v => console.log(v));
  }

  take() {
    const observable = of(1, 1, 2, 2, 3, 3, 4, 4).pipe(take(2));
    observable.subscribe(v => console.log(v));
  }

  takeUntil() {
    const timerEmits = timer(5000);
    const observable = interval(1000);

    observable.pipe(
      takeUntil(timerEmits)
    ).subscribe(v => console.log(v));
  }

// TODO: share и shareReply ИЗУЧИТЬ
  // share() {
  //   // блок выполняется при каждой подписке, если не использовать share()
  //   let counter = 0;
  //   const notShared = new Observable(observer => {
  //     console.log('Counter: ', counter);
  //     counter++;
  //     observer.next(1);
  //     observer.next(2);
  //   });
  //
  //   const shared = notShared.pipe(share());
  //
  //   // notShared.subscribe();
  //   // notShared.subscribe();
  //   // notShared.subscribe();
  //
  //   shared.subscribe(v => console.log(v + 'first'));
  //   shared.subscribe(v => console.log(v + 'second'));
  //   shared.subscribe(v => console.log(v + 'third'));
  // }
  //
  // shareReply() {
  //
  // }

  bufferTime() {
    const observable = interval(500).pipe(bufferTime(2000));
    observable.subscribe(v => console.log(v));
  }

  map() {
    const observable = of(1, 2, 3, 4, 5, 6, 7, 8).pipe(map(v => v + 10));
    observable.subscribe(v => console.log(v));
  }

  switchMap() {
    // TODO: придумать нормальное объяснение
    const timerEmits = timer(0, 5000);
    timerEmits.pipe(
      switchMap(() => interval(1000))
    ).subscribe(v => console.log(v));
  }

  mergeMap() {
    // отличие от switchMap - не убивает внутренний обсервабл
    const timerEmits = timer(0, 5000);
    timerEmits.pipe(
      mergeMap(() => interval(1000))
    ).subscribe(v => console.log(v));
  }

  scan() {
    // accumulating previous values

    // const observable = of(1, 2, 3);
    // observable.pipe(
    //   scan((acc, value) => acc + value)
    // ).subscribe(v => console.log(v));


    const observable = new Subject();

    observable.pipe(
      scan((acc, value) => Object.assign(acc, value))
    ).subscribe(v => console.log(v));

    observable.next({name: 'Damir'});
    observable.next({age: 21});
    observable.next({city: 'Kazan'});
  }
}
