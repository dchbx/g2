import { Component } from '@angular/core';
import { WorkflowResourceService } from "./workflow_resource.service";
import { Workflow } from "../models/workflow";
import { Maybe } from "../../lib/maybe";
import { ActivatedRoute } from "@angular/router";
import { EventMessage } from '../models/event_message';

@Component({
  templateUrl: './workflow_show.component.html',
  providers: [WorkflowResourceService]
})
export class WorkflowShowComponent {
  workflowId : string = "1";
  workflow : Maybe<Workflow> = null;

  constructor(
    private route: ActivatedRoute,
    private workflowResourceService: WorkflowResourceService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.workflowId = params['id']; // (+) converts string 'id' to a number
    });
    // get users from secure api end point
    this.workflowResourceService.get(this.workflowId)
        .subscribe(workflow => {
            this.workflow = workflow;
        });
  }

  headerKeys(event_message : EventMessage) {
    return Object.keys(event_message);
  }
}