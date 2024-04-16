import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ApprovalPendingItem } from '../../models/approvalItem';
import { CommonModule } from '@angular/common';
import { ApprovalService } from '../../services/approval.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbOffcanvas, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoryComponent } from '../history/history.component';
import { CommentComponent } from '../comment/comment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-pending-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbTooltipModule,NgbPaginationModule],
  templateUrl: './pending-table.component.html',
  styleUrl: './pending-table.component.scss'
})
export class PendingTableComponent implements OnInit, OnDestroy {

  tableData: ApprovalPendingItem[] = [];
  subscription: Subscription;
  processId: string;
  @ViewChild('closeModal') closeModal: ElementRef;
  public approveRejectTitle: any;
  public approvalForm: FormGroup;
  public approvalData: any;
  public comboKey: any;
  public userId: string;
  public isLoading = false;
  private offcanvasService = inject(NgbOffcanvas);
  public activityName: string;
  public pageSize = 10;
  public page = 1;

  constructor(private service: ApprovalService, private sharedService: SharedService,
    private router: Router,private toast:ToasterService,
    private fb: FormBuilder, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.queryParamMap.get('userId') ?? '';
  }


  ngOnInit(): void {
    this.loadApprovalForm();
    this.subscription = this.sharedService.processId.subscribe(processId => {
      this.processId = processId ?? "";
      let tabStatus: any = sessionStorage.getItem('tabStatus')
      if (tabStatus == 'Pending' || tabStatus == null) {
        this.loadData();
      }
    });
  }

  loadData() {
    this.service.GetApprovalPendingItem(this.userId, this.processId).subscribe({
      next: x => {
        this.tableData = x;
      }, error: err => console.log(err)
    })
  }

  public loadApprovalForm(): void {
    this.approvalForm = this.fb.group({
      approval: [null, Validators.required],
      returnInitiator: [null],
    });
  }


  public isReturnInitator = false;
  public isDisableReturn = false;
  public onApprovalFlowClick(wrokflowType: string, activityName: string, data: ApprovalPendingItem): void {
    this.approvalData = data;
    switch (wrokflowType) {
      case "Approve":
        this.approveRejectTitle = this.approvalData?.approval?.comboDisplay;
        this.activityName = activityName;
        this.comboKey = this.approvalData?.approval?.processflowID;
        break;
      case "Reject":
        this.approveRejectTitle = this.approvalData?.reject?.comboDisplay;
        this.activityName = activityName;
        this.comboKey = this.approvalData?.reject?.processflowID;
        break;
      case "Return":
        this.approveRejectTitle = 'Return / Return to Initiator';
        this.activityName = activityName;
        if (this.approvalData?.returnToInitiator != null && this.approvalData?.return != null) {
          this.isReturnInitator = false;
        } else if (this.approvalData?.returnToInitiator != null) {
          this.isReturnInitator = true;
          this.isDisableReturn = true;
        } else if (this.approvalData?.return != null) {
          this.isReturnInitator = false;
          this.isDisableReturn = true;
        }
        break;
    }
  }


  onHistoryClick(data: ApprovalPendingItem) {
    const offcanvasRef = this.offcanvasService.open(HistoryComponent, { position: 'end', backdrop: 'static' });
    offcanvasRef.componentInstance.data = data;
  }

  onCommentClick(data: ApprovalPendingItem) {
    const offcanvasRef = this.offcanvasService.open(CommentComponent, { position: 'end', backdrop: 'static' });
    offcanvasRef.componentInstance.data = data;
  }

  public onSubmit(): void {
    let comboKey: any
    if (this.approveRejectTitle == 'Return / Return to Initiator') {
      comboKey = this.isReturnInitator ? this.approvalData?.returnToInitiator?.processflowID : this.approvalData?.return?.processflowID;
    } else {
      comboKey = this.comboKey;
    }
    const json: any = {
      processID: this.approvalData.processID,
      currentFlowID: this.approvalData.currentFlowID,
      comboKey: comboKey,
      packageID: this.approvalData.processPackageID,
      instanceID: this.approvalData.instanceID,
      viewLink: this.approvalData.viewLink,
      currentuserID: this.userId,
      remarks: this.approvalForm.value.approval,
      activityName: this.activityName,
    }
    this.service.SetApprovalWorkflow(json).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.approvalForm.reset();
          this.closeModal.nativeElement.click();
          let message = this.activityName == 'F' ? 'Approved Successfully' :
          this.activityName == 'R' ? 'Rejected Successfully':'Return to Initiator Successfullu';
          this.toast.showSuccess(message)
          this.sharedService.isTabRefresh.next(true);
          this.loadData();
        }
      }, error: (err: any) => console.log(err)
    });
  }

  public closeApprove(): void {
    this.approvalForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public viewDetails(): void {
    this.router.navigate(['/approval/detail'], {  queryParams: { userId: this.userId ,status:'pending' } });
  }

}