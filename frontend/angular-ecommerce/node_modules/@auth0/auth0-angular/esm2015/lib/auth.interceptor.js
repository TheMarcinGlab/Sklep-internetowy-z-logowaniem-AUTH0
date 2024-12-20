import { from, of, iif, throwError } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { isHttpInterceptorRouteConfig, } from './auth.config';
import { switchMap, first, concatMap, pluck, catchError, tap, } from 'rxjs/operators';
import { Auth0ClientService } from './auth.client';
import * as i0 from "@angular/core";
import * as i1 from "./auth.config";
import * as i2 from "./auth.state";
import * as i3 from "@auth0/auth0-spa-js";
export class AuthHttpInterceptor {
    constructor(configFactory, auth0Client, authState) {
        this.configFactory = configFactory;
        this.auth0Client = auth0Client;
        this.authState = authState;
    }
    intercept(req, next) {
        var _a;
        const config = this.configFactory.get();
        if (!((_a = config.httpInterceptor) === null || _a === void 0 ? void 0 : _a.allowedList)) {
            return next.handle(req);
        }
        return this.findMatchingRoute(req, config.httpInterceptor).pipe(concatMap((route) => iif(
        // Check if a route was matched
        () => route !== null, 
        // If we have a matching route, call getTokenSilently and attach the token to the
        // outgoing request
        of(route).pipe(pluck('tokenOptions'), concatMap((options) => {
            return this.getAccessTokenSilently(options).pipe(catchError((err) => {
                if (this.allowAnonymous(route, err)) {
                    return of('');
                }
                this.authState.setError(err);
                return throwError(err);
            }));
        }), switchMap((token) => {
            // Clone the request and attach the bearer token
            const clone = token
                ? req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`),
                })
                : req;
            return next.handle(clone);
        })), 
        // If the URI being called was not found in our httpInterceptor config, simply
        // pass the request through without attaching a token
        next.handle(req))));
    }
    /**
     * Duplicate of AuthService.getAccessTokenSilently, but with a slightly different error handling.
     * Only used internally in the interceptor.
     * @param options The options for configuring the token fetch.
     */
    getAccessTokenSilently(options) {
        return of(this.auth0Client).pipe(concatMap((client) => client.getTokenSilently(options)), tap((token) => this.authState.setAccessToken(token)), catchError((error) => {
            this.authState.refresh();
            return throwError(error);
        }));
    }
    /**
     * Strips the query and fragment from the given uri
     * @param uri The uri to remove the query and fragment from
     */
    stripQueryFrom(uri) {
        if (uri.indexOf('?') > -1) {
            uri = uri.substr(0, uri.indexOf('?'));
        }
        if (uri.indexOf('#') > -1) {
            uri = uri.substr(0, uri.indexOf('#'));
        }
        return uri;
    }
    /**
     * Determines whether the specified route can have an access token attached to it, based on matching the HTTP request against
     * the interceptor route configuration.
     * @param route The route to test
     * @param request The HTTP request
     */
    canAttachToken(route, request) {
        const testPrimitive = (value) => {
            if (!value) {
                return false;
            }
            const requestPath = this.stripQueryFrom(request.url);
            if (value === requestPath) {
                return true;
            }
            // If the URL ends with an asterisk, match using startsWith.
            return (value.indexOf('*') === value.length - 1 &&
                request.url.startsWith(value.substr(0, value.length - 1)));
        };
        if (isHttpInterceptorRouteConfig(route)) {
            if (route.httpMethod && route.httpMethod !== request.method) {
                return false;
            }
            /* istanbul ignore if */
            if (!route.uri && !route.uriMatcher) {
                console.warn('Either a uri or uriMatcher is required when configuring the HTTP interceptor.');
            }
            return route.uriMatcher
                ? route.uriMatcher(request.url)
                : testPrimitive(route.uri);
        }
        return testPrimitive(route);
    }
    /**
     * Tries to match a route from the SDK configuration to the HTTP request.
     * If a match is found, the route configuration is returned.
     * @param request The Http request
     * @param config HttpInterceptorConfig
     */
    findMatchingRoute(request, config) {
        return from(config.allowedList).pipe(first((route) => this.canAttachToken(route, request), null));
    }
    allowAnonymous(route, err) {
        return (!!route &&
            isHttpInterceptorRouteConfig(route) &&
            !!route.allowAnonymous &&
            ['login_required', 'consent_required'].includes(err.error));
    }
}
AuthHttpInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthHttpInterceptor, deps: [{ token: i1.AuthClientConfig }, { token: Auth0ClientService }, { token: i2.AuthState }], target: i0.ɵɵFactoryTarget.Injectable });
AuthHttpInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthHttpInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthHttpInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AuthClientConfig }, { type: i3.Auth0Client, decorators: [{
                    type: Inject,
                    args: [Auth0ClientService]
                }] }, { type: i2.AuthState }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgwLWFuZ3VsYXIvc3JjL2xpYi9hdXRoLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBYyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUVMLDRCQUE0QixHQUc3QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSW5ELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDVSxhQUErQixFQUNILFdBQXdCLEVBQ3BELFNBQW9CO1FBRnBCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUNILGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3BELGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDM0IsQ0FBQztJQUVKLFNBQVMsQ0FDUCxHQUFxQixFQUNyQixJQUFpQjs7UUFFakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxlQUFlLDBDQUFFLFdBQVcsQ0FBQSxFQUFFO1lBQ3hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUVELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUM3RCxT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LElBQUksQ0FDbEMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FDNUQsQ0FBQztJQUNKLENBQUM7SUFFTyxjQUFjLENBQUMsS0FBZ0MsRUFBRSxHQUFRO1FBQy9ELE9BQU8sQ0FDTCxDQUFDLENBQUMsS0FBSztZQUNQLDRCQUE0QixDQUFDLEtBQUssQ0FBQztZQUNuQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWM7WUFDdEIsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQzNELENBQUM7SUFDSixDQUFDOztpSEFyS1UsbUJBQW1CLGtEQUdwQixrQkFBa0I7cUhBSGpCLG1CQUFtQjs0RkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVOzswQkFJTixNQUFNOzJCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwRXZlbnQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSwgb2YsIGlpZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFwaVJvdXRlRGVmaW5pdGlvbixcbiAgaXNIdHRwSW50ZXJjZXB0b3JSb3V0ZUNvbmZpZyxcbiAgQXV0aENsaWVudENvbmZpZyxcbiAgSHR0cEludGVyY2VwdG9yQ29uZmlnLFxufSBmcm9tICcuL2F1dGguY29uZmlnJztcblxuaW1wb3J0IHtcbiAgc3dpdGNoTWFwLFxuICBmaXJzdCxcbiAgY29uY2F0TWFwLFxuICBwbHVjayxcbiAgY2F0Y2hFcnJvcixcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBdXRoMENsaWVudCwgR2V0VG9rZW5TaWxlbnRseU9wdGlvbnMgfSBmcm9tICdAYXV0aDAvYXV0aDAtc3BhLWpzJztcbmltcG9ydCB7IEF1dGgwQ2xpZW50U2VydmljZSB9IGZyb20gJy4vYXV0aC5jbGllbnQnO1xuaW1wb3J0IHsgQXV0aFN0YXRlIH0gZnJvbSAnLi9hdXRoLnN0YXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhIdHRwSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZ0ZhY3Rvcnk6IEF1dGhDbGllbnRDb25maWcsXG4gICAgQEluamVjdChBdXRoMENsaWVudFNlcnZpY2UpIHByaXZhdGUgYXV0aDBDbGllbnQ6IEF1dGgwQ2xpZW50LFxuICAgIHByaXZhdGUgYXV0aFN0YXRlOiBBdXRoU3RhdGVcbiAgKSB7fVxuXG4gIGludGVyY2VwdChcbiAgICByZXE6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnRmFjdG9yeS5nZXQoKTtcbiAgICBpZiAoIWNvbmZpZy5odHRwSW50ZXJjZXB0b3I/LmFsbG93ZWRMaXN0KSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5maW5kTWF0Y2hpbmdSb3V0ZShyZXEsIGNvbmZpZy5odHRwSW50ZXJjZXB0b3IpLnBpcGUoXG4gICAgICBjb25jYXRNYXAoKHJvdXRlKSA9PlxuICAgICAgICBpaWYoXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgYSByb3V0ZSB3YXMgbWF0Y2hlZFxuICAgICAgICAgICgpID0+IHJvdXRlICE9PSBudWxsLFxuICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBtYXRjaGluZyByb3V0ZSwgY2FsbCBnZXRUb2tlblNpbGVudGx5IGFuZCBhdHRhY2ggdGhlIHRva2VuIHRvIHRoZVxuICAgICAgICAgIC8vIG91dGdvaW5nIHJlcXVlc3RcbiAgICAgICAgICBvZihyb3V0ZSkucGlwZShcbiAgICAgICAgICAgIHBsdWNrKCd0b2tlbk9wdGlvbnMnKSxcbiAgICAgICAgICAgIGNvbmNhdE1hcDxHZXRUb2tlblNpbGVudGx5T3B0aW9ucywgT2JzZXJ2YWJsZTxzdHJpbmc+PihcbiAgICAgICAgICAgICAgKG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBY2Nlc3NUb2tlblNpbGVudGx5KG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxsb3dBbm9ueW1vdXMocm91dGUsIGVycikpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoU3RhdGUuc2V0RXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCgodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAvLyBDbG9uZSB0aGUgcmVxdWVzdCBhbmQgYXR0YWNoIHRoZSBiZWFyZXIgdG9rZW5cbiAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSB0b2tlblxuICAgICAgICAgICAgICAgID8gcmVxLmNsb25lKHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICBgQmVhcmVyICR7dG9rZW59YFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICA6IHJlcTtcblxuICAgICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUoY2xvbmUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgICAgIC8vIElmIHRoZSBVUkkgYmVpbmcgY2FsbGVkIHdhcyBub3QgZm91bmQgaW4gb3VyIGh0dHBJbnRlcmNlcHRvciBjb25maWcsIHNpbXBseVxuICAgICAgICAgIC8vIHBhc3MgdGhlIHJlcXVlc3QgdGhyb3VnaCB3aXRob3V0IGF0dGFjaGluZyBhIHRva2VuXG4gICAgICAgICAgbmV4dC5oYW5kbGUocmVxKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEdXBsaWNhdGUgb2YgQXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW5TaWxlbnRseSwgYnV0IHdpdGggYSBzbGlnaHRseSBkaWZmZXJlbnQgZXJyb3IgaGFuZGxpbmcuXG4gICAqIE9ubHkgdXNlZCBpbnRlcm5hbGx5IGluIHRoZSBpbnRlcmNlcHRvci5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIGNvbmZpZ3VyaW5nIHRoZSB0b2tlbiBmZXRjaC5cbiAgICovXG4gIHByaXZhdGUgZ2V0QWNjZXNzVG9rZW5TaWxlbnRseShcbiAgICBvcHRpb25zPzogR2V0VG9rZW5TaWxlbnRseU9wdGlvbnNcbiAgKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gb2YodGhpcy5hdXRoMENsaWVudCkucGlwZShcbiAgICAgIGNvbmNhdE1hcCgoY2xpZW50KSA9PiBjbGllbnQuZ2V0VG9rZW5TaWxlbnRseShvcHRpb25zKSksXG4gICAgICB0YXAoKHRva2VuKSA9PiB0aGlzLmF1dGhTdGF0ZS5zZXRBY2Nlc3NUb2tlbih0b2tlbikpLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5hdXRoU3RhdGUucmVmcmVzaCgpO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3RyaXBzIHRoZSBxdWVyeSBhbmQgZnJhZ21lbnQgZnJvbSB0aGUgZ2l2ZW4gdXJpXG4gICAqIEBwYXJhbSB1cmkgVGhlIHVyaSB0byByZW1vdmUgdGhlIHF1ZXJ5IGFuZCBmcmFnbWVudCBmcm9tXG4gICAqL1xuICBwcml2YXRlIHN0cmlwUXVlcnlGcm9tKHVyaTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodXJpLmluZGV4T2YoJz8nKSA+IC0xKSB7XG4gICAgICB1cmkgPSB1cmkuc3Vic3RyKDAsIHVyaS5pbmRleE9mKCc/JykpO1xuICAgIH1cblxuICAgIGlmICh1cmkuaW5kZXhPZignIycpID4gLTEpIHtcbiAgICAgIHVyaSA9IHVyaS5zdWJzdHIoMCwgdXJpLmluZGV4T2YoJyMnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVyaTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCByb3V0ZSBjYW4gaGF2ZSBhbiBhY2Nlc3MgdG9rZW4gYXR0YWNoZWQgdG8gaXQsIGJhc2VkIG9uIG1hdGNoaW5nIHRoZSBIVFRQIHJlcXVlc3QgYWdhaW5zdFxuICAgKiB0aGUgaW50ZXJjZXB0b3Igcm91dGUgY29uZmlndXJhdGlvbi5cbiAgICogQHBhcmFtIHJvdXRlIFRoZSByb3V0ZSB0byB0ZXN0XG4gICAqIEBwYXJhbSByZXF1ZXN0IFRoZSBIVFRQIHJlcXVlc3RcbiAgICovXG4gIHByaXZhdGUgY2FuQXR0YWNoVG9rZW4oXG4gICAgcm91dGU6IEFwaVJvdXRlRGVmaW5pdGlvbixcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+XG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRlc3RQcmltaXRpdmUgPSAodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RQYXRoID0gdGhpcy5zdHJpcFF1ZXJ5RnJvbShyZXF1ZXN0LnVybCk7XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gcmVxdWVzdFBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBVUkwgZW5kcyB3aXRoIGFuIGFzdGVyaXNrLCBtYXRjaCB1c2luZyBzdGFydHNXaXRoLlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgdmFsdWUuaW5kZXhPZignKicpID09PSB2YWx1ZS5sZW5ndGggLSAxICYmXG4gICAgICAgIHJlcXVlc3QudXJsLnN0YXJ0c1dpdGgodmFsdWUuc3Vic3RyKDAsIHZhbHVlLmxlbmd0aCAtIDEpKVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgaWYgKGlzSHR0cEludGVyY2VwdG9yUm91dGVDb25maWcocm91dGUpKSB7XG4gICAgICBpZiAocm91dGUuaHR0cE1ldGhvZCAmJiByb3V0ZS5odHRwTWV0aG9kICE9PSByZXF1ZXN0Lm1ldGhvZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFyb3V0ZS51cmkgJiYgIXJvdXRlLnVyaU1hdGNoZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdFaXRoZXIgYSB1cmkgb3IgdXJpTWF0Y2hlciBpcyByZXF1aXJlZCB3aGVuIGNvbmZpZ3VyaW5nIHRoZSBIVFRQIGludGVyY2VwdG9yLidcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvdXRlLnVyaU1hdGNoZXJcbiAgICAgICAgPyByb3V0ZS51cmlNYXRjaGVyKHJlcXVlc3QudXJsKVxuICAgICAgICA6IHRlc3RQcmltaXRpdmUocm91dGUudXJpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGVzdFByaW1pdGl2ZShyb3V0ZSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggYSByb3V0ZSBmcm9tIHRoZSBTREsgY29uZmlndXJhdGlvbiB0byB0aGUgSFRUUCByZXF1ZXN0LlxuICAgKiBJZiBhIG1hdGNoIGlzIGZvdW5kLCB0aGUgcm91dGUgY29uZmlndXJhdGlvbiBpcyByZXR1cm5lZC5cbiAgICogQHBhcmFtIHJlcXVlc3QgVGhlIEh0dHAgcmVxdWVzdFxuICAgKiBAcGFyYW0gY29uZmlnIEh0dHBJbnRlcmNlcHRvckNvbmZpZ1xuICAgKi9cbiAgcHJpdmF0ZSBmaW5kTWF0Y2hpbmdSb3V0ZShcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIGNvbmZpZzogSHR0cEludGVyY2VwdG9yQ29uZmlnXG4gICk6IE9ic2VydmFibGU8QXBpUm91dGVEZWZpbml0aW9uIHwgbnVsbD4ge1xuICAgIHJldHVybiBmcm9tKGNvbmZpZy5hbGxvd2VkTGlzdCkucGlwZShcbiAgICAgIGZpcnN0KChyb3V0ZSkgPT4gdGhpcy5jYW5BdHRhY2hUb2tlbihyb3V0ZSwgcmVxdWVzdCksIG51bGwpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWxsb3dBbm9ueW1vdXMocm91dGU6IEFwaVJvdXRlRGVmaW5pdGlvbiB8IG51bGwsIGVycjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICEhcm91dGUgJiZcbiAgICAgIGlzSHR0cEludGVyY2VwdG9yUm91dGVDb25maWcocm91dGUpICYmXG4gICAgICAhIXJvdXRlLmFsbG93QW5vbnltb3VzICYmXG4gICAgICBbJ2xvZ2luX3JlcXVpcmVkJywgJ2NvbnNlbnRfcmVxdWlyZWQnXS5pbmNsdWRlcyhlcnIuZXJyb3IpXG4gICAgKTtcbiAgfVxufVxuIl19