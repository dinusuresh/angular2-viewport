var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { throttler } from '../helpers';
const BUFFER_TIME = 100;
const DEBOUNCE_TIME = 180;
const THROTTLE_TIME = 180;
let ScrollService = ScrollService_1 = class ScrollService {
    constructor() {
        this._subj = new Subject();
        this.boundSet = new Set();
        this.handler = ScrollService_1._handler.bind(this);
        this.onScroll = this._subj.throttleTime(BUFFER_TIME).share();
        this.onScrollEnd = this._subj.debounceTime(DEBOUNCE_TIME).share();
        this.onScrollStart = throttler(this._subj, THROTTLE_TIME);
        this.bind(window);
    }
    /**
     * Binds its listener to the event target
     * to trigger checking position of in-view directive
     * or for emiting its scroll events
     *
     * Returns the unbinding function
     */
    bind(target) {
        if (!this.boundSet.has(target)) {
            target.addEventListener('scroll', this.handler);
            this.boundSet.add(target);
        }
        return this.unbind.bind(this, target);
    }
    /**
     * Removes its listener from the target
     */
    unbind(target) {
        this.boundSet.delete(target);
        target.removeEventListener('scroll', this.handler);
    }
    static _handler(e) {
        this._subj.next(e);
    }
};
ScrollService = ScrollService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ScrollService);
export { ScrollService };
var ScrollService_1;
//# sourceMappingURL=scroll.service.js.map