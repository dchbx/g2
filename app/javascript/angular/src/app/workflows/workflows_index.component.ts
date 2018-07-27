import { Component } from '@angular/core';
import { WorkflowResourceService } from "./workflow_resource.service";
import { WorkflowIndexEntry } from './workflow_index_entry';

@Component({
  templateUrl: './workflows_index.component.html',
  providers: [WorkflowResourceService]
})
export class WorkflowsIndexComponent {
  workflows : Array<WorkflowIndexEntry> = new Array<WorkflowIndexEntry>()

  constructor(private workflowResourceService: WorkflowResourceService) { }

  ngOnInit() {
    // get users from secure api end point
    this.workflowResourceService.getAll()
        .subscribe(workflows => {
            this.workflows = workflows;
        });
  }
}
