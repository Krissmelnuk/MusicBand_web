import { Observable, Subscription } from 'rxjs'

export function onEmit<T> (source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error)
}
