import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Me} from "../../shared/services/model/me";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ProfileInfoUpdateComponent} from "../profile/profile-info-update/profile-info-update.component";
import {HotToastService} from "@ngneat/hot-toast";
import {ResponseMessage} from "../../shared/services/model/ResponseMessage";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgClass,
    ProfileInfoUpdateComponent,
    NgIf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  me: Me | undefined;
  profileDropdownHidden: boolean = true;

  route: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private alertService: HotToastService) {
    this.route = this.router.url;
    console.log(this.route);
  }

  ngOnInit(): void {
    this.httpClient.get<Me>("http://localhost:8080/api/me")
      .subscribe({
        next: me => {
          this.me = me;
        },
        error: (err: HttpErrorResponse) => {
          this.alertService.error("429", {autoClose: true, position: 'top-right', dismissible: true});
        },
        complete: () => {
        }
      })
  }

  discord() {
    this.httpClient.get<ResponseMessage>("http://localhost:8080/api/discord")
      .subscribe({
        next: response => {
          this.alertService.success(response.message, {
            autoClose: true,
            duration: 5000,
            position: 'top-right',
            dismissible: true
          });
        },
        error: (err: HttpErrorResponse) => {
          this.alertService.error(err.status.toString(), {autoClose: true, position: 'top-right', dismissible: true});
        },
        complete: () => {
        }
      })
  }

  admin() {
    this.httpClient.get<ResponseMessage>("http://localhost:8080/api/admin")
      .subscribe({
        next: response => {
          this.alertService.success(response.message, {
            autoClose: true,
            duration: 5000,
            position: 'top-right',
            dismissible: true
          });
        },
        error: (err: HttpErrorResponse) => {
          this.alertService.error(err.status.toString(), {autoClose: true, position: 'top-right', dismissible: true});
        },
        complete: () => {
        }
      })
  }

  user() {
    this.httpClient.get<ResponseMessage>("http://localhost:8080/api/user")
      .subscribe({
        next: response => {
          this.alertService.success(response.message, {
            autoClose: true,
            duration: 5000,
            position: 'top-right',
            dismissible: true
          });
        },
        error: (err: HttpErrorResponse) => {
          this.alertService.error(err.status.toString(), {autoClose: true, position: 'top-right', dismissible: true});
        },
        complete: () => {
        }
      })
  }

  logout() {
    this.httpClient.post("http://localhost:8080/logout", {}).subscribe({
      complete: () => {
        this.router.navigate(["login"]).then(value => value);
      },
      error: () => {
        this.router.navigate(["login"]).then(value => value);
      }
    })
    this.profileDropdownHidden = !this.profileDropdownHidden;
  }

}
