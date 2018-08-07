import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkflowIndexResource } from './workflow_index_resource';
import { Workflow } from '../models/workflow';

@Injectable()
export class WorkflowResourceService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<WorkflowIndexResource>('/api/workflows');
  }

  getPage(page) {
    return this.http.get<WorkflowIndexResource>('/api/workflows', { params: { page: page } });
  }

  get(workflowId : string) {
    return this.http.get<Workflow>('/api/workflows/' + workflowId + ".json");
  }
}
