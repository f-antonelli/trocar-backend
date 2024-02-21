import { ProfileDTO } from '../dtos/users/profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

export abstract class ProfileRepository {
  abstract GetProfile(userId: number): Promise<ProfileEntity | null>;
  abstract CreateProfile(userId: number, profile: ProfileDTO): Promise<ProfileEntity | void>;
  abstract UpdateProfile(userId: number, userData: ProfileDTO): Promise<ProfileEntity | null>;
}
