import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  fileurl: string;
  [x: string]: any;
  selecetdFile: File;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  users: any;
  userForm = false;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm = false;
  editedUser: any = {};
  email = '';
  password = '';
  name = '';
  login = 'false';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.login = localStorage.getItem('login');
    if (!this.login) {
      this.login = 'false';
    }
    this.userService.getArtist().subscribe(res => {
      this.dropdownList = res;
      console.log(res);

    });
    // tslint:disable-next-line: semicolon
    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.userService.getUsersFromData().subscribe(res => {
      this.users = res;
    });
  }
  OnUploadFile(event) {
    this.selecetdFile = event.target.files[0];
    // Upload file here send a Form data
    const uploadFormData = new FormData();
    uploadFormData.append('image', this.selecetdFile, this.selecetdFile.name);
    console.log(`+++++++${uploadFormData}+++++++`);
    this.userService.addImage(uploadFormData).subscribe(res => {

      console.log(res);
      this.fileurl = res;

    });

    }
  onItemSelect(item: any) {
    console.log(item);

    this.selectedItems.push(item);
  }
  onSelectAll(items: any) {
    console.log(items);
    // this.selectedItems.push(items);
  }

  getUsers() {
    return this.userService.getUsersFromData();
  }

  showEditUserForm(user: User) {
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
  }

  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;

  }


  signin() {
    const data = {
      email: this.email,
      password: this.password
    };
    console.log(this.email + '++++++++++++++++++++++' + this.password);
    this.userService.SignIp(data).subscribe(res => {
      window.localStorage.setItem('login', 'true' );
      console.log(res);
    });
  }

  

  signup() {
    const data = {
      email: this.email,
      name: this.name,
      password: this.password
    };
    console.log(this.email + '++++++++++++++++++++++' + this.password + '+++++++++++++++++++++++++' + this.name);
    this.userService.SignUp(data).subscribe(res => {
      window.localStorage.setItem('login', 'true' );
      console.log(res);
    });
  }

  saveUser(user: User) {
    if (this.isNewUser) {
      console.log(user);
      console.log(this.selectedItems);
      const data = {
        song_name: user.firstName,
        dor: user.lastName,
        artist_id: this.selectedItems,
        image: this.fileurl
      };

      // add a new user
      this.userService.addUser(data).subscribe(res => {


        console.log(res);

      });
    }
    this.userForm = false;
  }



  updateUser() {
    this.userService.updateUser(this.editedUser);
    this.editUserForm = false;
    this.editedUser = {};
  }

  removeUser(user: User) {
    this.userService.removeUser(user).subscribe(res => {

    });
  }

  cancelEdits() {
    this.editedUser = {};
    this.editUserForm = false;
  }

  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }

}
