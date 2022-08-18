import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnModel, InstitutionModel, PaginatorModel } from '@models/core';
import {
  CoreService,
  InstitutionsHttpService,
  MessageService,
} from '@services/core';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})
export class InstitutionListComponent implements OnInit {
  institutions: InstitutionModel[] = [];
  selectedInstitutions: InstitutionModel[] = [];
  loaded$ = this.coreService.loaded$;
  columns: ColumnModel[];
  pagination$ = this.institutionsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');

  constructor(
    private institutionsHttpService: InstitutionsHttpService,
    private coreService: CoreService,
    public messageService: MessageService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.search.valueChanges.pipe(debounceTime(600)).subscribe((_) => {
      this.findAll();
    });
    this.pagination$.subscribe((pagination) => {
      this.paginator = pagination;
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  create() {
    this.router.navigate(['/core/institutions', 'new']);
  }

  edit(id: number) {
    this.router.navigate(['/core/institutions', id]);
  }

  findAll(page: number = 0) {
    this.institutionsHttpService
      .findAll(page, this.search.value)
      .subscribe((institutions) => {
        this.institutions = institutions;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'address', header: 'address' },
      { field: 'state', header: 'state' },
      { field: 'acronym', header: 'acronym' },
      { field: 'cellphone', header: 'cellphone' },
      { field: 'code', header: 'code' },
      { field: 'codeSniese', header: 'codeSniese' },
      { field: 'denomination', header: 'denomination' },
      { field: 'email', header: 'email' },
      { field: 'logo', header: 'logo' },
      { field: 'name', header: 'name' },
      { field: 'phone', header: 'phone' },
      { field: 'shortName', header: 'shortName' },
      { field: 'slogan', header: 'slogan' },
      { field: 'web', header: 'web' },
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  remove(id: number) {
    this.messageService.questionDelete().then((result: any) => {
      if (result.isConfirmed) {
        this.institutionsHttpService.remove(id).subscribe((flag) => {
          if (flag) {
            this.institutions = this.institutions.filter(
              (institution) => institution.id !== id
            );
          }
        });
      }
    });
  }

  refresh() {
    this.findAll();
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.institutionsHttpService
          .removeAll(this.selectedInstitutions)
          .subscribe((institutions) => {
            this.selectedInstitutions.forEach((institutionDeleted) => {
              this.institutions = this.institutions.filter(
                (institution) => institution.id !== institutionDeleted.id
              );
            });
            this.selectedInstitutions = [];
          });
      }
    });
  }
}
