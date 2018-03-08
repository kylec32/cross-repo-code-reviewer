import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatchedBanch } from '../app.component';

@Component({
  selector: 'app-matched-branch',
  templateUrl: './matched-branch.component.html',
  styleUrls: ['./matched-branch.component.css']
})
export class MatchedBranchComponent {

  @Input() branchInfo: MatchedBanch;
  @Output() clicked: EventEmitter<MatchedBanch>;

  itemClicked() {
    this.clicked.emit(this.branchInfo);
  }

}
