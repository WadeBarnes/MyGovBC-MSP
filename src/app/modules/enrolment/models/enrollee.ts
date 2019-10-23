import { ICanadianStatus } from '../../msp-core/components/canadian-status/canadian-status.component';
import { BasePersonDto, BasePerson } from '../../../models/base-person';
import { StatusInCanada, CanadianStatusReason } from '../../msp-core/models/canadian-status.enum';
import { Relationship } from '../../../models/relationship.enum';
import { Address } from 'moh-common-lib';
import { SupportDocumentsDto, SupportDocuments } from '../../msp-core/models/support-documents.model';
import { AddressDto } from '../../../models/address.dto';

export class Enrollee extends BasePerson implements ICanadianStatus {

  // Canadian status component
  status: StatusInCanada;
  currentActivity: CanadianStatusReason;
  relationship: Relationship;
  clearData(x: any): void {
    console.log('clearData: ', x);
  }

  hasNameChange: boolean;
  nameChangeDocs: SupportDocuments = new SupportDocuments();

  // Moving information
  madePermanentMoveToBC: boolean;
  livedInBCSinceBirth: boolean;
  movedFromProvinceOrCountry: string;

  // Arrival in dates (BC/Canaada)
  arrivalToBCDate: Date;
  arrivalToCanadaDate: Date;

  // Out of Province within last 12 months for more than 30 days
  outsideBCFor30Days: boolean;
  departureReason: string;
  departureDestination: string;
  oopDepartureDate: Date;
  oopReturnDate: Date;

  // health numbers
  healthNumberFromOtherProvince: string;
  hasPreviousBCPhn: boolean;
  previousBCPhn: string;

  // Armed Forces
  hasBeenReleasedFromArmedForces: boolean;
  dischargeDate: Date;

  // School information for full-time students
  fullTimeStudent: boolean;
  inBCafterStudies: boolean;

   // For children 19-24, we need the school name and address
  schoolName: string;
  schoolAddress: Address = new Address();
  schoolCompletionDate: Date;

  // If school out BC, require departure date
  departureDateForSchool: Date;

  constructor( rel?: Relationship) {
    super();
    if ( rel !== null ) {
      this.relationship = rel;
    }
  }

  // Helper methods
  get isApplicant() {
    return this.relationship === Relationship.Applicant;
  }

  get isOveragedChild() {
    return this.relationship === Relationship.Child19To24;
  }

  get isProvinceMove() {
    return this.currentActivity === CanadianStatusReason.MovingFromProvince;
  }

  get isCountryMove() {
    return this.currentActivity === CanadianStatusReason.MovingFromCountry;
  }

  get isLivingWithoutMSP() {
    return this.currentActivity === CanadianStatusReason.LivingInBCWithoutMSP;
  }

  get isCanadianResident() {
    return this.status === StatusInCanada.CitizenAdult;
  }

  get isPermanentResident() {
    return this.status === StatusInCanada.PermanentResident;
  }

  get isTemporaryResident() {
    return this.status === StatusInCanada.TemporaryResident;
  }
}

export class EnrolleeDto extends BasePersonDto {

  status: StatusInCanada;
  currentActivity: CanadianStatusReason;
  relationship: Relationship;

  hasNameChange: boolean;

  // SupportDocuments
  nameChangeDocs: SupportDocumentsDto;

  // Moving information
  madePermanentMoveToBC: boolean;
  livedInBCSinceBirth: boolean;
  movedFromProvinceOrCountry: string;

   // Arrival in dates (BC/Canaada)
   arrivalToBCDate: number;
   arrivalToCanadaDate: number;

   // Health numbers
   healthNumberFromOtherProvince: string;
   hasPreviousBCPhn: boolean;
   previousBCPhn: string;

  // Out of Province within last 12 months for more than 30 days
  outsideBCFor30Days: boolean;
  departureReason: string;
  departureDestination: string;
  oopDepartureDate: number;
  oopReturnDate: number;

  // Armed Forces
  hasBeenReleasedFromArmedForces: boolean;
  dischargeDate: number;

  // School information for full-time students
  fullTimeStudent: boolean;
  inBCafterStudies: boolean;

  // For children 19-24, we need the school name and address
  schoolName: string;
  schoolAddress: AddressDto;
  schoolCompletionDate: number;
  departureDateForSchool: number;
}
