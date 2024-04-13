import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApprovalListItemResponce } from '../models/approvalListItem';
import { Observable } from 'rxjs';
import { ApprovalCompletedItem, ApprovalPendingItem, ApprovalWorkFlowRequest } from '../models/approvalItem';
import { CommentRequest } from '../models/commentrequest';
import { History } from '../models/history';
import { CommentResponse } from '../models/commentresponse';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiurl;
  }

  GetApprovalListItem(userid: string): Observable<ApprovalListItemResponce> {
    return this.http.get<ApprovalListItemResponce>(this.apiUrl + "approval/GetListItem?userId=" + userid);
  }

  GetApprovalPendingItem(userId: string, processId: string): Observable<ApprovalPendingItem[]> {
    return this.http.get<ApprovalPendingItem[]>(this.apiUrl + "approval/GetApprovalPendingList?userId=" + userId + "&processId=" + processId);
  }

  GetApprovalCompletedItem(userId: string, processId: string): Observable<ApprovalCompletedItem[]> {
    return this.http.get<ApprovalCompletedItem[]>(this.apiUrl + "approval/GetApprovalCompletedList?userId=" + userId + "&processId=" + processId);
  }

  GetHistory(instanceId: string, processId: string): Observable<History[]> {
    return this.http.get<History[]>(this.apiUrl + "approval/GetHistory?instanceId=" + instanceId + "&processId=" + processId);
  }

  GetComment(instanceId: string, processId: string): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(this.apiUrl + "approval/GetComment?instanceId=" + instanceId + "&processId=" + processId);
  }

  SetComment(data: CommentRequest): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + "approval/SetComment", data);
  }

  SetApprovalWorkflow(data: ApprovalWorkFlowRequest): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + "approval/SetApprovalWorkflow", data);
  }

}
