import { Country } from '../enums/country.enum';

export interface ProfileEntity {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  address_1: string;
  address_2?: string;
  country: Country;
  city: string;
  zip_code: string;
  user_score?: GLfloat;
  wish_list?: number[];
  ref?: number[];
  created_at?: Date;
  updated_at?: Date;
}
