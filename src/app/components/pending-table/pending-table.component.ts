import { Component, Input, OnInit, input } from '@angular/core';
import { ApprovalItemResponce } from '../../models/approvalItem';
import { CommonModule } from '@angular/common';
import { ApprovalService } from '../../services/approval.service';
import { History } from '../../models/history';

@Component({
  selector: 'app-pending-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-table.component.html',
  styleUrl: './pending-table.component.scss'
})
export class PendingTableComponent implements OnInit {

  @Input() tableData: ApprovalItemResponce[] = [];

  public approveRejectTitle: any;
  historyList: History[] = [];
  constructor(private service: ApprovalService) {
  }


  ngOnInit(): void {
  }



  onApprovalFlowClick(wrokflowType: string, data: ApprovalItemResponce): void {
    switch (wrokflowType) {
      case "Approve":
        this.approveRejectTitle = wrokflowType;
        break;
      case "Reject":
        this.approveRejectTitle = wrokflowType;
        break;
      case "Return":
        this.approveRejectTitle = wrokflowType;
        break;
    }
  }

  onHistoryClick(data: ApprovalItemResponce) {
    this.historyList = [];
    this.service.GetHistory(data.instanceID, data.processID.toString()).subscribe({
      next: x => {
        this.historyList = x;
      }, error: err => console.log(err)
    });
  }

}