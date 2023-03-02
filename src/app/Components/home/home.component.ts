import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  image: any;
  username: any;

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.image = localStorage.getItem('image');
    this.username = localStorage.getItem('name');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    public authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
  ) {}

  loginStatus = this.authService.checkLoginStatus();

  logOut() {
    this.authService.logOut();
  }
}
