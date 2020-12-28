import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
  }

  getAvatar() {
    let avatarId = localStorage.getItem("avatarId");
    if(avatarId != undefined) {
      return "assets/avatars/"+avatarId+".png";
    } else {
      return "assets/avatars/avatar1.png";
    }
  }

}
