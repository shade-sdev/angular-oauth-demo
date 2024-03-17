import {Component} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private oauthWindow: Window | null = null;

  constructor(private router: Router) {
  }

  login(provider: string): void {
    this.openLoginWindow(provider);
  }

  openLoginWindow(provider: string) {
    this.oauthWindow = window.open(`http://localhost:8080/oauth2/authorization/${provider}`, 'OAuth2 Login', 'width=600,height=400');

    const intervalId = setInterval(() => {
      this.loadUser(intervalId);
    }, 1000);
  }

  loadUser(intervalId: any): void {
    try {
      if (this.oauthWindow?.origin !== 'http://localhost:4200') {
        return;
      }
      setTimeout(() => {
        this.oauthWindow?.close();
        clearInterval(intervalId);

        this.router.navigate(['/dashboard']).then(r => r);
      }, 1000);
    } catch (e) {
      // not redirected to same origin yet
    }
  }

}
