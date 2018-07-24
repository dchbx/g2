import { Component } from '@angular/core';
import { Workflow } from "./models/workflow";

@Component({
  templateUrl: './templates/workflows/workflows_index.component.html'
})
export class WorkflowsIndexComponent {
  workflows : Array<Workflow> = new Array<Workflow>()
}
