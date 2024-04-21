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
      username: ['', Validators.required],
      email: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
      placeOfBirth: ['']
    });
  }

  saveUser() {
    this.httpClient.put(`http://localhost:8080/api/users/${this.userFormGroup.get('username')?.value}`, this.userFormGroup?.getRawValue())
      .subscribe();
  }

}
