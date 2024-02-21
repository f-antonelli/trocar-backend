import { ProfileDatasource } from '../../domain/datasources';
import { ProfileDTO } from '../../domain/dtos/users';
import { ProfileEntity } from '../../domain/entities/profile.entity';
import { DBOperation } from '../data/pg/db-operation';

export class PgProfileDatasource extends DBOperation implements ProfileDatasource {
  async CreateProfile(profile: ProfileEntity): Promise<ProfileEntity | void> {
    const { name, surname, address_1, city, country, phone, zip_code, address_2 = null } = profile;

    const queryString =
      'INSERT INTO users_profile( name, surname, address_1, city, country, phone, zip_code, address_2 ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *';

    const values = [name, surname, address_1, city, country, phone, zip_code, address_2];
    const result = await this.executeQuery(queryString, values);

    if (result && result.rowCount! > 0) {
      return result.rows[0] as ProfileEntity;
    }
  }

  async GetProfile(id: number): Promise<ProfileEntity | null> {
    const queryString = 'SELECT * FROM users_profile WHERE id = $1';

    const values = [id];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as ProfileEntity;
    }

    return null;
  }

  async UpdateProfile(userId: number, profileData: ProfileDTO): Promise<ProfileEntity | null> {
    const {
      name,
      surname,
      address_1,
      city,
      country,
      phone,
      zip_code,
      address_2 = null,
    } = profileData;
    const queryString =
      'UPDATE users_profile SET name = $1, surname = $2, address_1 = $3, city = $4, country = $5, phone = $6, zip_code = $7, address_2 = $8, updated_at = NOW() WHERE user_id = $9 RETURNING *';

    const values = [name, surname, address_1, city, country, phone, zip_code, address_2, userId];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as ProfileEntity;
    }

    return null;
  }
}
