import { ProfileDatasource } from '../../domain/datasources';
import { ProfileDTO } from '../../domain/dtos/users';
import { ProfileEntity } from '../../domain/entities/profile.entity';
import { ProfileRepository } from '../../domain/repositories';

export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(private readonly profileDatasource: ProfileDatasource) {}

  GetProfile(id: number): Promise<ProfileEntity | null> {
    return this.profileDatasource.GetProfile(id);
  }
  CreateProfile(userId: number, profile: ProfileDTO): Promise<ProfileEntity | void> {
    return this.profileDatasource.CreateProfile(userId, profile);
  }
  UpdateProfile(id: number, profileData: ProfileDTO): Promise<ProfileEntity | null> {
    return this.profileDatasource.UpdateProfile(id, profileData);
  }
}
