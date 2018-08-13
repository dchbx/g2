import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkflowIndexResource } from './workflow_index_resource';
import { Workflow } from '../models/workflow';

@Injectable()
export class WorkflowResourceService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<WorkflowIndexResource>('/api/workflows');
  }

  getPage(page: number) {
    var params = new HttpParams().set("page", page.toString());
    return this.http.get<WorkflowIndexResource>('/api/workflows', { params: params} );
  }

  get(workflowId : string) {
    return this.http.get<Workflow>('/api/workflows/' + workflowId + ".json");
  }
}
