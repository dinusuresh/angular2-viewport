import { Subject } from 'rxjs';
export function throttler(observable, throttleTime) {
    const subj = new Subject();
    let timeout = false;
    let allowed = true;
    observable.subscribe(e => {
        timeout && clearTimeout(timeout);
        if (allowed) {
            allowed = false;
            subj.next(e);
        }
        timeout = setTimeout(handler, throttleTime);
        function handler() {
            allowed = true;
        }
    });
    return subj.share();
}
//# sourceMappingURL=throttler.js.map