import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserInfo, UserInfoService } from '../../services/user.info/user.info.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  isLoadingData = true;
  userInfo: UserInfo;
  subscriptions: Subscription[] = [];

  constructor(private _userInfoService: UserInfoService) {
    this.subscriptions.push(this._userInfoService.userInfoSubject.subscribe(userInfo => {
      if (userInfo) {
        this.isLoadingData = false;
        this.userInfo = userInfo;
      }
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
