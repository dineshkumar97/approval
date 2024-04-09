export class ApprovalItem {
    processName: string;
    initiatedbyname: string;
    processInitiatedDate: string;
    currentFlowID: number;
    instanceID: string;
    processID: number;
    processPackageID: string;
    viewLink: string;
}

export interface ApprovalItemResponce extends ApprovalItem {
    hasApproval: boolean;
    hasReject: boolean;
    hasReturnInitiator: boolean;
    isCompleted: boolean;
}