import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styles: `mat-form-field + mat-form-field {
    margin-left: 8px;
  }
  mat-form-field {
  width: 220px;
}
form > * {
  margin: 12px 0;
}
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = '';
  errorMessage = signal('');

  constructor(
    private service: UserService,
    private translate: TranslateService
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  onSubmit() {
    if (this.email && this.email.valid && this.email.value && this.password) {
      this.service.login(this.email.value, this.password);
    }
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
