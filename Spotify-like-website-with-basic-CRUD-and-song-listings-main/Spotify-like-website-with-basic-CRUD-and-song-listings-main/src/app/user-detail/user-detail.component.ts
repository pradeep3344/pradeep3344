import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserDetailsService } from '../services/user.detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  users: any;
  newUser: any = {};
  userForm = false;
  login = 'false';
  isNewUser: boolean;
  editUserForm = false;
  editedUser: any = {};

  constructor(private userDetailService: UserDetailsService) { }

  ngOnInit() {
    this.login = localStorage.getItem('login');
    if (!this.login) {
      this.login = 'false';
    }
    this.userDetailService.getArtist().subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }

  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;

  }

  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }

  removeUser(user) {
    this.userDetailService.removeUser(user).subscribe(res => {

    });
  }

  cancelEdits() {
    this.editedUser = {};
    this.editUserForm = false;
  }

  showEditUserForm(user: User) {
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    console.log(user);
    this.editedUser = user;
  }

  saveUser(user) {
    if (this.isNewUser) {
      console.log(user);
      const data = {
        name: user.firstName,
        dob: user.lastName,
        bio: user.bio
      };

      // add a new user
      this.userDetailService.addUser(data).subscribe(res => {


        console.log(res);

      });
    }
    this.userForm = false;
  }

  updateUser(user) {
    if (this.editedUser) {

      const data = {
        _id: user.item_id,
        name: user.item_text,
        dob: user.dob,
        bio: user.bio
      };
      this.userDetailService.updateUser(data).subscribe(res => {


        console.log(res);

      });
    }
    this.editUserForm = false;
    // this.userDetailService.updateUser(this.editedUser);
    // this.editUserForm = false;
    // this.editedUser = {};
  }

}
