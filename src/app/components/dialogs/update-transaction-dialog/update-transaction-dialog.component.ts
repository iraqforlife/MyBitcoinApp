import { Component, Inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
import {
  TransactionTypeLabels,
  TransactionTypes,
} from '../../../enum/transaction-type';

@Component({
  selector: 'app-add-wallet-dialog',
  templateUrl: './update-transaction-dialog.component.html',
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
export class UpdateTransactionDialogComponent {
  transactionTypes = Object.values(TransactionTypeLabels);
  readonly walletName = new FormControl('', [Validators.required]);
  readonly selectedTransactionType = new FormControl('Not Set', [
    Validators.required,
  ]);

  walletErrorMessage = signal('');
  typeErrorMessage = signal('');
  constructor(
    public dialogRef: MatDialogRef<UpdateTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: number }
  ) {
    merge(this.walletName.statusChanges, this.walletName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateWalletErrorMessage());
    merge(
      this.selectedTransactionType.statusChanges,
      this.selectedTransactionType.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTypeErrorMessage());
    var WalType =
      TransactionTypeLabels[
        data.type as unknown as keyof typeof TransactionTypeLabels
      ];
    this.selectedTransactionType.setValue(WalType);
  }

  addWallet() {
    if (this.selectedTransactionType.valid && this.walletName.valid) {
      const transactionTypeEnumValue = Object.keys(TransactionTypeLabels).find(
        (key) =>
          TransactionTypeLabels[
            key as unknown as keyof typeof TransactionTypeLabels
          ] === this.selectedTransactionType.value
      );
      this.dialogRef.close({
        name: this.walletName.value,
        type: transactionTypeEnumValue,
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
    if (this.selectedTransactionType.hasError('required')) {
      this.typeErrorMessage.set('You must select a value');
    } else {
      this.typeErrorMessage.set('');
    }
  }
}
