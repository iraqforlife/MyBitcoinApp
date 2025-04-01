import { Component, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { WalletsLabels } from '../../enum/wallets';
import { WalletTypes } from '../../enum/wallets';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-wallet-dialog',
  templateUrl: './add-wallet-dialog.component.html',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
})
export class AddWalletDialogComponent {
  walletTypes = Object.values(WalletsLabels);
  readonly walletName = new FormControl('', [Validators.required]);
  readonly selectedWalletType = new FormControl('', [Validators.required]);
  walletErrorMessage = signal('');
  typeErrorMessage = signal('');

  constructor(public dialogRef: MatDialogRef<AddWalletDialogComponent>) {
    merge(this.walletName.statusChanges, this.walletName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateWalletErrorMessage());
    merge(
      this.selectedWalletType.statusChanges,
      this.selectedWalletType.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTypeErrorMessage());
  }

  addWallet() {
    if (this.selectedWalletType.valid && this.walletName.valid) {
      const walletTypeEnumValue = Object.keys(WalletsLabels).find(
        (key) =>
          WalletsLabels[key as unknown as keyof typeof WalletsLabels] ===
          this.selectedWalletType.value
      );
      this.dialogRef.close({
        name: this.walletName.value,
        type: walletTypeEnumValue,
      });
    }
  }
  updateWalletErrorMessage() {
    if (this.walletName.hasError('required')) {
      this.walletErrorMessage.set('You must enter a value');
    } else {
      this.walletErrorMessage.set('');
    }
  }
  updateTypeErrorMessage() {
    if (this.selectedWalletType.hasError('required')) {
      this.typeErrorMessage.set('You must select a value');
    } else {
      this.typeErrorMessage.set('');
    }
  }
}
