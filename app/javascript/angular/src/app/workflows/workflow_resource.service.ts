import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkflowIndexEntry } from './workflow_index_entry';

@Injectable()
export class WorkflowResourceService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<WorkflowIndexEntry[]>('/api/workflows');
  }
}