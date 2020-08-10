import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  constructor(private actrouter:ActivatedRoute,private loginservice:LoginService,private router:Router) { }

  ngOnInit() {
  console.log(this.actrouter.snapshot.params);
  // this.loginservice.facebooktoken(this.actrouter.snapshot.params.token);

  }

}
