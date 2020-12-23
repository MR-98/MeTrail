import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  sidebarOpen = false;
  currentUser;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 800px)'
    ]).subscribe(result => {
      if (result.matches) {
        // mobilny widok
        const sidebar = document.getElementById('sidebar');
        if (sidebar != null) {
          sidebar.style.zIndex = '20';
          this.sidebarHide();
        }
      }
    });

    this.breakpointObserver.observe([
      '(min-width: 800px)'
    ]).subscribe(result => {
      if (result.matches) {
        // normalny widok
        const sidebar = document.getElementById('sidebar');
        if (sidebar != null) {
          sidebar.style.zIndex = 'auto';
          this.sidebarShow();
        }
      }
    });
  }



  onClick() {
    if (this.sidebarOpen) {
      this.sidebarHide();
    } else {
      this.sidebarShow();
    }
  }

  sidebarShow() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.marginLeft = '0px';
    sidebar.style.zIndex = '1000';
    this.sidebarOpen = true;
  }

  sidebarHide() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.marginLeft = '-270px';
    this.sidebarOpen = false;
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
