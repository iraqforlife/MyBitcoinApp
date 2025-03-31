import { Component, computed, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../dto/user.dto';
import { setErrorMessage } from '../../utils/error-message';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styles: ``,
})
export class UserListComponent {
  pageTitle = 'Users List';
  private service = inject(UsersService);
  UsersResource = this.service.getAll();

  // Resource signals
  users = computed(() => this.UsersResource.value() ?? ([] as User[]));
  error = computed(() => this.UsersResource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'vehicle'));
  isLoading = computed(() => this.UsersResource.isLoading());

  displayedColumns: string[] = ['email', 'firstName', 'lastName'];
}
