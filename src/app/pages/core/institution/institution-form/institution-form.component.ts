import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CatalogueModel,
  CreateInstitutionDTO,
  UpdateInstitutionDTO,
} from '@models/core';
import {
  CoreService,
  InstitutionsHttpService,
  CataloguesHttpService,
  MessageService,
} from '@services/core';

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution-form.component.scss'],
})
export class InstitutionFormComponent implements OnInit {
  id: number = 0;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  address: CatalogueModel[] = [];
  states: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private institutionsHttpService: InstitutionsHttpService,
    private cataloguesHttpService: CataloguesHttpService,
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private messageService: MessageService,
    private router: Router
  ) {
    if (this.activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = this.activatedRoute.snapshot.params['id'];
    }
  }

  async onExit() {
    if (this.form.touched || this.form.dirty) {
      this.messageService.questionOnExit().then((result) => {
        return result.isConfirmed;
      });
    }
    return true;
  }

  ngOnInit(): void {
    this.loadAdress();
    this.loadStates();
    if (this.id > 0) {
      this.getInstitution();
    } else {
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      addressId: [null, [Validators.required, Validators.min(1)]],
      stateId: [null, [Validators.required, Validators.min(1)]],
      acronym: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      cellphone: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      code: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      codeSniese: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      denomination: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      email: [null, [Validators.email]],
      logo: [null, [Validators.minLength(1)]],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      shortName: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      slogan: [null, [Validators.minLength(1), Validators.maxLength(1000)]],
      web: [null, [Validators.minLength(1)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id > 0) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  back() {
    this.router.navigate(['/core/institutions']);
  }

  create(institution: CreateInstitutionDTO) {
    this.institutionsHttpService
      .create(institution)
      .subscribe(() => this.back());
  }

  getInstitution() {
    this.institutionsHttpService.findOne(this.id).subscribe((institution) => {
      this.form.reset(institution);
    });
  }

  isRequire(control: AbstractControl): boolean {
    return control.hasValidator(Validators.required);
  }

  loadAdress() {
    this.cataloguesHttpService.findAll().subscribe((adress) => {
      this.address = adress;
    });
  }
  loadStates() {
    this.cataloguesHttpService.findAll().subscribe((states) => {
      this.states = states;
    });
  }

  update(institution: UpdateInstitutionDTO) {
    this.institutionsHttpService
      .update(this.id, institution)
      .subscribe(() => this.back());
  }

  get addressFieId() {
    return this.form.controls['addressId'];
  }
  get stateFieId() {
    return this.form.controls['stateId'];
  }
  get acronymField() {
    return this.form.controls['acronym'];
  }
  get cellphoneField() {
    return this.form.controls['cellphone'];
  }
  get codeField() {
    return this.form.controls['code'];
  }
  get codeSnieseField() {
    return this.form.controls['codeSniese'];
  }
  get denominationField() {
    return this.form.controls['denomination'];
  }
  get emailField() {
    return this.form.controls['email'];
  }
  get logoField() {
    return this.form.controls['logo'];
  }
  get nameField() {
    return this.form.controls['name'];
  }
  get phoneField() {
    return this.form.controls['phone'];
  }
  get shortNameField() {
    return this.form.controls['shortName'];
  }
  get sloganField() {
    return this.form.controls['slogan'];
  }
  get webField() {
    return this.form.controls['web'];
  }
}
