import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {ProcessService} from '../../service/process.service';
import {BaseComponent} from '../../common/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import {MspApplication, Person} from '../../model/application.model';
import { MspDataService } from '../../service/msp-data.service';
import {Relationship} from '../../model/status-activities-documents';

@Component({
  selector: 'msp-spouse-info',
  templateUrl: './spouse-info.component.html',
  styleUrls: ['./spouse-info.component.scss']
})
export class SpouseInfoComponent extends BaseComponent implements OnInit {
  static ProcessStepNum = 2;
  lang = require('./i18n');
  Relationship: typeof Relationship = Relationship;
  public buttonClass: string = 'btn btn-primary';


  constructor(private dataService: MspDataService, private _router: Router, private _processService: ProcessService, private cd: ChangeDetectorRef) { 
      super(cd);
  }

  ngOnInit() {
    this.initProcessMembers(SpouseInfoComponent.ProcessStepNum, this._processService); 
  }

  nextStep(){
    this._processService.setStep(2, true);
    this._router.navigate(['/msp/application/child-info']);
  
  }

  addSpouse = () => {
    const sp: Person = new Person(Relationship.Spouse);
    this.dataService.getMspApplication().addSpouse(sp);
  }

  removeSpouse(event: Object): void{
    // console.log('remove spouse ' + JSON.stringify(event));
    this.dataService.getMspApplication().removeSpouse();
    this.dataService.saveMspApplication();
  }

  get application(): MspApplication {
    return this.dataService.getMspApplication();
  }
  get applicant(): Person {
    return this.dataService.getMspApplication().applicant;
  }

  get spouse(): Person {
    return this.dataService.getMspApplication().spouse;
  }

  onChange(values: any){
    this.dataService.saveMspApplication();
  }
  
  documentsReady(): boolean {
    return this.dataService.getMspApplication().spouseDocumentsReady;
  }
  
  checkAnyDependentsIneligible(): boolean {
    const target = [this.dataService.getMspApplication().applicant, this.dataService.getMspApplication().spouse , ...this.dataService.getMspApplication().children];
    return target.filter(x => x)
        .filter(x => x.ineligibleForMSP).length >= 1;
  }



}
