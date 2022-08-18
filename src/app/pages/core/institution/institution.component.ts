import { Component, OnInit } from '@angular/core';
import { CreateInstitutionDTO, UpdateInstitutionDTO } from '@models/core';
import { InstitutionsHttpService } from '@services/core';

@Component({
  selector: 'institution-component',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss'],
})
export class InstitutionComponent implements OnInit {
  institutions: CreateInstitutionDTO[] = [];
  constructor(private institutionsHttpService: InstitutionsHttpService) {}

  ngOnInit(): void {
    const institutionCreate: CreateInstitutionDTO = {
      addressId: 1,
      stateId: 1,
      acronym: 'test',
      cellphone: 'test132456',
      code: 'test',
      codeSniese: 'test',
      denomination: 'test',
      email: 'test@test.com',
      logo: 'test',
      name: 'test',
      phone: 'test123456',
      shortName: 'test',
      slogan: 'test',
      web: 'test.com',
    };
    const institutionUpdate: UpdateInstitutionDTO = {
      addressId: 2,
      stateId: 1,
      acronym: 'test',
      cellphone: 'test132456',
      code: 'test',
      codeSniese: 'test',
      denomination: 'test',
      email: 'test@test.com',
      logo: 'test',
      name: 'test',
      phone: 'test123456',
      shortName: 'test',
      slogan: 'test',
      web: 'test.com',
    };
    // this.createInstitution(institutionCreate);
    // this.findAllInstitutions();
    // this.findOneInstitution(2);
    // this.updateInstitution(2, institutionUpdate);
    // this.removeInstitution(1);
  }

  createInstitution(institution: CreateInstitutionDTO): void {
    this.institutionsHttpService
      .create(institution)
      .subscribe((institution) => console.log(institution));
  }
  findAllInstitutions(): void {
    this.institutionsHttpService.findAll().subscribe((institutions) => {
      this.institutions = institutions;
    });
  }
  findOneInstitution(id: number): void {
    this.institutionsHttpService
      .findOne(id)
      .subscribe((institution) => console.log(institution));
  }
  updateInstitution(id: number, institution: UpdateInstitutionDTO): void {
    this.institutionsHttpService
      .update(id, institution)
      .subscribe((institution) => console.log(institution));
  }
  removeInstitution(id: number): void {
    this.institutionsHttpService
      .remove(id)
      .subscribe((institution) => console.log(institution));
  }
}
