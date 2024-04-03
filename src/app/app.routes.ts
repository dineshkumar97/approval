import { Routes } from '@angular/router';
import { ApprovalComponent } from './components/approval/approval.component';

export const routes: Routes = [

    { path: 'approval', component: ApprovalComponent },
    {path: '',redirectTo: '/approval',pathMatch: 'full'},
];
