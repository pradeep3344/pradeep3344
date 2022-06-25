import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserDetailsService {

    public getartist = 'http://localhost:5000/api/artist/get/all/artist';
    public adduser = 'http://localhost:5000/api/artist/add/artist';
    public deleteartist = 'http://localhost:5000/api/artist/delete/artist';
    public updateartist = 'http://localhost:5000/api/artist/update/artist';
    constructor(private http: HttpClient) {

    }

    getArtist() {
        return this.http.get<any>(this.getartist);
    }
    removeUser(user) {
        console.log(user.item_id);
        this.deleteartist = this.deleteartist + '/' + user.item_id;
        console.log(this.deleteartist);
        // tslint:disable-next-line: whitespace
        return this.http.get<any>(this.deleteartist);
      }
    addUser(user: any) {
        return this.http.post<any>(this.adduser, user);
        // tslint:disable-next-line: deprecation
    }
    updateUser(user: any) {
        console.log(user.item_id);
        this.updateartist = this.updateartist + '/' + user._id;
        console.log(this.updateartist);
        return this.http.post<any>(this.updateartist, user);
    }
}
