import { ProfileDTO } from '../dtos/users/profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

export abstract class ProfileRepository {
  abstract GetProfile(id: number): Promise<ProfileEntity | void>;
  abstract CreateProfile(profile: ProfileDTO): Promise<ProfileEntity | null>;
  abstract UpdateProfile(id: number, userData: ProfileDTO): Promise<ProfileEntity | null>;
}
