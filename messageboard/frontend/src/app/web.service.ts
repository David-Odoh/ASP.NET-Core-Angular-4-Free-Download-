import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class WebService {
  BASE_URL = 'http://localhost:1654/api';

  private messageStore = [];

  private messageSubject = new Subject();

  messages = this.messageSubject.asObservable();

  constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService) {
    this.getMessages('');
  }

  getMessages(user) {
      user = (user) ? '/' + user : '';
      this.http.get(this.BASE_URL + '/messages' + user).subscribe( response => {
          this.messageStore = response.json();
          this.messageSubject.next(this.messageStore);
      }, error => {
          this.handleError('Unable to retrieve messages');
      });
  }

  async postMessage(message) {
    try {
      let response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
      this.messageStore.push(response.json());
      this.messageStore = response.json();
    } catch (error) {
      this.handleError('Unable to post message');
    }
    }

    getUser() {
      return this.http.get(this.BASE_URL + '/Users/me', this.auth.tokenHeader).map(res => res.json());
    }

    saveUser(userData) {
      return this.http.post(this.BASE_URL + '/Users/me', userData, this.auth.tokenHeader).map(res => res.json());
    }

    private handleError(error) {
      console.error(error);
      this.sb.open(error, 'close', {duration: 2000});
    }
}
