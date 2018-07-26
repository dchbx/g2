import { Component } from '@angular/core';
import { Workflow } from "../models/workflow";
import { WorkflowResourceService } from "./workflow_resource.service";

@Component({
  templateUrl: './workflows_index.component.html',
  providers: [WorkflowResourceService]
})
export class WorkflowsIndexComponent {
  workflows : Array<Workflow> = new Array<Workflow>()

  constructor(private workflowResourceService: WorkflowResourceService) { }

  ngOnInit() {
    // get users from secure api end point
    this.workflowResourceService.getAll()
        .subscribe(workflows => {
            this.workflows = workflows;
        });
  }
}
