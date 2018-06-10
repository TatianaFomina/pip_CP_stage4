import {Component} from "@angular/core";
import {ProfileService} from "../_services/profile.service";
//import {AuthenticationService} from "../_services/authentication.service";

export class Person{
    name: string;
    middleName: string;
    surname: string;
    sex: boolean;
    dateOfBirth: string;
}

export class Contacts{
    homeAddress : string;
    job : string;
    jobPhoneNumber : string;
    cellphoneNumber : string;
    //date of creating
}

@Component({
    selector: 'profile',

    templateUrl: './profile.component.html',
    styleUrls: ['../../../css/profile.css'],
    providers: [ProfileService]
})
export class ProfileComponent {
    constructor(private profileService: ProfileService) {
    }
    username : string = sessionStorage.getItem("username");
    person : Person = new Person;
    contacts : Contacts = new Contacts;
    gender : string;

    date: Date;
    dateLoaded: Promise<boolean>;

    imageSrc = require('../../../static/user.png');

    ngOnInit(){

        //getting personal data
        this.profileService.getPerson(this.username)
            .finally(() => {alert("in finally, date: " + this.person.dateOfBirth)})
            .subscribe((person : Person) => {
                //alert("Before assigning: date: " + person.dateOfBirth + " gender: " + person.sex);
                this.person = person;
                //alert("date: " + this.person.dateOfBirth + " gender: " + this.person.sex);
                this.gender = this.person.sex ? "Male" : "Female";
                //alert("in subscribe: " + person.dateOfBirth);
            }/*, () => console.log("error"),
                () => alert("When complete: date: " + this.person.dateOfBirth + " gender: " + this.person.sex)*/);


        //getting parent contacts
        this.profileService.getContacts(this.username)
            .subscribe((contacts : Contacts) => {
                alert("Contacts recieved: " + contacts.homeAddress);
                this.contacts = contacts;
            })
    }



}