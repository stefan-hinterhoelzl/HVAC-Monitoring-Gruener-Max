import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { StateResponse } from '../data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataPollingService {

  private _RESOURCE_URL: string = "https://gruener-max.zainzinger.org/api/"
  
  constructor(private _http: HttpClient) {}

  getStates() {
    return this._http.get(this._RESOURCE_URL).pipe(map(data => data as StateResponse));
  }
}
