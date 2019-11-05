import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private authListenerSubs:Subscription;
  isAuth=false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authListenerSubs=this.authService.getAuthStatus().subscribe((isAuth)=>{
      this.isAuth=isAuth;
    });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
