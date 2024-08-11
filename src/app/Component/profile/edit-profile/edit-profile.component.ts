import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-profile.component.html',
  providers: [UserService],
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  genders = ["Male", "Female"];

  profilePicture: string | ArrayBuffer | null = "Images/profile-picture.jpg";
  tempProfilePicture: string | ArrayBuffer | null = "Images/profile-picture.jpg";
      ;
  userId = "mohammed-adel";
  userName = "Mohammed Adel";
  email: string | null = "mohammedadel@gmail.com";
  gender: string | null = "Male";
  address: string | null = "Somewhere St.";

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.tempProfilePicture = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('File Error');
    }
  }

  saveDone: boolean | null = null;
  constructor(public UService: UserService){}

  userForm = new FormGroup({
    profilePicture: new FormControl(""),
    email: new FormControl(this.email, Validators.email),
    password: new FormControl("", Validators.required),
    newPassword: new FormControl(""),
    confirmNewPassword: new FormControl(""),
    gender: new FormControl(this.gender),
    address: new FormControl(this.address)
  });
  get isValidEmail(){return this.userForm.controls.email.valid;}
  get isValidConfermNewPassword(){
    return this.userForm.controls.newPassword.value === this.userForm.controls.confirmNewPassword.value;
  }

  save(password: string | null){
    if(this.userForm.valid && this.isValidConfermNewPassword)
    {
      let update: any = {
        "profilePicture": this.tempProfilePicture,
        "email": this.userForm.controls.email.value,
        "gender": this.userForm.controls.gender.value,
        "address": this.userForm.controls.address.value
      };
      if(this.userForm.controls.newPassword.value !=="")
      {
        update["password"] = this.userForm.controls.newPassword.value;
      }
      this.UService.EditUserById(this.userId, password, update).subscribe(
          response => {
            let res: any = response;
            if("error" in res) this.saveDone = false;
            else
            {
              this.saveDone = true;
              this.profilePicture = this.tempProfilePicture,
              this.email = this.userForm.controls.email.value;
              this.gender = this.userForm.controls.gender.value;
              this.address = this.userForm.controls.address.value;
            }
          },
          error => {
            console.error(error);
          }
        );
    }
  }

  reset()
  {
    this.userForm.patchValue({
      email: this.email,
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      gender: this.gender,
      address: this.address
    })
    this.tempProfilePicture = this.profilePicture;
  }

  removeProfilePicture()
  {
    this.profilePicture = "Images/profile-picture.jpg";
  }
}

