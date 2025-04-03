import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Logging Interceptor
 *
 * This interceptor intercepts outgoing HTTP requests and conditionally adds an Authorization header
 * if a valid authentication token is present. It uses Angular's dependency injection to retrieve an instance
 * of AuthService and then obtains the current auth token via getAuthToken().
 *
 * The interceptor performs the following steps:
 * 1. It checks if the request URL includes '/authenticate' or if no auth token exists.
 *    - If either condition is true, it forwards the original request unmodified.
 * 2. Otherwise, it clones the original request and appends an 'Authorization' header with the bearer token.
 * 3. The modified request is then forwarded to the next handler.
 *
 * @param req - The outgoing HTTP request.
 * @param next - The next handler function to process the request.
 * @returns An Observable that emits HTTP events.
*/

export function loggingInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const authService = inject(AuthService);
    const authToken = authService.getAuthToken();

    if (req.url.includes('/authenticate') || !authToken) {
        return next(req);
    }

    const newReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${authToken}`)
    });

    return next(newReq);
}
