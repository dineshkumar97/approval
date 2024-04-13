import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { ApprovalCompletedItem } from '../../models/approvalItem';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbOffcanvas, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ApprovalService } from '../../services/approval.service';
import { HistoryComponent } from '../history/history.component';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-completed-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbTooltipModule],
  templateUrl: './completed-table.component.html',
  styleUrl: './completed-table.component.scss'
})
export class CompletedTableComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  processId: string;
  userId: string;
  tableData: ApprovalCompletedItem[] = [];
  private offcanvasService = inject(NgbOffcanvas);

  constructor(private sharedService: SharedService, private route: ActivatedRoute,
    private service: ApprovalService) {
    this.userId = this.route.snapshot.queryParamMap.get('userId') ?? '';
  }

  ngOnInit(): void {
    this.subscription = this.sharedService.processId.subscribe(processId => {
      this.processId = processId ?? "";
      console.log(this.userId, this.processId);
      this.loadData();
    });
  }

  loadData() {
    this.service.GetApprovalCompletedItem(this.userId, this.processId).subscribe({
      next: (x: ApprovalCompletedItem[]) => {
        this.tableData = x;
      }, error: (err: any) => console.log(err)
    });
  }

  onHistoryClick(data: ApprovalCompletedItem) {
    const offcanvasRef = this.offcanvasService.open(HistoryComponent, { position: 'end', backdrop: 'static' });
    offcanvasRef.componentInstance.data = data;
  }

  onCommentClick(data: ApprovalCompletedItem) {
    const offcanvasRef = this.offcanvasService.open(CommentComponent, { position: 'end', backdrop: 'static' });
    offcanvasRef.componentInstance.data = data;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}