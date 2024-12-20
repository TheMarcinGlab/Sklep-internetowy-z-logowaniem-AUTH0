import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class AbstractNavigator {
    constructor(location, injector) {
        this.location = location;
        try {
            this.router = injector.get(Router);
        }
        catch (_a) { }
    }
    /**
     * Navigates to the specified url. The router will be used if one is available, otherwise it falls back
     * to `window.history.replaceState`.
     * @param url The url to navigate to
     */
    navigateByUrl(url) {
        if (this.router) {
            this.router.navigateByUrl(url);
            return;
        }
        this.location.replaceState(url);
    }
}
AbstractNavigator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AbstractNavigator, deps: [{ token: i1.Location }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
AbstractNavigator.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AbstractNavigator, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AbstractNavigator, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Location }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtbmF2aWdhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYXV0aDAtYW5ndWxhci9zcmMvbGliL2Fic3RyYWN0LW5hdmlnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBTXpDLE1BQU0sT0FBTyxpQkFBaUI7SUFHNUIsWUFBb0IsUUFBa0IsRUFBRSxRQUFrQjtRQUF0QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ3BDLElBQUk7WUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFBQyxXQUFNLEdBQUU7SUFDWixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGFBQWEsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRS9CLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7OytHQXRCVSxpQkFBaUI7bUhBQWpCLGlCQUFpQixjQUZoQixNQUFNOzRGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFic3RyYWN0TmF2aWdhdG9yIHtcbiAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI/OiBSb3V0ZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJvdXRlciA9IGluamVjdG9yLmdldChSb3V0ZXIpO1xuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIHNwZWNpZmllZCB1cmwuIFRoZSByb3V0ZXIgd2lsbCBiZSB1c2VkIGlmIG9uZSBpcyBhdmFpbGFibGUsIG90aGVyd2lzZSBpdCBmYWxscyBiYWNrXG4gICAqIHRvIGB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGVgLlxuICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdG8gbmF2aWdhdGUgdG9cbiAgICovXG4gIG5hdmlnYXRlQnlVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yb3V0ZXIpIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodXJsKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9jYXRpb24ucmVwbGFjZVN0YXRlKHVybCk7XG4gIH1cbn1cbiJdfQ==