import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthConfigService, AuthClientConfig } from './auth.config';
import { Auth0ClientService, Auth0ClientFactory } from './auth.client';
import { AuthGuard } from './auth.guard';
import * as i0 from "@angular/core";
export class AuthModule {
    /**
     * Initialize the authentication module system. Configuration can either be specified here,
     * or by calling AuthClientConfig.set (perhaps from an APP_INITIALIZER factory function).
     * @param config The optional configuration for the SDK.
     */
    static forRoot(config) {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService,
                AuthGuard,
                {
                    provide: AuthConfigService,
                    useValue: config,
                },
                {
                    provide: Auth0ClientService,
                    useFactory: Auth0ClientFactory.createClient,
                    deps: [AuthClientConfig],
                },
            ],
        };
    }
}
AuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthModule });
AuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: AuthModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hdXRoMC1hbmd1bGFyL3NyYy9saWIvYXV0aC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBYyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFHekMsTUFBTSxPQUFPLFVBQVU7SUFDckI7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBbUI7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLFNBQVM7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO29CQUMzQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDekI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzt3R0F2QlUsVUFBVTt5R0FBVixVQUFVO3lHQUFWLFVBQVU7NEZBQVYsVUFBVTtrQkFEdEIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhDb25maWcsIEF1dGhDb25maWdTZXJ2aWNlLCBBdXRoQ2xpZW50Q29uZmlnIH0gZnJvbSAnLi9hdXRoLmNvbmZpZyc7XG5pbXBvcnQgeyBBdXRoMENsaWVudFNlcnZpY2UsIEF1dGgwQ2xpZW50RmFjdG9yeSB9IGZyb20gJy4vYXV0aC5jbGllbnQnO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9hdXRoLmd1YXJkJztcblxuQE5nTW9kdWxlKClcbmV4cG9ydCBjbGFzcyBBdXRoTW9kdWxlIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGF1dGhlbnRpY2F0aW9uIG1vZHVsZSBzeXN0ZW0uIENvbmZpZ3VyYXRpb24gY2FuIGVpdGhlciBiZSBzcGVjaWZpZWQgaGVyZSxcbiAgICogb3IgYnkgY2FsbGluZyBBdXRoQ2xpZW50Q29uZmlnLnNldCAocGVyaGFwcyBmcm9tIGFuIEFQUF9JTklUSUFMSVpFUiBmYWN0b3J5IGZ1bmN0aW9uKS5cbiAgICogQHBhcmFtIGNvbmZpZyBUaGUgb3B0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIFNESy5cbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IEF1dGhDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEF1dGhNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEF1dGhNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQXV0aFNlcnZpY2UsXG4gICAgICAgIEF1dGhHdWFyZCxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEF1dGhDb25maWdTZXJ2aWNlLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBBdXRoMENsaWVudFNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogQXV0aDBDbGllbnRGYWN0b3J5LmNyZWF0ZUNsaWVudCxcbiAgICAgICAgICBkZXBzOiBbQXV0aENsaWVudENvbmZpZ10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==