import { WebService } from './../web.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
   constructor(private webservice: WebService, private route: ActivatedRoute) { }

   ngOnInit() {
     let name = this.route.snapshot.params.name;
     this.webservice.getMessages(name);
     this.webservice.getUser().subscribe();
   }
  }