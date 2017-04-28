var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input } from '@angular/core';
import { ScrollService } from '../services';
let ScrollableContentDirective = class ScrollableContentDirective {
    constructor(el, scroll) {
        this.el = el;
        this.scroll = scroll;
        this.scrollTargets = [];
    }
    ngAfterViewInit() {
        if (this.targetSelector) {
            const list = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll(this.targetSelector));
            this.scrollTargets.push(...list);
            !list.length && this.scrollTargets.push(this.el.nativeElement);
        }
        else {
            this.scrollTargets.push(this.el.nativeElement);
        }
        this.scrollTargets.forEach(el => {
            this.scroll.bind(el);
        });
    }
    ngOnDestroy() {
        this.scrollTargets.forEach(el => {
            this.scroll.unbind(el);
        });
    }
};
__decorate([
    Input('vp-scrollable-content'),
    __metadata("design:type", String)
], ScrollableContentDirective.prototype, "targetSelector", void 0);
ScrollableContentDirective = __decorate([
    Directive({
        selector: '[vp-scrollable-content]'
    }),
    __metadata("design:paramtypes", [ElementRef,
        ScrollService])
], ScrollableContentDirective);
export { ScrollableContentDirective };
//# sourceMappingURL=scrollable-content.directive.js.map