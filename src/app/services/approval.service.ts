import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApprovalListItemResponce } from '../models/approvalListItem';
import { Observable } from 'rxjs';
import { ApprovalItemResponce } from '../models/approvalItem';

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

  GetApprovalItem(userId: string, processId: string): Observable<ApprovalItemResponce[]> {
    return this.http.get<ApprovalItemResponce[]>(this.apiUrl + "approval/GetApprovalListByProcessId?userId=" + userId + "&processId=" + processId);
  }

}
