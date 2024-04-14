import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApprovalItem } from '../../models/approvalItem';
import { CommentResponse } from '../../models/commentresponse';
import { ApprovalService } from '../../services/approval.service';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  commentList: CommentResponse[] = [];
  @Input() data: ApprovalItem;
  activeOffcanvas = inject(NgbActiveOffcanvas);
  public commentsForm: FormGroup;
  userId: string;

  constructor(private service: ApprovalService, private route: ActivatedRoute,private toast:ToasterService,private fb: FormBuilder) {
    this.userId = this.route.snapshot.queryParamMap.get('userId') ?? '';
  }

  ngOnInit(): void {
    this.loadComment(this.data);
    this.commentsForm = this.fb.group({
      comments: [null, Validators.required]
    })
  }

  public onSubmit(): void {
    const json: any = {
      currentFlowID: this.data.currentFlowID,
      instanceID: this.data.instanceID,
      currentuserID: this.userId,
      comments: this.commentsForm.value.comments,
    }
    this.service.SetComment(json).subscribe({
      next: (response: boolean) => {
        this.loadComment(this.data);
        this.toast.showSuccess('Saved Successfully');
      }, error: (err: any) => console.log(err)
    });
  }


  loadComment(data: ApprovalItem) {
    this.service.GetComment(data.instanceID, data.processID.toString()).subscribe({
      next: (x: CommentResponse[]) => {
        this.commentList = x;
      }, error: (err: any) => console.log(err)
    });
  }

}
