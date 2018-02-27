import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Diff2Html } from 'diff2html'
import { Diff2HtmlUI } from '../../../node_modules/diff2html/src/ui/js/diff2html-ui'

@Component({
  selector: 'app-diff-viewer',
  template: '<div id="lines"></div>',
  styleUrls: ['./diff-viewer.component.css']
})
export class DiffViewerComponent implements OnInit, OnChanges {  

  @Input() diff: string;

  constructor() {
   }

  ngOnInit() {
    this.refreshDiff();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {  
      if(propName === 'diff'){
        setTimeout(() => { this.refreshDiff(); }, 1000);
        
      }
    }
  }

  private refreshDiff():void {
    if(this.diff != null) {
      // Line Below Need this
      Diff2Html;
      //Diff2Html.getPrettySideBySideHtmlFromDiff(this.diff, {inputFormat: 'diff', showFiles: true, matching: 'lines'});
      let diff2htmlUi = new Diff2HtmlUI({diff: this.diff});
      diff2htmlUi.draw('#lines', {inputFormat: 'json', showFiles: true, matching: 'lines'});
      diff2htmlUi.highlightCode('#lines');
      diff2htmlUi.fileListCloseable('#lines', false);
    }
  }
}
