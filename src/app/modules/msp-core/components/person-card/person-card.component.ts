import {Component, Input} from '@angular/core';
import {MspPerson} from '../../../../components/msp/model/msp-person.model';
import { Router } from '@angular/router';
import { StatusInCanada, CanadianStatusReason } from '../../models/canadian-status.enum';
import { getCountryDescription, getProvinceDescription, SimpleDate } from 'moh-common-lib';
import { getStatusStrings, getStatusReasonStrings } from '../canadian-status/canadian-status.component';
import * as moment from 'moment';
import { Relationship } from '../../../../models/relationship.enum';

@Component({
  selector: 'msp-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class MspPersonCardComponent {

  public dateFormat = 'MMMM D, YYYY';

  lang = require('./i18n');

  status: string[] = getStatusStrings();

  statusReason: string[] = getStatusReasonStrings();


  @Input() person: MspPerson;
  @Input() editRouterLink: string;
  @Input() customTitle: string;
  @Input() customLinkTitle: string;
  @Input() accountCard: boolean = false;

  constructor(private _router: Router) {
  }

  ngOnInit() {

  }

  editPersonalInfo() {
    console.log(this.editRouterLink);
    this._router.navigate([this.editRouterLink]);
  }

  get movedFromLabel(): string {
    if (this.person.status === StatusInCanada.TemporaryResident ||
      this.person.currentActivity === CanadianStatusReason.MovingFromCountry) {
      return 'Moved from country';
    }
    else {
      return 'Moved from province';
    }
  }

  get fileLabel(): string {

    if (this.person.assistYearDocs !== null && this.person.assistYearDocs.length > 0 ) {
      if (this.person.assistYearDocs.length > 1) {
        return 'Files';
      } else if (this.person.assistYearDocs.length < 2) {
        return 'File';
      }
    }
  }

  get movedFromProvinceOrCountry() {
    if (this.person.currentActivity === CanadianStatusReason.MovingFromCountry ) {
      return getCountryDescription( this.person.movedFromProvinceOrCountry );
    }
    return getProvinceDescription( this.person.movedFromProvinceOrCountry );
  }

  formatDateField( dt: SimpleDate ) {
    return moment( {
      year: dt.year,
      month: dt.month - 1,
      day: dt.day
    }).format( this.dateFormat );
  }

  get hasMarriageDate(): boolean {

    const hasDate = Object.keys(this.person.marriageDate).filter( x => this.person.marriageDate[x] );
    return hasDate.length === 3 && this.person.relationship === Relationship.Spouse;
  }
}
