import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = new BehaviorSubject({});
  sharedConfig = this.config.asObservable();
  private configData: any;

  constructor() { }

  setConfig(configMessage: any) {
    this.configData = {...this.configData, ...configMessage};
    this.config.next(this.configData);
  }
}
