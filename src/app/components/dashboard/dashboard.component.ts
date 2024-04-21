import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Me} from "../../shared/services/model/me";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ProfileInfoUpdateComponent} from "../profile/profile-info-update/profile-info-update.component";

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
              private router: Router) {
    this.route = this.router.url;
    console.log(this.route);
  }

  ngOnInit(): void {
    this.httpClient.get<Me>("http://localhost:8080/api/me")
      .subscribe({
        next: me => {
          this.me = me;
        },
        error: () => {
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
