import { Component, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletsService } from '../../services/wallets.service';
import { HttpErrorResponse, HttpResourceRef } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { setErrorMessage } from '../../utils/error-message';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewtonTransaction } from '../../dto/newton-transaction.dto';

@Component({
  selector: 'app-newton-transaction-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './newton-transactions-list.component.html',
})
export class NewtonTransactionsComponent {
  resource: HttpResourceRef<NewtonTransaction[] | undefined>;
  walletId = signal<string>('');
  pageTitle = 'Newton Transactions List';
  displayedColumns: string[] = ['id', 'amount', 'date', 'status', 'actions'];
  constructor(
    private route: ActivatedRoute,
    private service: WalletsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.route.paramMap.subscribe((params) => {
      const walletId = params.get('walletId');
      if (walletId) {
        this.walletId.set(walletId);
      }
    });
    this.resource = this.service.GetNewtonTransaction(this.walletId);
  }
  // Resource signals
  transactions = computed(
    () => this.resource.value() ?? ([] as NewtonTransaction[])
  );
  error = computed(() => this.resource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Newton'));
  isLoading = computed(() => this.resource.isLoading());
}
