export interface Login {
  id: string;
  email: string;
  role: string;
  token: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  expiration: Date;
}
