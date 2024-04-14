import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor( private toast: NgToastService) { }


   public showSuccess(message: string): void {
    this.toast.success({ detail: "SUCCESS", summary: message, duration: 3000 });
  }

  public showError(message: string): void {
    this.toast.error({ detail: "ERROR", summary: message, duration: 3000 });
  }

  public showInfo(message: string): void {
    this.toast.info({ detail: "INFO", summary: message, duration: 3000 });
  }

  public showWarn(message: string): void {
    this.toast.warning({ detail: "WARN", summary: message, duration: 3000 });
  }
}
