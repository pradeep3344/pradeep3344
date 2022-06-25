import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public adduser = 'http://localhost:5000/api/song/add/song';
  public addimage = 'http://localhost:5000/api/song/add/image';
  public getartist = 'http://localhost:5000/api/artist/get/all/artist';
  public getsongs = 'http://localhost:5000/api/song/get/all/song';
  public deletesong = 'http://localhost:5000/api/song/delete/song';
  public getuser = 'http://localhost:5000/api/user/login';
  public signup = 'http://localhost:5000/api/user/signup';
  private upersons = [
    {
      id: 1,
      firstName: 'Durgesh',
      lastName: 'Pal'
    },
    {
      id: 2,
      firstName: 'Ankur',
      lastName: 'Pal'
    }
  ];
  constructor(private http: HttpClient) {

   }

  getUsersFromData() {
    return this.http.get<any>(this.getsongs);
  }

  addUser(user: any) {
    return this.http.post<any>(this.adduser, user);
    // tslint:disable-next-line: deprecation
  }
  addImage(file: any) {
    return this.http.post<any>(this.addimage, file);
  }
  getArtist() {
    return this.http.get<any>(this.getartist);
  }
  updateUser(user: User) {
    const index = this.upersons.findIndex(u => user.id === u.id);
    this.upersons[index] = user;
  }
  removeUser(user) {
    console.log(user._id);
    this.deletesong = this.deletesong + '/' + user._id;
    console.log(this.deletesong);
    // tslint:disable-next-line: whitespace
    return this.http.get<any>(this.deletesong);
  }

  SignIp(data){
    this.getuser = this.getuser + '?email=' + data.email + '&password=' + data.password;
    return this.http.get<any>(this.getuser);
  }

  SignUp(data) {
    return this.http.post<any>(this.signup, data);
  }

}
