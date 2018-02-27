import { Component } from '@angular/core';
import { PullRequestService } from './services/pull-request/pull-request.service';
import { Observable } from 'rxjs/Observable';
import { RepositoriesService } from './services/repositories/repositories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentDiff:Observable<any>;
  private repositories:any[] = [];
  filterText:String;
  foundRepositories:Observable<any[]> = Observable.of([]);

  constructor(private pullRequestService: PullRequestService, private reponsitoryService: RepositoriesService) {
    //this.getRepos();
    
    this.currentDiff = this.pullRequestService.getPullRequestDiff("","","");
  }

  filter() {
    console.log(this.filterText);
  }

  getRepos() {
    this.repositories = [];
    this.reponsitoryService.getAllRepositories("").subscribe(stuff => {
      
      this.repositories = this.repositories.concat(stuff.values);
      this.foundRepositories = Observable.of(this.repositories);
      this.run();
    });
  }

  run(){
    console.log(this.repositories);
  }
}
