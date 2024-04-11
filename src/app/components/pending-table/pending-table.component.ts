import { Component, ElementRef, Input, OnInit, ViewChild, input } from '@angular/core';
import { ApprovalItemResponce } from '../../models/approvalItem';
import { CommonModule } from '@angular/common';
import { ApprovalService } from '../../services/approval.service';
import { History } from '../../models/history';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentResponse } from '../../models/commentresponse';

@Component({
  selector: 'app-pending-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbTooltipModule],
  templateUrl: './pending-table.component.html',
  styleUrl: './pending-table.component.scss'
})
export class PendingTableComponent implements OnInit {

  @Input() tableData: ApprovalItemResponce[] = [];
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('closeModalComments') closeModalComments: ElementRef;
  public approveRejectTitle: any;
  public commentList: CommentResponse[];
  public historyList: History[] = [];
  public approvalForm: FormGroup;
  public commentsForm: FormGroup;
  public approvalData: ApprovalItemResponce;
  public userId: string;
  public isTableShow = true;
  public isLoading = false;

  constructor(private service: ApprovalService, private fb: FormBuilder) {
    this.userId = "73";
  }


  ngOnInit(): void {
    this.initilization();
  }

  ngOnChanges() {
    this.isTableShow = this.tableData?.length > 0 ? false : true;
  }

  public initilization(): void {
    this.loadApprovalForm();
  }

  public loadApprovalForm(): void {
    this.approvalForm = this.fb.group({
      approval: [null, Validators.required]
    });
    this.commentsForm = this.fb.group({
      comments: [null, Validators.required]
    })
  }

  activityName: string;
  public onApprovalFlowClick(wrokflowType: string, activityName: string, data: ApprovalItemResponce): void {
    this.approvalData = data;
    switch (wrokflowType) {
      case "Approve":
        this.approveRejectTitle = wrokflowType;
        this.activityName = activityName;
        break;
      case "Reject":
        this.approveRejectTitle = wrokflowType;
        this.activityName = activityName;
        break;
      case "Return":
        this.approveRejectTitle = wrokflowType;
        this.activityName = activityName;
        break;
      case "Collaboration":
        this.approveRejectTitle = wrokflowType;
        this.activityName = activityName;
        this.loadComment(data);
        break;
    }
  }

  public onHistoryClick(data: ApprovalItemResponce) {
    this.historyList = [];
    this.service.GetHistory(data.instanceID, data.processID.toString()).subscribe({
      next: (x: History[]) => {
        this.historyList = x;
      }, error: (err: any) => console.log(err)
    });
  }

  public onSubmit(): void {
    this.approvalCommit();
  }

  approvalCommit(): void {
    if (this.approveRejectTitle === 'Collaboration') {
      const json: any = {
        currentFlowID: this.approvalData.currentFlowID,
        instanceID: this.approvalData.instanceID,
        currentuserID: this.userId,
        comments: this.commentsForm.value.comments,
      }
      this.service.SetComment(json).subscribe({
        next: (response: boolean) => {
          this.loadComment(this.approvalData);
          alert('Saved Successfully')
        }, error: (err: any) => console.log(err)
      });
    } else {
      const json: any = {
        processID: this.approvalData.processID,
        currentFlowID: this.approvalData.currentFlowID,
        comboKey: this.activityName,
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
            this.closeApproveComments(this.activityName);
            alert('Saved Successfully')
          }
        }, error: (err: any) => console.log(err)
      });
    }
  }

  public closeApprove(): void {
    this.approvalForm.reset();
    this.commentsForm.reset();
  }

  public closeApproveComments(message: string): void {
    if (message === 'C') {
      this.commentsForm.reset();
      this.closeModalComments.nativeElement.click();
    } else {
      this.approvalForm.reset();
      this.closeModal.nativeElement.click();
    }
  }

  loadComment(data: ApprovalItemResponce) {
    this.service.GetComment(data.instanceID, data.processID.toString()).subscribe({
      next: (x: CommentResponse[]) => {
        this.commentList = x;
      }, error: (err: any) => console.log(err)
    });
  }

}