import { __rest } from "tslib";
import { InjectionToken, VERSION } from '@angular/core';
import { Auth0Client } from '@auth0/auth0-spa-js';
import useragent from '../useragent';
export class Auth0ClientFactory {
    static createClient(configFactory) {
        const config = configFactory.get();
        if (!config) {
            throw new Error('Configuration must be specified either through AuthModule.forRoot or through AuthClientConfig.set');
        }
        const { redirectUri, clientId, maxAge, httpInterceptor } = config, rest = __rest(config, ["redirectUri", "clientId", "maxAge", "httpInterceptor"]);
        return new Auth0Client(Object.assign(Object.assign({ redirect_uri: redirectUri || window.location.origin, client_id: clientId, max_age: maxAge }, rest), { auth0Client: {
                name: useragent.name,
                version: useragent.version,
                env: {
                    'angular/core': VERSION.full,
                },
            } }));
    }
}
export const Auth0ClientService = new InjectionToken('auth0.client');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hdXRoMC1hbmd1bGFyL3NyYy9saWIvYXV0aC5jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVsRCxPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUM7QUFFckMsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLGFBQStCO1FBQ2pELE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDYixtR0FBbUcsQ0FDcEcsQ0FBQztTQUNIO1FBRUQsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGVBQWUsS0FBYyxNQUFNLEVBQWYsSUFBSSxVQUFLLE1BQU0sRUFBcEUsd0RBQTJELENBQVMsQ0FBQztRQUUzRSxPQUFPLElBQUksV0FBVywrQkFDcEIsWUFBWSxFQUFFLFdBQVcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFDbkQsU0FBUyxFQUFFLFFBQVEsRUFDbkIsT0FBTyxFQUFFLE1BQU0sSUFDWixJQUFJLEtBQ1AsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtnQkFDcEIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO2dCQUMxQixHQUFHLEVBQUU7b0JBQ0gsY0FBYyxFQUFFLE9BQU8sQ0FBQyxJQUFJO2lCQUM3QjthQUNGLElBQ0QsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLElBQUksY0FBYyxDQUNsRCxjQUFjLENBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuLCBWRVJTSU9OIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoMENsaWVudCB9IGZyb20gJ0BhdXRoMC9hdXRoMC1zcGEtanMnO1xuaW1wb3J0IHsgQXV0aENsaWVudENvbmZpZyB9IGZyb20gJy4vYXV0aC5jb25maWcnO1xuaW1wb3J0IHVzZXJhZ2VudCBmcm9tICcuLi91c2VyYWdlbnQnO1xuXG5leHBvcnQgY2xhc3MgQXV0aDBDbGllbnRGYWN0b3J5IHtcbiAgc3RhdGljIGNyZWF0ZUNsaWVudChjb25maWdGYWN0b3J5OiBBdXRoQ2xpZW50Q29uZmlnKTogQXV0aDBDbGllbnQge1xuICAgIGNvbnN0IGNvbmZpZyA9IGNvbmZpZ0ZhY3RvcnkuZ2V0KCk7XG5cbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ29uZmlndXJhdGlvbiBtdXN0IGJlIHNwZWNpZmllZCBlaXRoZXIgdGhyb3VnaCBBdXRoTW9kdWxlLmZvclJvb3Qgb3IgdGhyb3VnaCBBdXRoQ2xpZW50Q29uZmlnLnNldCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgeyByZWRpcmVjdFVyaSwgY2xpZW50SWQsIG1heEFnZSwgaHR0cEludGVyY2VwdG9yLCAuLi5yZXN0IH0gPSBjb25maWc7XG5cbiAgICByZXR1cm4gbmV3IEF1dGgwQ2xpZW50KHtcbiAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmkgfHwgd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICBtYXhfYWdlOiBtYXhBZ2UsXG4gICAgICAuLi5yZXN0LFxuICAgICAgYXV0aDBDbGllbnQ6IHtcbiAgICAgICAgbmFtZTogdXNlcmFnZW50Lm5hbWUsXG4gICAgICAgIHZlcnNpb246IHVzZXJhZ2VudC52ZXJzaW9uLFxuICAgICAgICBlbnY6IHtcbiAgICAgICAgICAnYW5ndWxhci9jb3JlJzogVkVSU0lPTi5mdWxsLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQXV0aDBDbGllbnRTZXJ2aWNlID0gbmV3IEluamVjdGlvblRva2VuPEF1dGgwQ2xpZW50PihcbiAgJ2F1dGgwLmNsaWVudCdcbik7XG4iXX0=