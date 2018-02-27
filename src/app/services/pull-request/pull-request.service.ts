import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PullRequestService {

  constructor(private http:HttpClient) { }


  getPullRequestDiff(organization:String, repository:String, prid:String):Observable<any> {
    return this.http.get("https://api.bitbucket.org/2.0/repositories/syllogisticio/jenkinsagain/pullrequests/32/diff",
                          {...this.getOptions(), 'responseType': 'text'});
  }

  private getOptions():any {

    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic a3lsZWMzMkBnbWFpbC5jb206T3Zlcm5pZ2h0MTBhdGxhc3NpYW4='
      })
    };
  }

}
