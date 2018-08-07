import { Component } from '@angular/core';
import { WorkflowResourceService } from "./workflow_resource.service";
import { WorkflowIndexResource } from './workflow_index_resource';

@Component({
  templateUrl: './workflows_index.component.html',
  providers: [WorkflowResourceService]
})
export class WorkflowsIndexComponent {
  workflows : WorkflowIndexResource = {
    total_pages: 1,
    count: 0,
    total: 0,
    page: 1,
    per_page: 20,
    workflows: []
  };

  constructor(private workflowResourceService: WorkflowResourceService) { }

  ngOnInit() {
    this.workflowResourceService.getAll()
        .subscribe(workflows => {
            this.workflows = workflows;
        });
  }

  navigateToPage(page : number, per_page: number) {
    console.log("HEYA");
  }
}