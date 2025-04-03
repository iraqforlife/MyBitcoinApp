import { Component, computed, Signal, signal } from '@angular/core';
import { setErrorMessage } from '../../utils/error-message';
import { HttpErrorResponse, HttpResourceRef } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WalletsService } from '../../services/wallets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletTypes, WalletsLabels } from '../../enum/wallets';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LedgerTransction } from '../../dto/ledger.dto';
import { transition } from '@angular/animations';
import {
  TransactionType,
  TransactionTypeLabels,
} from '../../enum/transaction-type';

@Component({
  selector: 'app-ledger-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './ledger-list.component.html',
})
export class LedgerListComponent {
  pageTitle = 'Ledger List';
  resource: HttpResourceRef<LedgerTransction[] | undefined>;
  constructor(private service: WalletsService, private snackBar: MatSnackBar) {
    this.resource = this.service.getAllLedgerTransaction();
  }

  // Resource signals
  transactions: Signal<LedgerTransction[]> = computed(() => {
    return this.resource?.value() ?? ([] as LedgerTransction[]);
  });
  error = computed(() => this.resource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'vehicle'));
  isLoading = computed(() => this.resource.isLoading());

  displayedColumns: string[] = [
    'date',
    'btc',
    'fiat',
    'spot',
    'type',
    'actions',
  ];

  sync() {
    this.service.sync().subscribe({
      next: (response) => {
        this.snackBar.open('Sync completed successfully', 'Close', {
          duration: 2000,
        });
        this.resource.reload(); // Refresh the resource to get the latest data
      },
      error: (error) => {
        this.snackBar.open('Sync failed', 'Close', {
          duration: 2000,
        });
      },
    });
  }
  getLabels(type: TransactionType): string {
    return TransactionTypeLabels[type] || 'Unknown Type';
  }
}
