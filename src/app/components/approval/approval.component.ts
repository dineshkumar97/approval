import { Component, OnInit } from '@angular/core';
import { PendingTableComponent } from '../pending-table/pending-table.component';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [PendingTableComponent],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.scss'
})
export class ApprovalComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  }

}
