import { CatalogueModel } from './catalogue.model';

export interface InstitutionModel {
  id: number;
  addressId: number;
  stateId: number;
  acronym: string;
  cellphone: string;
  code: string;
  codeSniese: string;
  denomination: string;
  email: string;
  logo: string;
  name: string;
  phone: string;
  shortName: string;
  slogan: string;
  web: string;
}
export interface CreateInstitutionDTO
  extends Partial<Omit<InstitutionModel, 'id'>> {}
export interface UpdateInstitutionDTO
  extends Partial<Omit<InstitutionModel, 'id'>> {}
