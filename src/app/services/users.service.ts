import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getAll() {
    return httpResource<User[]>('users');
  }
}
