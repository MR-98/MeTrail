import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  sidebarOpen = true;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 800px)'
    ]).subscribe(result => {
      if (result.matches) {
        //mobilny widok
        let sidebar = document.getElementById("sidebar");
        sidebar.style.zIndex = '1';
        this.sidebarHide();
      }
    });

    this.breakpointObserver.observe([
      '(min-width: 800px)'
    ]).subscribe(result => {
      if (result.matches) {
        //normalny widok
        let sidebar = document.getElementById("sidebar");
        sidebar.style.zIndex = 'auto';
        this.sidebarShow();
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
    let sidebar = document.getElementById("sidebar");
    sidebar.style.marginLeft = '0px';
    this.sidebarOpen = true;
  }

  sidebarHide() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.marginLeft = '-270px';
    this.sidebarOpen = false;
  }
}
