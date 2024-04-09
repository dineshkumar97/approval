export class ApprovalListItem {
    processName: string;
    processTotal: string;
    processID: string;
    redirectCompleted: string;
    styles: string;
    isactive: boolean;
}

export class ApprovalListItemResponce {
    pending: ApprovalListItem[];
    completed: ApprovalListItem[];
}