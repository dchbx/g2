import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoverageSelectedDispositionReport } from './report_resource';

@Injectable()
export class ReportsResourceService {
  constructor(private http: HttpClient) { }

  getCoverageSelectedReport() {
    return this.http.get<CoverageSelectedDispositionReport>("/api/reports/coverage_selected_disposition.json");
  }
}