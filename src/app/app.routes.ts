import { Routes } from '@angular/router';
import { ApprovalComponent } from './components/approval/approval.component';
import { PendingTableComponent } from './components/pending-table/pending-table.component';
import { CompletedTableComponent } from './components/completed-table/completed-table.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';

export const routes: Routes = [
    {
        path: 'approval', component: ApprovalComponent,
        children: [
            { path: '', component: PendingTableComponent },
            { path: 'pending', component: PendingTableComponent },
            { path: 'completed', component: CompletedTableComponent },
            { path: 'detail', component: DetailViewComponent }
        ]
    },
    { path: '', redirectTo: '/approval', pathMatch: 'full' },
];
