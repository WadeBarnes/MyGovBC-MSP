import {Component, Inject, ViewChild, ElementRef, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import {MspApplication} from "../../model/application.model";

import { MspDataService } from '../../service/msp-data.service';
import {Gender, Person} from "../../model/person.model";
import {StatusInCanada, Activities, Relationship} from "../../model/status-activities-documents";
import {ProcessService} from "../../service/process.service";
import { environment } from '../../../../../environments/environment';
import { MspLogService } from '../../service/log.service';

@Component({
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit{
  lang = require('./i18n');

  application: MspApplication;
  captchaApiBaseUrl:string;
  @ViewChild(NgForm) form: NgForm;

  constructor(private dataService: MspDataService,
              private _router: Router,
              private processService:ProcessService,
              private logService: MspLogService) {
    this.application = this.dataService.getMspApplication();
    this.captchaApiBaseUrl = environment.appConstants.captchaApiBaseUrl;
  }


  ngOnInit(){
   /* let oldUUID = this.application.uuid;
    this.application.regenUUID();
    this.dataService.saveMspApplication();
    console.log('EA uuid updated: from %s to %s', oldUUID, this.dataService.getMspApplication().uuid);*/
  }
  
  applicantAuthorizeOnChange(event: boolean) {
    // console.log('applicant authorization: ', event);
    this.application.authorizedByApplicant = event;

    if (this.application.authorizedByApplicant) {
      this.application.authorizedByApplicantDate = new Date();
    }
    this.dataService.saveMspApplication();
    
  }
  spouseAuthorizeOnChange(event: boolean) {
    this.application.authorizedBySpouse = event;
    this.dataService.saveMspApplication();
  }


  get questionApplicant(){
    return this.lang('./en/index.js').doYouAgreeLabel.replace('{name}', this.applicantName);
  }
  get questionSpouse(){
    return this.lang('./en/index.js').doYouAgreeLabel.replace('{name}', this.spouseName);
  }
  get applicantName(){
    return this.application.applicant.fName + ' ' + this.application.applicant.lName;
  }
  get spouseName(){
    return this.application.spouse.firstName + ' ' + this.application.spouse.lastName;
  }

  handleFormSubmission(evt:any){
    // console.log('review form submitted, %o', evt);
    if(this.application.hasValidAuthToken){
      console.log('Found valid auth token, transfer to sending screen.');
      this.processService.setStep(4, true);
      // this.logService.log({name: "Application - Review Page Before Submit (after CAPTCHA)"},"Application-Captcha Success")
      this._router.navigate(['/msp/application/sending']);
    }else{
      console.log('Auth token is not valid');
    }
  }
}