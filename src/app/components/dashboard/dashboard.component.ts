import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Me} from "../../shared/services/model/me";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  me: Me | undefined;
  profileDropdownHidden: boolean = true;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.httpClient.get<Me>("http://localhost:8080/me")
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
