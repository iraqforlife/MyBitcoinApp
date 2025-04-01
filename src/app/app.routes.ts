import { Routes } from '@angular/router';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { LoggedComponent } from './components/logged/logged.component';
import { authGuard as AuthGuard } from './guards/auth.guard';
import { Roles } from './enum/roles';
import { RoleGuard } from './guards/role.guard';
import { TalenViewComponent } from './components/talen-view/talen-view.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WalletsListComponent } from './components/wallets-list/wallets-list.component';

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
  },
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
  },
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
];
