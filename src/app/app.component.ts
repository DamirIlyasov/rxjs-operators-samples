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
import {CustomConsole} from './custom-console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  codeMirrorOptions = {lineNumbers: true, theme: 'idea', mode: 'javascript'};

  tapText = `
    const firstObs = of(1, 2, 3);
    firstObs.pipe(
      tap(v => {
        console.log('tap: ', v);
      })
    ).subscribe(v => {
      console.log(v);
    });
  `;

  combineLatestText = `
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
      console.log(\`First: \`, first);
      console.log(\`Second: \`, second);
      console.log(\`Third: \`, third);
    });
  `;

  concatText = `
    const firstObs = of(1, 2, 3);
    const secondObs = of(4, 5, 6);
    const result = concat(firstObs, secondObs);
    result.subscribe(value => {
      console.log(value);
    });
  `;

  mergeText = `
    const firstObs = of(1, 1, 1);
    const secondObs = of(2, 2, 2);
    const merged = merge(firstObs, secondObs);
    merged.subscribe(value => {
      console.log(value);
    });
  `;

  startWithText = `
    const firstObs = of(1, 2, 3);
    const result = firstObs.pipe(startWith(0));
    result.subscribe(value => {
      console.log(value);
    });
  `;

  withLatestFromText = `
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
  `;

  fromText = `
    // Turn an array, promise, or iterable into an observable
    // берёт один объект
    from([{qwe: 'qwe'}]);
    const firstObs = from([1, 2, 3, 4]);
    firstObs.subscribe(value => {
      console.log('Value: ', value);
    });
  `;

  ofText = `
    const object: {
      field1: string,
      field2: number
    } = {
      field1: 'qwe',
      field2: 123
    };

    const obs = of(object, () => {
      console.log('I\`m a function inside observable');
    });
    obs.subscribe(value => {
      console.log(value);
    });
  `;

  catchErrorText = `
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
  `;

  debounceTimeText = `
    const button = document.getElementById('F');
    // fromEvent(source, eventName) - превращает всё это дело в обсервабл
    // интервал между нажатиями > 2с
    const observable = fromEvent(button, 'click').pipe(debounceTime(2000));
    observable.subscribe(() => console.log('hah, not working :('));
  `;

  distinctUntilChangedText = `
    const observable = of(1, 1, 2, 2, 3, 3, 4, 4);
    observable.pipe(distinctUntilChanged()).subscribe(v => console.log(v));
  `;

  filterText = `
    const observable = of(1, 1, 2, 2, 3, 3, 4, 4);
    observable.pipe(
      filter(v => v > 2)
    ).subscribe(v => console.log(v));
  `;

  // this.take();
  // this.takeUntil();
  // this.share(); НЕ ГОТОВО
  // this.shareReply(); НЕ ГОТОВО
  // this.bufferTime();
  // this.map();
  // this.switchMap();
  // this.mergeMap();
  // this.scan();
  ngOnInit(): void {
  }

  combineLatest() {
    const console = new CustomConsole('combineLatestConsole');
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
    const console = new CustomConsole('concatConsole');
    const firstObs = of(1, 2, 3);
    const secondObs = of(4, 5, 6);
    const result = concat(firstObs, secondObs);
    result.subscribe(value => {
      console.log(value);
    });
  }

  merge() {
    const console = new CustomConsole('mergeConsole');
    const firstObs = of(1, 1, 1);
    const secondObs = of(2, 2, 2);
    const merged = merge(firstObs, secondObs);
    merged.subscribe(value => {
      console.log(value);
    });
  }

  startWith() {
    const console = new CustomConsole('startWithConsole');
    const firstObs = of(1, 2, 3);
    const result = firstObs.pipe(startWith(0));
    result.subscribe(value => {
      console.log(value);
    });
  }

  withLatestFrom() {
    const console = new CustomConsole('withLatestFromConsole');
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
    const console = new CustomConsole('fromConsole');
    // Turn an array, promise, or iterable into an observable
    // берёт один объект
    from([{qwe: 'qwe'}]);
    const firstObs = from([1, 2, 3, 4]);
    firstObs.subscribe(value => {
      console.log('Value: ', value);
    });
  }

  of() {
    const console = new CustomConsole('ofConsole');
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
    const console = new CustomConsole('catchErrorConsole');
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
    const console = new CustomConsole('tapConsole');
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
    const console = new CustomConsole('debounceTimeConsole');
    const button = document.getElementById('F');
    // fromEvent(source, eventName) - превращает всё это дело в обсервабл
    // интервал между нажатиями > 2с
    const observable = fromEvent(button, 'click').pipe(debounceTime(2000));
    observable.subscribe(() => console.log('hah, not working :('));
  }

  distinctUntilChanged() {
    const console = new CustomConsole('distinctUntilChangedConsole');
    const observable = of(1, 1, 2, 2, 3, 3, 4, 4);
    observable.pipe(distinctUntilChanged()).subscribe(v => console.log(v));
  }

  filter() {
    const console = new CustomConsole('filterConsole');
    const observable = of(1, 1, 2, 2, 3, 3, 4, 4);
    observable.pipe(
      filter(v => v > 2)
    ).subscribe(v => console.log(v));
  }

  take() {
    const console = new CustomConsole('takeConsole');
    const observable = of(1, 1, 2, 2, 3, 3, 4, 4).pipe(take(2));
    observable.subscribe(v => console.log(v));
  }

  takeUntil() {
    const console = new CustomConsole('takeUntilConsole');
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
    const console = new CustomConsole('bufferTimeConsole');
    const observable = interval(500).pipe(bufferTime(2000));
    observable.subscribe(v => console.log(v));
  }

  map() {
    const console = new CustomConsole('mapConsole');
    const observable = of(1, 2, 3, 4, 5, 6, 7, 8).pipe(map(v => v + 10));
    observable.subscribe(v => console.log(v));
  }

  switchMap() {
    const console = new CustomConsole('switchMapConsole');
    // TODO: придумать нормальное объяснение
    const timerEmits = timer(0, 5000);
    timerEmits.pipe(
      switchMap(() => interval(1000))
    ).subscribe(v => console.log(v));
  }

  mergeMap() {
    const console = new CustomConsole('mergeMapConsole');
    // отличие от switchMap - не убивает внутренний обсервабл
    const timerEmits = timer(0, 5000);
    timerEmits.pipe(
      mergeMap(() => interval(1000))
    ).subscribe(v => console.log(v));
  }

  scan() {
    const console = new CustomConsole('scanConsole');
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

  openInfo(id: string) {
    const console = new CustomConsole('openInfoConsole');
    const element = document.getElementById(id);
    if (element.classList.contains('visible')) {
      element.classList.remove('visible');
    } else {
      element.classList.add('visible');
    }
  }
}
