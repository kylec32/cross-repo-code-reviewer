import { Component } from '@angular/core';
import { PullRequestService } from './services/pull-request/pull-request.service';
import { Observable } from 'rxjs/Observable';
import { RepositoriesService } from './services/repositories/repositories.service';
import { Repository } from './services/repositories/repositories.service';

export interface MatchedBanch {
  repository: string,
  slug: string,
  branch: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDiff:Observable<string>;
  private repositories:Repository[] = [];
  filterText:string;
  foundRepositoriesArray:MatchedBanch[] = [];
  foundRepositories:Observable<MatchedBanch[]> = Observable.of([]);

  constructor(private pullRequestService: PullRequestService, private reponsitoryService: RepositoriesService) {
    //this.getRepos();
    
    this.foundRepositories = Observable.of([<MatchedBanch>{'repository':'checklist-core','branch':'S-012341-this-is-awesome'}, <MatchedBanch>{'repository':'Angulare Core App','branch':'S-02341'}, <MatchedBanch>{'repository':'MasterControl','branch':'S-02341-do-stuff'}]);

    this.currentDiff = this.pullRequestService.getPullRequestDiff("","","");
  }

  itemClicked(clicked):void {
    console.log(clicked);
  }

  filter() {
    this.repositories.forEach(repository => {
      this.reponsitoryService.getAllBranches("",repository.slug).subscribe(
        (branches) => {
          branches.values.filter((branch) => { 
            return branch.name.indexOf(this.filterText) > 0
          }).forEach(value => {
            this.foundRepositoriesArray.push(<MatchedBanch>{'repository': repository.name, 'slug': repository.slug, 'branch' : value.name});
            this.foundRepositories = Observable.of(this.foundRepositoriesArray);
          });
        }
      )
    });
  }

  getRepos() {
    this.repositories = [];
    this.reponsitoryService.getAllRepositories("").subscribe(stuff => {
      
      this.repositories = this.repositories.concat(stuff.values);
      //this.foundRepositories = Observable.of(this.repositories);
      this.run();
    });
  }

  run(){
    console.log(this.repositories);
  }
}
