import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
}

@Injectable()
export class UserInfoService {

  userInfoSubject: BehaviorSubject<UserInfo> = new BehaviorSubject(null);

  constructor() {
    setTimeout(() => {
      this.userInfoSubject.next({
        firstName: 'Костя',
        lastName: 'Шийка',
        email: 'kostya.shyika@gmail.com',
        phone: '+380632348572',
        password: '123456'
      });
    }, 1000);
  }

  editUserInfo(userInfo: UserInfo) {
    const currentUserInfo = this.userInfoSubject.getValue();

    Object.assign(currentUserInfo, userInfo);
    this.userInfoSubject.next(currentUserInfo);
  }

}
