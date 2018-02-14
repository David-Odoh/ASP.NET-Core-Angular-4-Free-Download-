import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from './../web.service';


@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {

     constructor(private webservice: WebService, private auth: AuthService) { }

    message = {
      owner: this.auth.name,
      text: ''
    };

    post() {
      this.webservice.postMessage(this.message);
    }
}
