import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MspPerson } from '../../../../components/msp/model/msp-person.model';
import { Relationship } from '../../../../models/status-activities-documents';

import * as moment from 'moment';
import { BaseComponent } from '../../../../models/base.component';

@Component({
  selector: 'msp-birthdate',
  template: `
    <form #formRef="ngForm" novalidate>
      <common-date
        [label]="dateLabel"
        [restrictDate]="'past'"
        [(date)]="person.dateOfBirth"
        (dateChange)="onChange.emit($event)"
      ></common-date>
    </form>
  `,
  styleUrls: ['./birthdate.component.scss']
})
export class MspBirthDateComponent extends BaseComponent {
  @ViewChild('formRef') form: NgForm;

  public dateLabel = 'Date of Birth';

  // Create today for comparison in check later
  today: any;
  @Input() isForAccountChange: boolean = false;
  @Input() isACL: boolean = false;
  @Input() person: MspPerson;
  @Input() showError: boolean;
  @Output() onChange = new EventEmitter<any>();

  constructor(cd: ChangeDetectorRef) {
    super(cd);
    console.log(this.person);
  }

  ngAfterViewInit(): void {
    this.person.dateOfBirth = {
      year: this.person.dob_year,
      month: this.person.dob_month,
      day: this.person.dob_day
    };

    this.form.valueChanges.subscribe(() => {
      if (this.person.dateOfBirth) {
        if (this.person.dateOfBirth.month) {
          this.person.dob_month = this.person.dateOfBirth.month;
        }
        if (this.person.dateOfBirth.day) {
          this.person.dob_day = this.person.dateOfBirth.day;
        }
        if (this.person.dateOfBirth.year) {
          this.person.dob_year = this.person.dateOfBirth.year;
        }
      }
    });
  }

  /**
    setYearValueOnModel(value: number) {
        this.person.dob_year = value;
    }

    setDayValueOnModel(value: number) {
        this.person.dob_day = value;
    }


     * Determine if date of birth is valid for the given person
     *
     *

    isCorrectFormat(): boolean {

        // Validate
        if (this.person &&
            this.person.dob &&
            this.person.dob.isValid()) {
            return true;
        } else {
            return false;
        }

    }

    isInTheFuture(): boolean {
        return this.person.dob.isAfter(this.today);
    }

    tooFarInThePast(): boolean {
        const far = (this.today.get('y') - this.person.dob.get('y')) > 150;

        return far;
    }

    ageCheck(): boolean {
        // Applicant rules
        if (this.person.relationship === Relationship.Applicant) {
            // must be 16 or older for applicant
            const tooYoung = this.person.dob.isAfter(moment().subtract(16, 'years'));
            return !tooYoung;
        }
        // ChildUnder19 rules
        else if (this.person.relationship === Relationship.ChildUnder19) {
            // must be less than 19 if not in school
            const lessThan19 = this.person.dob.isAfter(moment().subtract(19, 'years'));
            return lessThan19;

        }
        // ChildUnder24 rules - Account Management Child
        else if (this.person.relationship === Relationship.ChildUnder24) {
            const tooOld = this.person.dob.isBefore(moment().subtract(24, 'years'));
            return !tooOld;

        }
        else if (this.person.relationship === Relationship.Child19To24) {
            // if child student must be between 19 and 24

            const tooYoung = this.person.dob.isAfter(moment().subtract(19, 'years'));
            const tooOld = this.person.dob.isBefore(moment().subtract(24, 'years'));

            if (tooYoung) {
                // console.log('This child is less than 19 years old.')
            }
            if (tooOld) {
                // console.log('This child is older than 24.')
            }
            const ageInRange = !tooYoung && !tooOld;
            return ageInRange;
        } else {
            return true;
        }
    }

    isValid(): boolean {
        return this.isCorrectFormat() && !this.isInTheFuture() && !this.tooFarInThePast() && this.ageCheck();
    }
    */
}
