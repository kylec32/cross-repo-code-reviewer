import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Injectable()
export class RepositoriesService {

  repositoryPageCache: any = {};

  constructor(private http:HttpClient) { }

  getAllRepositories(organization: string):Observable<any> {
    var observable = Observable.create((observer) => {
      this.innerRequest(organization, observer, 1);
    });
    
    return observable
  }

  private innerRequest(organization:string, observer, pageNumber:number):void {
    var next = '';

    this.getPageOfRepositories(organization, pageNumber).subscribe(values => {
      observer.next(values);
      next = values.next;
      
    }, () => {}, 
    () => {
      if(next != undefined){
        this.innerRequest(organization, observer, pageNumber+1);
      }
    });
  }

  getPageOfRepositories(organization: string, page: number):Observable<any> {
    let url = `https://api.bitbucket.org/2.0/repositories/mastercontrol?page=${page}`;

    if(this.repositoryPageCache.hasOwnProperty(url)) {
      return Observable.of(this.repositoryPageCache[url]);
    } else {
      return this.http.get(url, this.getOptions())
                .pipe( 
                  map( item => this.repositoryPageCache[url] = item )
                );
    }
    
  }

  private getOptions():any {

    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic a2NhcnRlckBtYXN0ZXJjb250cm9sLmNvbTpPdmVybmlnaHQ2MTU='
      })
    };
  }


}
