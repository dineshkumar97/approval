import { Component, OnInit } from '@angular/core';
import { PendingTableComponent } from '../pending-table/pending-table.component';
import { NgFor } from '@angular/common';
import { ApprovalService } from '../../services/approval.service';
import { ApprovalListItem, ApprovalListItemResponce } from '../../models/approvalListItem';
import { ApprovalItemResponce } from '../../models/approvalItem';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [PendingTableComponent, NgFor],
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
  public approvalItems: ApprovalItemResponce[];

  constructor(private service: ApprovalService) {
    this.userId = "73";
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
      }, error: err => console.log(err)
    })
  }


  public pendingCompleted(message: any): void {
    this.pending = message == 'Pending' ? true : false;
    this.completed = message == 'Completed' ? true : false;
    this.data = message == "Pending" ? this.listitems.pending : this.listitems.completed;
  }

  public onListItemClick(data: ApprovalListItem) {
    let index = this.data.findIndex(x => x.processID == data.processID);
    this.data.forEach(x => x.isactive = false);
    this.data[index].isactive = true;
    this.title = data.processName;
    this.service.GetApprovalItem(this.userId, data.processID).subscribe({
      next: x => {
        this.approvalItems = x;

      }, error: err => console.log(err)
    })
  }

}
