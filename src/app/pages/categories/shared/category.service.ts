import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { Observable, throwError } from "rxjs"
import { map, catchError, flatMap } from "rxjs/operators"

import { Category } from './category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]>{
    return this.httpClient.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Category>{
    const url = `${this.apiPath}/${id}`
    return this.httpClient.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  create(category: Category): Observable<Category> {
    return this.httpClient.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`

    return this.httpClient.put(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`

    return this.httpClient.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private handleError(error: any): Observable<any>{
      return throwError(error)
  }

  private jsonDataToCategories(data: any[]): Category[]{
    const categories = []
    data?.forEach(element => categories.push(element))
    return categories
  }

  private jsonDataToCategory(data: any): Category{
    return data as Category;
  }
}
