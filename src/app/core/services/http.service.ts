import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _httpClient: HttpClient) {}

  GET(endpoint?: string, params?: any): Observable<object> {
    const endpointUrl = `${environment.baseURL}/${endpoint}`;
    return this._httpClient.get(endpointUrl, params);
  }

  POST(payload: object, endpoint?: string): Observable<object> {
    const endpointUrl = `${environment.baseURL}/${endpoint}`;
    return this._httpClient.post(endpointUrl, payload);
  }

  DELETE(id?: number, endpoint?: string): Observable<object> {
    const endpointUrl = `${environment.baseURL}/${endpoint}/${id}`;
    return this._httpClient.delete(endpointUrl);
  }

  PUT(payload: object, id?: number, endpoint?: string): Observable<object> {
    const endpointUrl = `${environment.baseURL}/${endpoint}/${id}`;
    return this._httpClient.put(endpointUrl, payload);
  }
}
