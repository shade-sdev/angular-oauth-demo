import {Component} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private oauthWindow: Window | null = null;

  protected loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  formLogin(): void {
    const body = this.encodeFormData(this.loginForm.getRawValue());
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    this.httpClient.post('http://localhost:8080/form-login', body, {headers: headers})
      .subscribe({
        complete: () => {
          this.router.navigate(['/dashboard']).then(r => r);
        }
      })
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

  private encodeFormData(data: any): string {
    const params = new URLSearchParams();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params.set(key, data[key]);
      }
    }

    return params.toString();
  }

}
