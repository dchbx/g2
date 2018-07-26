import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workflow } from '../models/workflow';

@Injectable()
export class WorkflowResourceService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Workflow[]>('/workflows');
  }
}