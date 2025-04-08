import { BitcoinwellTransaction } from './dto/bitcoinwell-transaction.dto';
import { Routes } from '@angular/router';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { LoggedComponent } from './components/logged/logged.component';
import { authGuard as AuthGuard } from './guards/auth.guard';
import { Roles } from './enum/roles';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WalletsListComponent } from './components/wallets-list/wallets-list.component';
import { BitcoinwellTransactionsComponent } from './components/bitcoinwell-transactions-list/bitcoinwell-transactions-list.component';
import { WOSTransactionsComponent } from './components/wos-transactions-list/wos-transactions-list.component';
import { NewtonTransactionsComponent } from './components/newton-transactions-list/newton-transactions-list.component';
import { ShakepayTransactionsComponent } from './components/shakepay-transactions-list/shakepay-transactions-list.component';
import { LedgerTransactionsComponent } from './components/ledger-transactions-list/ledger-transactions-list.component';
import { ExodusTransactionsComponent } from './components/exodus-transactions-list/exodus-transactions-list.component';
import { LedgerListComponent } from './components/ledger-list/ledger-list.component';

export const routes: Routes = [
  {
    path: 'vehicle',
    component: VehiculeComponent,
    //canLoad: [AuthGuard, FeatureGuard],
    //canActivate: [AuthGuard, FeatureGuard],
    //data: { featureId: ['FLEX.MANAGER'] },
    //resolve: { report: GanttResolver },
  },
  {
    path: 'logged',
    component: LoggedComponent,
    canActivate: [AuthGuard],
  } /*
  {
    path: 'admin',
    component: AdminViewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: Roles.Admin },
  },
  {
    path: 'talen',
    component: TalenViewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: Roles.Talen },
  },*/,
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users-list',
    component: UserListComponent,
  },
  {
    path: 'wallets-list',
    component: WalletsListComponent,
  },
  {
    path: 'ledger-list',
    component: LedgerListComponent,
  },
  {
    path: 'bitcoinwell-transactions/:walletId',
    component: BitcoinwellTransactionsComponent,
  },

  {
    path: 'wos-transactions/:walletId',
    component: WOSTransactionsComponent,
  },

  {
    path: 'newton-transactions/:walletId',
    component: NewtonTransactionsComponent,
  },

  {
    path: 'shakepay-transactions/:walletId',
    component: ShakepayTransactionsComponent,
  },
  {
    path: 'ledger-transactions/:walletId',
    component: LedgerTransactionsComponent,
  },
  {
    path: 'exodus-transactions/:walletId',
    component: ExodusTransactionsComponent,
  },
];
