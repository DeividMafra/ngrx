import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IDish{
  id: number,
  name: string,
  ingredients: string
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getDishes = ():Observable<IDish[]> =>{
    return this.http.get<IDish[]>(`${this.baseUrl}/dishes/`);
  }

  getDishById = (id: number): Observable<IDish> =>{
    return this.http.get<IDish>(`${this.baseUrl}/dishes/${id}`);
  }

  createDish = (dish: IDish): Observable<IDish> =>{
    return this.http.post<IDish>(`${this.baseUrl}/dishes`, dish);
  }

  updateDish = (dish: IDish): Observable<IDish> =>{
    return this.http.put<IDish>(`${this.baseUrl}/dishes/${dish.id}`, dish);
  }

  deleteDish = (id: number): Observable<IDish> =>{
    return this.http.delete<IDish>(`${this.baseUrl}/dishes/${id}`);
  }
}
