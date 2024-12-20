import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, defer, merge, of, ReplaySubject, Subject, } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, mergeMap, scan, shareReplay, switchMap, } from 'rxjs/operators';
import { Auth0ClientService } from './auth.client';
import * as i0 from "@angular/core";
import * as i1 from "@auth0/auth0-spa-js";
/**
 * Tracks the Authentication State for the SDK
 */
export class AuthState {
    constructor(auth0Client) {
        this.auth0Client = auth0Client;
        this.isLoadingSubject$ = new BehaviorSubject(true);
        this.refresh$ = new Subject();
        this.accessToken$ = new ReplaySubject(1);
        this.errorSubject$ = new ReplaySubject(1);
        /**
         * Emits boolean values indicating the loading state of the SDK.
         */
        this.isLoading$ = this.isLoadingSubject$.asObservable();
        /**
         * Trigger used to pull User information from the Auth0Client.
         * Triggers when the access token has changed.
         */
        this.accessTokenTrigger$ = this.accessToken$.pipe(scan((acc, current) => {
            return {
                previous: acc.current,
                current,
            };
        }, { current: null, previous: null }), filter(({ previous, current }) => previous !== current));
        /**
         * Trigger used to pull User information from the Auth0Client.
         * Triggers when an event occurs that needs to retrigger the User Profile information.
         * Events: Login, Access Token change and Logout
         */
        this.isAuthenticatedTrigger$ = this.isLoading$.pipe(filter((loading) => !loading), distinctUntilChanged(), switchMap(() => 
        // To track the value of isAuthenticated over time, we need to merge:
        //  - the current value
        //  - the value whenever the access token changes. (this should always be true of there is an access token
        //    but it is safer to pass this through this.auth0Client.isAuthenticated() nevertheless)
        //  - the value whenever refreshState$ emits
        merge(defer(() => this.auth0Client.isAuthenticated()), this.accessTokenTrigger$.pipe(mergeMap(() => this.auth0Client.isAuthenticated())), this.refresh$.pipe(mergeMap(() => this.auth0Client.isAuthenticated())))));
        /**
         * Emits boolean values indicating the authentication state of the user. If `true`, it means a user has authenticated.
         * This depends on the value of `isLoading$`, so there is no need to manually check the loading state of the SDK.
         */
        this.isAuthenticated$ = this.isAuthenticatedTrigger$.pipe(distinctUntilChanged(), shareReplay(1));
        /**
         * Emits details about the authenticated user, or null if not authenticated.
         */
        this.user$ = this.isAuthenticatedTrigger$.pipe(concatMap((authenticated) => authenticated ? this.auth0Client.getUser() : of(null)));
        /**
         * Emits ID token claims when authenticated, or null if not authenticated.
         */
        this.idTokenClaims$ = this.isAuthenticatedTrigger$.pipe(concatMap((authenticated) => authenticated ? this.auth0Client.getIdTokenClaims() : of(null)));
        /**
         * Emits errors that occur during login, or when checking for an active session on startup.
         */
        this.error$ = this.errorSubject$.asObservable();
    }
    /**
     * Update the isLoading state using the provided value
     * @param isLoading The new value for isLoading
     */
    setIsLoading(isLoading) {
        this.isLoadingSubject$.next(isLoading);
    }
    /**
     * Refresh the state to ensure the `isAuthenticated`, `user$` and `idTokenClaims$`
     * reflect the most up-to-date values from  Auth0Client.
     */
    refresh() {
        this.refresh$.next();
    }
    /**
     * Update the access token, doing so will also refresh the state.
     * @param accessToken The new Access Token
     */
    setAccessToken(accessToken) {
        this.accessToken$.next(accessToken);
    }
    /**
     * Emits the error in the `error$` observable.
     * @param error The new error
     */
    setError(error) {
        this.errorSubject$.next(error);
    }
}
AuthState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthState, deps: [{ token: Auth0ClientService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthState, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthState, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Auth0Client, decorators: [{
                    type: Inject,
                    args: [Auth0ClientService]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgwLWFuZ3VsYXIvc3JjL2xpYi9hdXRoLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFDTCxlQUFlLEVBQ2YsS0FBSyxFQUNMLEtBQUssRUFDTCxFQUFFLEVBQ0YsYUFBYSxFQUNiLE9BQU8sR0FDUixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixRQUFRLEVBQ1IsSUFBSSxFQUNKLFdBQVcsRUFDWCxTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUVuRDs7R0FFRztBQUVILE1BQU0sT0FBTyxTQUFTO0lBdUZwQixZQUFnRCxXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXRGaEUsc0JBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFDdkQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0IsaUJBQVksR0FBRyxJQUFJLGFBQWEsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1QyxrQkFBYSxHQUFHLElBQUksYUFBYSxDQUFRLENBQUMsQ0FBQyxDQUFDO1FBRXBEOztXQUVHO1FBQ2EsZUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVuRTs7O1dBR0c7UUFDSyx3QkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDbEQsSUFBSSxDQUNGLENBQ0UsR0FBd0QsRUFDeEQsT0FBc0IsRUFDdEIsRUFBRTtZQUNGLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLEdBQUcsQ0FBQyxP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eyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGgwQ2xpZW50IH0gZnJvbSAnQGF1dGgwL2F1dGgwLXNwYS1qcyc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGRlZmVyLFxuICBtZXJnZSxcbiAgb2YsXG4gIFJlcGxheVN1YmplY3QsXG4gIFN1YmplY3QsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY29uY2F0TWFwLFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtZXJnZU1hcCxcbiAgc2NhbixcbiAgc2hhcmVSZXBsYXksXG4gIHN3aXRjaE1hcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXV0aDBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLmNsaWVudCc7XG5cbi8qKlxuICogVHJhY2tzIHRoZSBBdXRoZW50aWNhdGlvbiBTdGF0ZSBmb3IgdGhlIFNES1xuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEF1dGhTdGF0ZSB7XG4gIHByaXZhdGUgaXNMb2FkaW5nU3ViamVjdCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcml2YXRlIHJlZnJlc2gkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBhY2Nlc3NUb2tlbiQgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmc+KDEpO1xuICBwcml2YXRlIGVycm9yU3ViamVjdCQgPSBuZXcgUmVwbGF5U3ViamVjdDxFcnJvcj4oMSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGJvb2xlYW4gdmFsdWVzIGluZGljYXRpbmcgdGhlIGxvYWRpbmcgc3RhdGUgb2YgdGhlIFNESy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBpc0xvYWRpbmckID0gdGhpcy5pc0xvYWRpbmdTdWJqZWN0JC5hc09ic2VydmFibGUoKTtcblxuICAvKipcbiAgICogVHJpZ2dlciB1c2VkIHRvIHB1bGwgVXNlciBpbmZvcm1hdGlvbiBmcm9tIHRoZSBBdXRoMENsaWVudC5cbiAgICogVHJpZ2dlcnMgd2hlbiB0aGUgYWNjZXNzIHRva2VuIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBhY2Nlc3NUb2tlblRyaWdnZXIkID0gdGhpcy5hY2Nlc3NUb2tlbiQucGlwZShcbiAgICBzY2FuKFxuICAgICAgKFxuICAgICAgICBhY2M6IHsgY3VycmVudDogc3RyaW5nIHwgbnVsbDsgcHJldmlvdXM6IHN0cmluZyB8IG51bGwgfSxcbiAgICAgICAgY3VycmVudDogc3RyaW5nIHwgbnVsbFxuICAgICAgKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJldmlvdXM6IGFjYy5jdXJyZW50LFxuICAgICAgICAgIGN1cnJlbnQsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgeyBjdXJyZW50OiBudWxsLCBwcmV2aW91czogbnVsbCB9XG4gICAgKSxcbiAgICBmaWx0ZXIoKHsgcHJldmlvdXMsIGN1cnJlbnQgfSkgPT4gcHJldmlvdXMgIT09IGN1cnJlbnQpXG4gICk7XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgdXNlZCB0byBwdWxsIFVzZXIgaW5mb3JtYXRpb24gZnJvbSB0aGUgQXV0aDBDbGllbnQuXG4gICAqIFRyaWdnZXJzIHdoZW4gYW4gZXZlbnQgb2NjdXJzIHRoYXQgbmVlZHMgdG8gcmV0cmlnZ2VyIHRoZSBVc2VyIFByb2ZpbGUgaW5mb3JtYXRpb24uXG4gICAqIEV2ZW50czogTG9naW4sIEFjY2VzcyBUb2tlbiBjaGFuZ2UgYW5kIExvZ291dFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBpc0F1dGhlbnRpY2F0ZWRUcmlnZ2VyJCA9IHRoaXMuaXNMb2FkaW5nJC5waXBlKFxuICAgIGZpbHRlcigobG9hZGluZykgPT4gIWxvYWRpbmcpLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAvLyBUbyB0cmFjayB0aGUgdmFsdWUgb2YgaXNBdXRoZW50aWNhdGVkIG92ZXIgdGltZSwgd2UgbmVlZCB0byBtZXJnZTpcbiAgICAgIC8vICAtIHRoZSBjdXJyZW50IHZhbHVlXG4gICAgICAvLyAgLSB0aGUgdmFsdWUgd2hlbmV2ZXIgdGhlIGFjY2VzcyB0b2tlbiBjaGFuZ2VzLiAodGhpcyBzaG91bGQgYWx3YXlzIGJlIHRydWUgb2YgdGhlcmUgaXMgYW4gYWNjZXNzIHRva2VuXG4gICAgICAvLyAgICBidXQgaXQgaXMgc2FmZXIgdG8gcGFzcyB0aGlzIHRocm91Z2ggdGhpcy5hdXRoMENsaWVudC5pc0F1dGhlbnRpY2F0ZWQoKSBuZXZlcnRoZWxlc3MpXG4gICAgICAvLyAgLSB0aGUgdmFsdWUgd2hlbmV2ZXIgcmVmcmVzaFN0YXRlJCBlbWl0c1xuICAgICAgbWVyZ2UoXG4gICAgICAgIGRlZmVyKCgpID0+IHRoaXMuYXV0aDBDbGllbnQuaXNBdXRoZW50aWNhdGVkKCkpLFxuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuVHJpZ2dlciQucGlwZShcbiAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB0aGlzLmF1dGgwQ2xpZW50LmlzQXV0aGVudGljYXRlZCgpKVxuICAgICAgICApLFxuICAgICAgICB0aGlzLnJlZnJlc2gkLnBpcGUobWVyZ2VNYXAoKCkgPT4gdGhpcy5hdXRoMENsaWVudC5pc0F1dGhlbnRpY2F0ZWQoKSkpXG4gICAgICApXG4gICAgKVxuICApO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBib29sZWFuIHZhbHVlcyBpbmRpY2F0aW5nIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSBvZiB0aGUgdXNlci4gSWYgYHRydWVgLCBpdCBtZWFucyBhIHVzZXIgaGFzIGF1dGhlbnRpY2F0ZWQuXG4gICAqIFRoaXMgZGVwZW5kcyBvbiB0aGUgdmFsdWUgb2YgYGlzTG9hZGluZyRgLCBzbyB0aGVyZSBpcyBubyBuZWVkIHRvIG1hbnVhbGx5IGNoZWNrIHRoZSBsb2FkaW5nIHN0YXRlIG9mIHRoZSBTREsuXG4gICAqL1xuICByZWFkb25seSBpc0F1dGhlbnRpY2F0ZWQkID0gdGhpcy5pc0F1dGhlbnRpY2F0ZWRUcmlnZ2VyJC5waXBlKFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgc2hhcmVSZXBsYXkoMSlcbiAgKTtcblxuICAvKipcbiAgICogRW1pdHMgZGV0YWlscyBhYm91dCB0aGUgYXV0aGVudGljYXRlZCB1c2VyLCBvciBudWxsIGlmIG5vdCBhdXRoZW50aWNhdGVkLlxuICAgKi9cbiAgcmVhZG9ubHkgdXNlciQgPSB0aGlzLmlzQXV0aGVudGljYXRlZFRyaWdnZXIkLnBpcGUoXG4gICAgY29uY2F0TWFwKChhdXRoZW50aWNhdGVkKSA9PlxuICAgICAgYXV0aGVudGljYXRlZCA/IHRoaXMuYXV0aDBDbGllbnQuZ2V0VXNlcigpIDogb2YobnVsbClcbiAgICApXG4gICk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIElEIHRva2VuIGNsYWltcyB3aGVuIGF1dGhlbnRpY2F0ZWQsIG9yIG51bGwgaWYgbm90IGF1dGhlbnRpY2F0ZWQuXG4gICAqL1xuICByZWFkb25seSBpZFRva2VuQ2xhaW1zJCA9IHRoaXMuaXNBdXRoZW50aWNhdGVkVHJpZ2dlciQucGlwZShcbiAgICBjb25jYXRNYXAoKGF1dGhlbnRpY2F0ZWQpID0+XG4gICAgICBhdXRoZW50aWNhdGVkID8gdGhpcy5hdXRoMENsaWVudC5nZXRJZFRva2VuQ2xhaW1zKCkgOiBvZihudWxsKVxuICAgIClcbiAgKTtcblxuICAvKipcbiAgICogRW1pdHMgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIGxvZ2luLCBvciB3aGVuIGNoZWNraW5nIGZvciBhbiBhY3RpdmUgc2Vzc2lvbiBvbiBzdGFydHVwLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGVycm9yJCA9IHRoaXMuZXJyb3JTdWJqZWN0JC5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEF1dGgwQ2xpZW50U2VydmljZSkgcHJpdmF0ZSBhdXRoMENsaWVudDogQXV0aDBDbGllbnQpIHt9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgaXNMb2FkaW5nIHN0YXRlIHVzaW5nIHRoZSBwcm92aWRlZCB2YWx1ZVxuICAgKiBAcGFyYW0gaXNMb2FkaW5nIFRoZSBuZXcgdmFsdWUgZm9yIGlzTG9hZGluZ1xuICAgKi9cbiAgcHVibGljIHNldElzTG9hZGluZyhpc0xvYWRpbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzTG9hZGluZ1N1YmplY3QkLm5leHQoaXNMb2FkaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIHRoZSBzdGF0ZSB0byBlbnN1cmUgdGhlIGBpc0F1dGhlbnRpY2F0ZWRgLCBgdXNlciRgIGFuZCBgaWRUb2tlbkNsYWltcyRgXG4gICAqIHJlZmxlY3QgdGhlIG1vc3QgdXAtdG8tZGF0ZSB2YWx1ZXMgZnJvbSAgQXV0aDBDbGllbnQuXG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZnJlc2gkLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGFjY2VzcyB0b2tlbiwgZG9pbmcgc28gd2lsbCBhbHNvIHJlZnJlc2ggdGhlIHN0YXRlLlxuICAgKiBAcGFyYW0gYWNjZXNzVG9rZW4gVGhlIG5ldyBBY2Nlc3MgVG9rZW5cbiAgICovXG4gIHB1YmxpYyBzZXRBY2Nlc3NUb2tlbihhY2Nlc3NUb2tlbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbiQubmV4dChhY2Nlc3NUb2tlbik7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgdGhlIGVycm9yIGluIHRoZSBgZXJyb3IkYCBvYnNlcnZhYmxlLlxuICAgKiBAcGFyYW0gZXJyb3IgVGhlIG5ldyBlcnJvclxuICAgKi9cbiAgcHVibGljIHNldEVycm9yKGVycm9yOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9yU3ViamVjdCQubmV4dChlcnJvcik7XG4gIH1cbn1cbiJdfQ==