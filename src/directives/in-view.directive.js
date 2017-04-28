var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { defer, forEach } from 'lodash';
import { TriggerService } from '../services';
const SELECTOR = 'vp-in-view';
let InViewDirective = class InViewDirective {
    constructor(trigger, el) {
        this.trigger = trigger;
        this.el = el;
        this._config = new Config({});
        this.event = new EventEmitter();
    }
    set config(value) {
        forEach(value, (val, key) => {
            this._config[key] = val;
        });
    }
    get config() {
        return this._config;
    }
    ngAfterViewInit() {
        defer(() => {
            this.subs = this.trigger.observable.subscribe(this.handler.bind(this));
            this.handler();
        });
    }
    isInViewPort() {
        var rect = this.el.nativeElement.getBoundingClientRect();
        return (rect.top >= 0 - this._config.marginTop &&
            rect.left >= 0 - this._config.marginLeft &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + this._config.marginBottom &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + this._config.marginRight);
    }
    handler() {
        if (this.isInViewPort()) {
            this.event.emit();
            !this.config.infinite && this.subs.unsubscribe();
        }
    }
};
__decorate([
    Output(SELECTOR),
    __metadata("design:type", Object)
], InViewDirective.prototype, "event", void 0);
__decorate([
    Input(SELECTOR + '-config'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InViewDirective.prototype, "config", null);
InViewDirective = __decorate([
    Directive({
        selector: `[${SELECTOR}]`,
        exportAs: SELECTOR
    }),
    __metadata("design:paramtypes", [TriggerService,
        ElementRef])
], InViewDirective);
export { InViewDirective };
class Config {
    constructor(value) {
        this.marginTop = 0;
        this.marginBottom = 0;
        this.marginLeft = 0;
        this.marginRight = 0;
        this.infinite = false;
        forEach(value, (val, key) => {
            this[key] = val;
        });
    }
    set margin(value) {
        this.marginHorizontal = value;
        this.marginVertical = value;
    }
    set marginVertical(value) {
        this.marginTop = value;
        this.marginBottom = value;
    }
    set marginHorizontal(value) {
        this.marginLeft = value;
        this.marginRight = value;
    }
}
//# sourceMappingURL=in-view.directive.js.map