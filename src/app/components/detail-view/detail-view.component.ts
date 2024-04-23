import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApprovalService } from '../../services/approval.service';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.scss'
})
export class DetailViewComponent implements OnInit {
  public detailsView: SafeResourceUrl;
  public userId: string;
  public subscription: Subscription;
  public processId: string;
  public viewLink: string;
  public statusMessage: string;

  constructor(private service: ApprovalService, private sharedService: SharedService,
    private router: Router,private safe: DomSanitizer,
    private route: ActivatedRoute) {
    this.userId = this.route.snapshot.queryParamMap.get('userId') ?? '';
    this.statusMessage = this.route.snapshot.queryParamMap.get('status') ?? '';
    this.viewLink = this.route.snapshot.queryParamMap.get('viewLink') ?? '';
  }


  ngOnInit(): void {
    this.inilization();
  }

  public inilization(): void {
    this.subscription = this.sharedService.processId.subscribe(processId => {
      this.processId = processId ?? "";
    });
    console.log("status",  this.statusMessage )
    const url = this.viewLink;
    this.detailsView = this.safe.bypassSecurityTrustResourceUrl(url)
  }



  public backPrevious(): void {
    let url = this.statusMessage == 'pending' ? "pending" : "completed";
    this.router.navigate([`${'/approval/'}${url}`], {  queryParams: { userId: this.userId } });
  }
}
