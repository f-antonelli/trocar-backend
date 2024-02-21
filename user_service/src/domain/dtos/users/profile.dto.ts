import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator';

import { Country } from '../../enums/country.enum';

export class ProfileDTO {
  @IsString()
  @Length(2, 15)
  name: string;

  @IsString()
  @Length(2, 30)
  surname: string;

  @IsString()
  @Length(10, 15)
  phone: string;

  @IsString()
  @Length(4, 30)
  address_1: string;

  @IsOptional()
  @IsString()
  @Length(4, 30)
  address_2?: string;

  @IsEnum(Country)
  country: string;

  @IsString()
  @Length(4, 20)
  city: string;

  @IsString()
  @Length(2, 8)
  zip_code: string;
}
