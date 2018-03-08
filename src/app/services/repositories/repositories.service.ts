import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpSentEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

export interface RepositoryListContainer {
  pagelen: number,
  size: number,
  values: Repository[],
  page: number,
  next?: string,
  previous?: string
} 

export interface BranchesListContainer {
  pagelen: number,
  size: number,
  values: Branch[],
  page: number,
  next?: string,
  previous?: string
}

export interface Branch {
  name: string
}

export interface Repository {
  name:string,
  slug:string
}

@Injectable()
export class RepositoriesService {

  repositoryPageCache: any = {};

  constructor(private http:HttpClient) { }

  getAllRepositories(organization: string):Observable<RepositoryListContainer> {
    var observable = Observable.create((observer) => {
      this.getPage((pageNumber)=> { return this.getPageOfRepositories(organization, pageNumber) }, observer, 1);
    });
    
    return observable
  }

  getAllBranches(organization: string, repository: string):Observable<BranchesListContainer> {
    var observable = Observable.create((observer) => {
      this.getPage((pageNumber)=> { return this.getPageOfBranches(organization, repository, pageNumber) }, observer, 1);
    });
    
    return observable
  }

  private getPage(pageableFunction, observer, pageNumber:number):void {
    var next = '';

    pageableFunction(pageNumber).subscribe(values => {
      observer.next(values);
      next = values.next;
      
    }, () => {}, 
    () => {
      if(next != undefined){
        this.getPage(pageableFunction, observer, pageNumber+1);
      }
    });
  }

  getPageOfBranches(organization: string, repository: string, page: number):Observable<BranchesListContainer> {
    let url = `https://api.bitbucket.org/2.0/repositories/mastercontrol/${repository}/refs/branches?page=${page}`;
    return this.http.get<BranchesListContainer>(url, this.getOptions())
                .pipe(
                  map( item => <BranchesListContainer>item.valueOf())
                );
  }

  getPageOfRepositories(organization: string, page: number):Observable<RepositoryListContainer> {
    let url = `https://api.bitbucket.org/2.0/repositories/mastercontrol?page=${page}`;

    if(this.repositoryPageCache.hasOwnProperty(url)) {
      return Observable.of(this.repositoryPageCache[url]);
    } else {
      return this.http.get<RepositoryListContainer>(url, this.getOptions())
                .pipe( 
                  map( item => this.repositoryPageCache[url] = item ),
                  map( item => <RepositoryListContainer>item.valueOf())
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
