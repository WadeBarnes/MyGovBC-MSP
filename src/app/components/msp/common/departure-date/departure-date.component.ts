import {Component, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {BaseComponent} from '../base.component';


@Component({
  selector: 'msp-departure-date',
  templateUrl: './departure-date.component.html',
  styleUrls: ['./departure-date.component.scss']
})
export class MspDepartureDateComponent extends BaseComponent {

  lang = require('./i18n');

  // Create today for comparison in check later
  today = moment();

  @Input() futureDate: boolean;
  @Input() showError: boolean;
  @Input() year: number;
  @Output() yearChange = new EventEmitter<number>();
  @Input() month: number;
  @Output() monthChange = new EventEmitter<number>();
  @Input() day: number;
  @Output() dayChange = new EventEmitter<number>();
  @Input() departureLabel: string = this.lang('./en/index.js').departureLabel;
  @Output() onChange = new EventEmitter<any>();

  @ViewChild('formRef') form: NgForm;
  // departure date might have restirctions on the months. ie have you departed in the next 6 months.pass 6 here then
  @Input() maxMonthsRange: number;
    @Input() maxMonthsRangeErrorMsg: string;

  constructor(private cd: ChangeDetectorRef) {
    super(cd);
  }

  // Parse person's date
  inputDate() {
    return moment({
      year: this.year,
      month: this.month - 1, // moment use 0 index for month :(
      day: this.day,
    });
  }

  /**
   * Determine if date of birth is valid for the given person
   *
   * @returns {boolean}
   */
  isCorrectFormat(): boolean {

    // Validate
    if (!this.inputDate().isValid()) {
      return false;
    }

    return true;
  }

  // deaprture date has months restriction. It could be either six months or 12 months depenidng on the question.
  isBeforeNMonths(): boolean {
    if (!this.maxMonthsRange || this.maxMonthsRange == 0) {
      return true;
    }
    const dateAfterNMonths = moment().add(this.maxMonthsRange, 'months') ;
      if (this.inputDate().isAfter(dateAfterNMonths)) {
          return false;
      }
      return true;
  }

  futureCheck(): boolean {

    if (this.futureDate){
      return true;
    }
    // Check not in future
    if (this.inputDate().isAfter(this.today)) {
      return false;
    }

    return true;
  }

  isValid(): boolean {
    return this.isCorrectFormat() && this.futureCheck() && this.isBeforeNMonths();
  }
}
