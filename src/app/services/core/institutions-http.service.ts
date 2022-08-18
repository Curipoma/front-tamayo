import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import {
  CreateInstitutionDTO,
  InstitutionModel,
  PaginatorModel,
  UpdateInstitutionDTO,
} from '@models/core';
import { ServerResponse } from '@models/http-response';
import { MessageService, CoreService } from '@services/core';

@Injectable({
  providedIn: 'root',
})
export class InstitutionsHttpService {
  API_URL = `${environment.API_URL}/institutions`;
  private pagination = new BehaviorSubject<PaginatorModel>(
    this.coreService.paginator
  );
  public pagination$ = this.pagination.asObservable();

  constructor(
    private httpClient: HttpClient,
    private coreService: CoreService,
    private messageService: MessageService
  ) {}

  create(payload: CreateInstitutionDTO): Observable<InstitutionModel> {
    const url = `${this.API_URL}`;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }
  findAll(
    page: number = 0,
    search: string = ''
  ): Observable<InstitutionModel[]> {
    const url = this.API_URL;
    const headers = new HttpHeaders().append('pagination', 'true');
    const params = new HttpParams()
      .append('page', page)
      .append('search', search);

    this.coreService.showLoad();
    return this.httpClient.get<ServerResponse>(url, { headers, params }).pipe(
      map((response) => {
        this.coreService.hideLoad();
        if (response.data.pagination) {
          this.pagination.next(response.data.pagination);
        }
        return response.data.data;
      })
    );
  }
  findOne(id: number): Observable<InstitutionModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient
      .get<ServerResponse>(url)
      .pipe(map((response) => response.data));
  }
  update(id: number, data: UpdateInstitutionDTO): Observable<InstitutionModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<ServerResponse>(url, data).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }
  remove(id: number): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  removeAll(users: InstitutionModel[]): Observable<InstitutionModel[]> {
    const url = `${this.API_URL}/remove-all`;
    return this.httpClient.patch<ServerResponse>(url, users).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }
}
