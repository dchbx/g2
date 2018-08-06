import { Component } from '@angular/core';
import { CoverageSelectedDispositionReport } from './report_resource';
import { Maybe } from "../../lib/maybe";
import { ReportsResourceService } from "./reports_resource.service";

@Component({
  templateUrl: './reports.component.html',
  providers: [ReportsResourceService]
})
export class ReportsComponent {
  coverageSelectedDispositionReport : Maybe<CoverageSelectedDispositionReport> = null;

  constructor(private reportsResourceService: ReportsResourceService) { }

  ngOnInit() {
    this.reportsResourceService.getCoverageSelectedReport()
        .subscribe(coverageSelectedReport => {
            this.coverageSelectedDispositionReport = coverageSelectedReport;
        });
  }
}