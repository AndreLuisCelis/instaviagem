import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  readonly url = 'https://us-central1-rapid-api-321400.cloudfunctions.net/instaviagem-challenge';

  hotels = [];

   getHotels():Observable<any[]>{
   return  this.http.get<any[]>(this.url);
  }
}
