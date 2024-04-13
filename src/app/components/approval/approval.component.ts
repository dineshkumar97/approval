import { Component, OnInit } from '@angular/core';
import { PendingTableComponent } from '../pending-table/pending-table.component';
import { CommonModule } from '@angular/common';
import { ApprovalService } from '../../services/approval.service';
import { ApprovalListItem, ApprovalListItemResponce } from '../../models/approvalListItem';
import { ApprovalPendingItem } from '../../models/approvalItem';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [PendingTableComponent, CommonModule, RouterModule],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.scss'
})
export class ApprovalComponent implements OnInit {

  public title: any;
  public userId: string;
  public listitems: ApprovalListItemResponce;
  public data: ApprovalListItem[] = [];

  public pending = false;
  public completed = false;
  public isPendingList = true;
  public statusMessage: string;

  constructor(private service: ApprovalService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router) {
    this.userId = this.route.snapshot.queryParamMap.get('userId') ?? '';
  }


  ngOnInit(): void {
    this.pending = true;
    this.completed = false;
    this.loadApprovalListItem();
  }

  loadApprovalListItem() {
    this.service.GetApprovalListItem(this.userId).subscribe({
      next: x => {
        this.listitems = x;
        this.listitems.pending.forEach(x => x.processTotal = x.processTotal.replace("(", "").replace(")", ""));
        this.listitems.completed.forEach(x => x.processTotal = x.processTotal.replace("(", "").replace(")", ""));
        this.data = this.listitems.pending;
        this.statusMessage = 'Pending';
      }, error: err => console.log(err)
    })
  }


  public pendingCompleted(message: any): void {
    this.isPendingList = false;
    this.pending = message == 'Pending' ? true : false;
    this.completed = message == 'Completed' ? true : false;
    this.data = message == "Pending" ? this.listitems.pending : this.listitems.completed;
    this.data.forEach((active: any, index: any) => {
      this.data[index].isactive = false;
    });
    this.title = null;
    this.statusMessage = message;
  }

  public onListItemClick(data: ApprovalListItem) {
    let index = this.data.findIndex(x => x.processID == data.processID);
    this.sharedService.setProcessId(data.processID);
    this.data.forEach(x => x.isactive = false);
    this.data[index].isactive = true;
    this.title = `${'-'} ${data.processName}`;    
  }

}
