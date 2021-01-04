import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm : NgForm;
  defaultSecret = 'pet';
  answer = '';
  genders = ['male', 'female']
  user = {
    username: '',
    email: '',
    secret:'',
    gender :'',
    qusAns:''
  };
  submitted: boolean = false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    /* this.signupForm.setValue({
      gender: "male",
      queAns: "",
      secret: "pet",
      userData: {
        email: "",
        username: suggestedName
      }  
    }); */
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }  
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secret = this.signupForm.value.secret;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }

  /* onSubmit(form: NgForm) {
    console.log(form);
  } */

  
}
