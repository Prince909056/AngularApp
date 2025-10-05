import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { type IApiResponse } from '../Models/api-response.model';
import { LoaderService } from '../../shared/services/loader.service';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  get<T>(
    endpoint: string,
    params?: any,
    handleError: boolean = true,
    isloaderHide: boolean = true
  ): Observable<IApiResponse<T>> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    const request = this.http.get<IApiResponse<T>>(endpoint, { params: httpParams });
    const requestWithLoaderHide =
      isloaderHide == true
        ? request.pipe(finalize(() => this.loaderService.hide()))
        : request;
    return handleError
      ? requestWithLoaderHide.pipe(catchError((err) => throwError(() => err)))
      : requestWithLoaderHide.pipe(finalize(() => this.loaderService.hide()));
  }

  post<T>(
    endpoint: string,
    body: any,
    handleError: boolean = true,
    isloaderHide: boolean = true,
    headers?: HttpHeaders
  ): Observable<IApiResponse<T>> {
    const options = {
      headers: headers || new HttpHeaders(),
    };
    const request = this.http.post<IApiResponse<T>>(endpoint, body, options);
    const requestWithLoaderHide =
      isloaderHide == true
        ? request.pipe(finalize(() => this.loaderService.hide()))
        : request;
    return handleError
      ? requestWithLoaderHide.pipe(catchError((err) => throwError(() => err)))
      : requestWithLoaderHide.pipe(finalize(() => this.loaderService.hide()));
  }

  delete<T>(
    endpoint: string,
    body: any,
    handleError: boolean = true,
    headers?: HttpHeaders,
    isloaderHide: boolean = true
  ): Observable<IApiResponse<T>> {
    const options = {
      headers: headers || new HttpHeaders(),
      body: body,
    };
    const request = this.http.delete<IApiResponse<T>>(endpoint, options);
    const requestWithLoaderHide =
      isloaderHide == true
        ? request.pipe(finalize(() => this.loaderService.hide()))
        : request;
    return handleError
      ? requestWithLoaderHide.pipe(catchError((err) => throwError(() => err)))
      : requestWithLoaderHide.pipe(finalize(() => this.loaderService.hide()));
  }

  patch<T>(
    endpoint: string,
    body: any = {},
    handleError: boolean = true,
    isloaderHide: boolean = true,
    headers?: HttpHeaders
  ): Observable<IApiResponse<T>> {
    const options = {
      headers: headers || new HttpHeaders(),
    };

    const request = this.http.patch<IApiResponse<T>>(endpoint, body, options);
    const requestWithLoaderHide =
      isloaderHide == true
        ? request.pipe(finalize(() => this.loaderService.hide()))
        : request;
    return handleError
      ? requestWithLoaderHide.pipe(catchError((err) => throwError(() => err)))
      : requestWithLoaderHide.pipe(finalize(() => this.loaderService.hide()));
  }

  postBlob<T>(
    endpoint: string,
    body: any,
    handleError: boolean = true,
    isloaderHide: boolean = true,
    headers?: HttpHeaders
  ): Observable<T> {
    const options = {
      headers: headers || new HttpHeaders(),
      responseType: 'blob' as 'json',
    };
    const request = this.http.post<T>(endpoint, body, options);
    const requestWithLoaderHide =
      isloaderHide == true
        ? request.pipe(finalize(() => this.loaderService.hide()))
        : request;
    return handleError
      ? requestWithLoaderHide.pipe(catchError((err) => throwError(() => err)))
      : requestWithLoaderHide.pipe(finalize(() => this.loaderService.hide()));
  }
}
