import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Person} from "../register/step1.component";
import {Subject} from "rxjs/Subject";

@Injectable()
export class RegistrationService{

    constructor(private http: HttpClient){ };

    //to pass data between step1 and step2
    private subject = new Subject<any>();

    getPersonId(person : Person) : Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        const body = JSON.stringify({name: person.name, middle_name: person.middle_name,
                                            surname: person.surname, sex: person.gender,
                                                    date_of_birth: person.date_of_birth});
        return this.http.post('./login/person_exists', body, httpOptions).map(resp => {return resp}) ;
    }

    sendData(message: number) {
        this.subject.next(message);
        alert("data sent: "+message);
    }

    clearData() {
        this.subject.next();
    }

    getData(): Observable<number> {
        return this.subject.asObservable();
    }

}