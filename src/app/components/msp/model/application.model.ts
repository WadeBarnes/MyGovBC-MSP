import {Address} from 'moh-common-lib';
import { Relationship, StatusInCanada, Activities, Documents } from './status-activities-documents';
import { Person } from './person.model';
import { UUID } from 'angular2-uuid';
import { MspImage } from './msp-image';
import { ApplicationBase } from './application-base.model';
import { PhoneNumber } from './phone.model';

/**
 * Overall MSP Application Process Data
 */
class MspApplication implements ApplicationBase {

  private _uuid = UUID.UUID();
  infoCollectionAgreement: boolean = false;
  authorizationToken: string;
  phnRequired: boolean = false;

  /**
   * Set by the API, not for client use
   */
  referenceNumber: string;

  private _applicant: Person = new Person(Relationship.Applicant);

  private _children: Array<Person> = [];
  /** Either the current spouse, or an application to add a new spouse */
  private _spouse: Person;
  /** An application to remove a spouse.  */
  private _spouseRemoval: Person;

  unUsualCircumstance: boolean;


  get uuid(): string {
    return this._uuid;
  }

  regenUUID() {
    this._uuid = UUID.UUID();

    /**
     * Each image will have a uuid that starts with application uuid
     * followed by [index]-of-[total]
     */
    const all = this.getAllImages();

    all.forEach(image => {
      image.uuid = UUID.UUID();
    });
  }
  get applicant(): Person {
    return this._applicant;
  }

  set applicant(apt: Person) {
    this._applicant = apt;
  }
  get spouse(): Person {
    return this._spouse;
  }

  get children(): Array<Person> {
    return this._children;
  }

  get isUniquePhns () {
        const allPhs: string[] = this.allPersons.filter(x => x).map(x => x.previous_phn).filter(x => x)  .filter(x => x.length >= 10) ;
        return new Set(allPhs).size === allPhs.length ;
  }

  set children(children: Array<Person>) {
    this._children = children;
  }

  addSpouse = (sp: Person) => {
    if (!this._spouse) {
      this._spouse = sp;
    } else {
      console.log('spouse already added to your coverage.');
    }
  }

  addChild(relationship: Relationship): Person {
    const c = new Person(relationship);
    if (relationship === Relationship.Child19To24) {
      //child between 19-24 must be a full time student to qualify for enrollment
      c.fullTimeStudent = true;
    }
    this._children.length < 30 ? this._children.push(c) : console.log('No more than 30 children can be added to one application');
    return c;
  }

  removeChild(idx: number): void {
    const removed = this._children.splice(idx, 1);
  }

  removeSpouse(): void {
    this._spouse = null;
  }

  /**
   * Returns an array of ALL persons uses in application.
   *
   * Useful, for example, to make sure all PHNs are unique.
   */
  get allPersons(): Array<Person> {
    return [
      this.applicant,
      ...this.children,
      this.spouse,
    ]
    .filter(x => x); //no 'undefined's
  }

  // Address and Contact Info
  public residentialAddress: Address = new Address();
  public mailingSameAsResidentialAddress: boolean = true;
  public mailingAddress: Address = new Address();
  public phoneNumber: string;


  /**
   * validator for phone number
   * @returns {boolean}
   */
  get phoneNumberIsValid(): boolean {

    // Phone is optional
    if (this.phoneNumber == null ||
      this.phoneNumber.length < 1) {
      return true;
    }

    // But if it's provided is must be valid
    const regEx = new RegExp(PhoneNumber.PhoneNumberRegEx);
    return regEx.test(this.phoneNumber);
  }

  authorizedByApplicant: boolean;
  authorizedByApplicantDate: Date;
  authorizedBySpouse: boolean;

  // Outside BC question
  _outsideBCFor30Days: boolean;

  /**
   * Set this flag if any family member has been outside BC for more than 30 days
   */
  get outsideBCFor30Days(): boolean {
    return (!!this.applicant && this.applicant.beenOutSideOver30Days)
      || (!!this._spouse && this._spouse.beenOutSideOver30Days)
      || this.childBeenOutsideBCFor30Days();
  }

  set outsideBCFor30Days(out: boolean) {
    this._outsideBCFor30Days = out;
  }

  private childBeenOutsideBCFor30Days(): boolean {
    return this.children.filter(child => {
      return child.beenOutSideOver30Days;
    }).length > 0;
  }

  /*
    Gets all images for applicant, spouse and all children
   */
  getAllImages(): MspImage[] {
    let allImages = Array<MspImage>();

    // add applicant
    allImages = allImages.concat(this.applicant.documents.images);

    if (this.spouse) {
      allImages = allImages.concat(this.spouse.documents.images);
    }
    for (const child of this.children) {
      allImages = allImages.concat(child.documents.images);
    }

    return allImages;
  }

  /**
   * Finds a person based on UUID
   * @param uuid
   * @returns {any}
   */
  findPerson(uuid: string): Person {
    if (this.applicant.uuid === uuid) {
      return this.applicant;
    }
    if (this.spouse) {
      if (this.spouse.uuid === uuid) {
        return this.spouse;
      }
    }
    for (const child of this.children) {
      if (child.uuid === uuid) {
        return child;
      }
    }
    return null;
  }


  get documentsReady(): boolean {
    const applicantDocsAvail = this.applicant.hasDocuments;
    let spouseDocsAvail = true;
    let kidsDocsAvail = true;
    if (this._spouse) {
      spouseDocsAvail = this._spouse.hasDocuments;
    }

    const kidsWithNoDocs = this._children.filter(kid => {
      return !kid.hasDocuments;
    });
    kidsDocsAvail = kidsWithNoDocs.length === 0;

    return applicantDocsAvail && spouseDocsAvail && kidsDocsAvail;
  }

  get childDocumentsReady(): boolean {
    
    let kidsDocsAvail = true;
    const kidsWithNoDocs = this._children.filter(kid => {
      return !kid.hasDocuments;
    });

    kidsDocsAvail = kidsWithNoDocs.length === 0;

    return kidsDocsAvail;
  }

  get spouseDocumentsReady(): boolean {

    let spouseDocsAvail = true;
    if (this._spouse) {
      spouseDocsAvail = this._spouse.hasDocuments;
    }
    return spouseDocsAvail;
  }





  get hasValidAuthToken() {
    return this.authorizationToken && this.authorizationToken.length > 1;
  }
  constructor() {
    // Set some defaults
    this.residentialAddress.province = 'British Columbia';
    this.residentialAddress.country = 'Canada';
  }
}

export { MspApplication, Person, StatusInCanada, Activities };
