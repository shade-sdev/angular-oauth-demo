import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile-info-update',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-info-update.component.html',
  styleUrl: './profile-info-update.component.css'
})
export class ProfileInfoUpdateComponent {

  public userFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.userFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
      placeOfBirth: ['']
    });
  }

  saveUser() {
    this.httpClient.post("http://localhost:8080/api/users", this.userFormGroup?.getRawValue())
      .subscribe();
  }

}
