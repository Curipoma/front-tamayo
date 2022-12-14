import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto, UserModel } from '@models/auth';
import { map } from 'rxjs/operators';
import { ServerResponse } from '@models/http-response';
import { CoreService, MessageService } from '@services/core';
import { PaginatorModel } from '@models/core';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  API_URL = `${environment.API_URL}/users`;
  private pagination = new BehaviorSubject<PaginatorModel>(
    this.coreService.paginator
  );
  public pagination$ = this.pagination.asObservable();

  constructor(
    private httpClient: HttpClient,
    private coreService: CoreService,
    private messageService: MessageService
  ) {}

  create(payload: CreateUserDto): Observable<UserModel> {
    const url = `${this.API_URL}`;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  findAll(page: number = 0, search: string = ''): Observable<UserModel[]> {
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

  findOne(id: number): Observable<UserModel> {
    const url = `${this.API_URL}/${id}`;
    this.coreService.showLoad();
    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        this.coreService.hideLoad();
        return response.data;
      })
    );
  }

  update(id: number, payload: UpdateUserDto): Observable<UserModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  remove(id: number): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    this.coreService.showLoad();
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.coreService.hideLoad();
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  removeAll(users: UserModel[]): Observable<UserModel[]> {
    const url = `${this.API_URL}/remove-all`;
    return this.httpClient.patch<ServerResponse>(url, users).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }
}
