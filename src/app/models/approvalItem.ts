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

export class ApprovalPendingItem extends ApprovalItem {    
    return: boolean;
    isCompleted: boolean;
    approval: any;
    reject:any;
    returnToInitiator:any;
}


export interface ApprovalCompletedItem extends ApprovalItem {
    processDescription: string;
    activityByID: number;
    activitybyname: string;
    activityInitiatedDate: string;
    activityCompletedByID: number;
    activityCompletedByName: string;
    processInitiatedByID: string;
    sLADuration: string;
    processWorkFlowID: string;
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