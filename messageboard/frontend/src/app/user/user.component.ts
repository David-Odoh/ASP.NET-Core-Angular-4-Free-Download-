import { WebService } from './../web.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  model = {
    firstName: '',
    lastName: ''
  }

  constructor(private webservice: WebService) { }

  ngOnInit() {
    this.webservice.getUser().subscribe(res => {
        this.model.firstName = res.firstName;
        this.model.lastName = res.lastName;
    });
  }

  saveUser(userData) {
      this.webservice.saveUser(userData).subscribe();
  }

}
