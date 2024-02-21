import { ProfileDTO } from '../dtos/users/profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

export abstract class ProfileDatasource {
  abstract GetProfile(id: number): Promise<ProfileEntity | null>;
  abstract CreateProfile(profile: ProfileDTO): Promise<ProfileEntity | void>;
  abstract UpdateProfile(id: number, userData: ProfileDTO): Promise<ProfileEntity | null>;
}
