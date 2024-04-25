import { Component, Input, OnInit, inject } from '@angular/core';
import { ApprovalPendingItem } from '../../models/approvalItem';
import { History } from '../../models/history';
import { ApprovalService } from '../../services/approval.service';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  historyList: History[] = [];
  @Input() data: ApprovalPendingItem;
  activeOffcanvas = inject(NgbActiveOffcanvas);

  constructor(private service: ApprovalService) { }

  ngOnInit(): void {
    this.loadHistory(this.data);
  }

  public loadHistory(data: ApprovalPendingItem) {
    this.historyList = [];
    this.service.GetHistory(data.instanceID, data.processID.toString()).subscribe({
      next: (x: History[]) => {
        this.historyList = x;
        this.historyList.forEach((element: any, index: any) => {
          this.historyList[index].activityCompletedBy = element.activityCompletedBy == null ? '-' : element.activityCompletedBy;
          this.historyList[index].activityCompletionDate = element.activityCompletionDate == null ? '-' :
            element.activityCompletionDate == '0001-01-01T00:00:00' ? '-' : element.activityCompletionDate;
        })
      }, error: (err: any) => console.log(err)
    });
  }
}
