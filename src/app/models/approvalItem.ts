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

export class ApprovalItemResponce extends ApprovalItem {
    hasApproval: boolean;
    hasReject: boolean;
    hasReturnInitiator: boolean;
    isCompleted: boolean;
}

export class ApprovalWorkFlowRequest {
    processID: number;
    currentFlowID: number;
    comboKey: string;
    packageID: string;
    instanceID: string;
    viewLink: string;
    currentuserID: number;
    remarks: string;
    activityName: string;
}