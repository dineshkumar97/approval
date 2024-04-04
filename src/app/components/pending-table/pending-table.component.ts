import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-table',
  standalone: true,
  imports: [],
  templateUrl: './pending-table.component.html',
  styleUrl: './pending-table.component.scss'
})
export class PendingTableComponent implements OnInit {


  public approveRejectTitle: any;
  constructor() {
  }


  ngOnInit(): void {
  }



  public allPopup(message: any): void {
    console.log('test', message)
    this.approveRejectTitle = message == 'Approve' ? 'Approve & Forward to Role - (HOD)' :
      message == 'Reject' ? 'Reject Application' :  message == 'Collaboration' ? 'Collaboration': 'Return to Initiator';
  }
}