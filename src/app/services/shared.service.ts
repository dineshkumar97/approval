import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ApprovalCompletedItem, ApprovalPendingItem } from "../models/approvalItem";

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private processsub = new BehaviorSubject<string | null>(null);
    processId = this.processsub.asObservable();
    private completedListSub = new BehaviorSubject<ApprovalCompletedItem | null>(null);
    completedList = this.completedListSub.asObservable();

    constructor() { }

    setProcessId(data: string) {
        this.processsub.next(data);
    }

    setCompletedData(data: ApprovalCompletedItem) {
        this.completedListSub.next(data);
    }
}