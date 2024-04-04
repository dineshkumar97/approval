import { Component, OnInit } from '@angular/core';
import { PendingTableComponent } from '../pending-table/pending-table.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [PendingTableComponent, NgFor],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.scss'
})
export class ApprovalComponent implements OnInit {

  public pendingCompletedTitle: any;
  public pendingTitle: any;

  public data = [
    { name: 'Project Creation', count: 20 },
    { name: 'Plan Purchase', count: 30 },
    { name: 'Leave Applicatoin', count: 2 }
  ]

  public pending=false;
  public completed=false;
  constructor() {
  }


  ngOnInit(): void {
    this.pendingCompletedTitle = `${'Pending Approval For'} ${this.data[0].name}`;
    this.pendingTitle = `${'Pending Approval For'}`;
    this.pending = true;
    this.completed = false;
  }


  public pendingCompleted(message: any): void {
    console.log('pendingCompleted', message);

    this.pendingCompletedTitle = message == 'Pending' ? `${'Pending Approval For'} ${this.data[0].name}` : `${'Completed Approval For'} ${this.data[0].name}`
    this.pendingTitle = message == 'Pending' ? `${'Pending Approval For'}` : `${'Completed Approval For'}`
    this.pending = message == 'Pending' ? true : false;
    this.completed =  message == 'Completed' ? true : false;
  }

  public listTitle(listMessage: any): void {
    console.log('listTitle', listMessage)
    console.log('pendingTitle', this.pendingTitle)
    this.pendingCompletedTitle = `${this.pendingTitle} ${listMessage}`
  }

}
