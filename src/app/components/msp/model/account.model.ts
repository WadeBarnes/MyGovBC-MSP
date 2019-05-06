import {UUID} from 'angular2-uuid';
import {ApplicationBase} from './application-base.model';
import {MspImage} from './msp-image';
import {Person, OperationActionType} from './person.model';
import {Relationship, StatusInCanada, Activities, Documents} from './status-activities-documents';
import {PhoneNumber} from './phone.model';


class MspAccountApp implements ApplicationBase {
    set updatedChildren(value: Array<Person>) {
        this._updatedChildren = value;
    }

    private _uuid = UUID.UUID();
    public infoCollectionAgreement: boolean = false;
    authorizationToken: string;
    phnRequired: boolean = false;
    /**
     * Set by the API, not for client use
     */
    referenceNumber: string;
    private _applicant: Person = new Person(Relationship.Applicant);
    public phoneNumber: string;
    documents: MspImage[] = [];
    id: string;

    authorizedByApplicant: boolean;
    authorizedByApplicantDate: Date;
    authorizedBySpouse: boolean;

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

    private _removedSpouse: Person;
    private _removedChildren: Array<Person> = [];
    private _addedChildren: Array<Person> = [];
    private _updatedChildren: Array<Person>  = [];

    /**
     * Returns an array of ALL persons uses in account.
     *
     * Useful, for example, to make sure all PHNs are unique.
     */
    get allPersons(): Array<Person> {
        return [
            this.applicant,
            ...this.addedChildren,
            ...this.updatedChildren,
            ...this.removedChildren,
            this.updatedSpouse,
            this.addedSpouse,
            this.removedSpouse,
        ]
        .filter(x => x); //no 'undefined's
    }
    /*
        for phn valdation purpose
     */
    get allPersonsInPI(): Array<Person> {
        return [
            this.applicant,
            ...this.updatedChildren,
            this.updatedSpouse,
           ]
            .filter(x => x); //no 'undefined's
    }

    /*
       for phn valdation purpose.. Applicatn , ADD/Update/Remove children , Add/Remove Spouse
        Update spouse can have same phn as added/remove spouse
     */
    get allPersonsInDep(): Array<Person> {
        return [
            this.applicant,
            ...this.addedChildren,
            ...this.removedChildren,
            this.addedSpouse,
            this.removedSpouse,
            ...this.updatedChildren,
        ]
            .filter(x => x); //no 'undefined's
    }

    public isMembersPresentWithStatus(personList: Array<Person>, statusInCanada: StatusInCanada): boolean {
       return personList.filter(person => person.status === statusInCanada).length > 0 ;
    }
    public isAnyPRinPersonalInfoPage (): boolean  {
        return this.isMembersPresentWithStatus(this.allPersonsInPI , StatusInCanada.PermanentResident) ;
    }
    public isAnyCanadianCitizeinPersonalInfoPage (): boolean  {
        return this.isMembersPresentWithStatus(this.allPersonsInPI , StatusInCanada.CitizenAdult) ;
    }
    public isAnyTempPersonalInfoPage (): boolean  {
        return this.isMembersPresentWithStatus(this.allPersonsInPI , StatusInCanada.TemporaryResident) ;
    }



    get addedChildren(): Array<Person> {
        return this._addedChildren;
    }

    set addedChildren(value: Array<Person>) {
        this._addedChildren = value;
    }

    get children(): Array<Person> {
        return this._children;
    }

    set children(value: Array<Person>) {
        this._children = value;
    }

    get removedChildren(): Array<Person> {
        return this._removedChildren;
    }

    set removedChildren(value: Array<Person>) {
        this._removedChildren = value;
    }

    private _addedSpouse: Person;
    private _updatedSpouse: Person;
    //DEAM doesnt use chidren as such..its either updated/removed/added children
    private _children: Array<Person>  = [];

    private _accountChangeOptions: AccountChangeOptions = new AccountChangeOptions ();

    removeUpdatedSpouse = () => {
        this.updatedSpouse = null;
    }



    addUpdatedSpouse = (sp: Person) => {
        if (!this.updatedSpouse){
            this.updatedSpouse = sp;
            this.updatedSpouse.operationActionType = OperationActionType.Update;
        }else{
            console.log('spouse for updating already added to your coverage.');
        }
    }

    get hasValidAuthToken(){
        return this.authorizationToken && this.authorizationToken.length > 1;
    }
    addUpdatedChild(): Person {
        const c = new Person(Relationship.ChildUnder24, OperationActionType.Update);
        this._updatedChildren.length < 30 ? this._updatedChildren.push(c) : console.log('No more than 30 children can be added to one application');
        return c;
    }


    removeUpdateChild(idx: number): void {
        const removed = this._updatedChildren.splice(idx, 1);
    }

    get updatedChildren(): Array<Person> {
     //   var updateChildren =  this.children.filter( (child:Person) => child.operationActionType === OperationActionType.Update);
        return this._updatedChildren;
    }

    get applicant(): Person {
        return this._applicant;
    }

    get isUniquePhnsinDependents () {
        const allPhs: string[] = this.allPersonsInDep.filter(x => x) .map(x => x.previous_phn).filter(x => x)  .filter(x => x.length >= 10) ;
        return new Set(allPhs).size === allPhs.length ;
    }

    /*
        to address , unique bug when PI and Dependents change is selected.
        When PI and Dependents page is coming in two pages and if there are duplications ,PI page continue should be enabled.
     */
    get isUniquePhnsInPI () {
        const allPhs: string[] = this.allPersonsInPI.filter(x => x) .map(x => x.previous_phn).filter(x => x)  .filter(x => x.length >= 10) ;
        return new Set(allPhs).size === allPhs.length ;
    }

    get removedSpouse(): Person {
        return this._removedSpouse;
    }

    set removedSpouse(value: Person) {
        this._removedSpouse = value;
        if (value){
            this._removedSpouse.operationActionType = OperationActionType.Remove;
        }
    }

    get addedSpouse(): Person {
        return this._addedSpouse;
    }

    set addedSpouse(value: Person) {
        this._addedSpouse = value;
        if (value){
            this._addedSpouse.operationActionType = OperationActionType.Add;
        }
    }

    get updatedSpouse(): Person {
        return this._updatedSpouse;
    }

    set updatedSpouse(value: Person) {
        this._updatedSpouse = value;
        if (value){
            this._updatedSpouse.operationActionType = OperationActionType.Update;
        }
    }

    set applicant(apt: Person) {
        this._applicant = apt;
    }

    get accountChangeOptions(): AccountChangeOptions {
        return this._accountChangeOptions;
    }

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

    getallSpouses(): Person[] {
        //TODO FIXME Make sure this logic is working when add / remove is implemented for Spouses
       const allSpouses: Person[] = [] ;

        if ((this.accountChangeOptions.personInfoUpdate || this.accountChangeOptions.statusUpdate) && this.updatedSpouse) {
            allSpouses.push(this.updatedSpouse);
        }
        if (this.accountChangeOptions.dependentChange ) {
            if (this.addedSpouse) {
                allSpouses.push(this.addedSpouse);
            }
            if (this.removedSpouse) {
                allSpouses.push(this.removedSpouse);
            }
        }
        return  allSpouses;

    }

    /**
     * logic to get only children with the correspondin options..
     * never send Updated children if PI is not selected
     *
     * @returns {Person[]}
     */
    getAllChildren(): Person[] {
        let allPersons: Person[]  = [];
        if (this.accountChangeOptions.personInfoUpdate || this.accountChangeOptions.statusUpdate) {
            allPersons = [...allPersons, ...this.updatedChildren];
        }
        if (this.accountChangeOptions.dependentChange ) {
            allPersons = [...allPersons, ...this.addedChildren, ...this.removedChildren];
        }
        return  allPersons;
    }
    /*
    Gets all images for applicant, spouse and all children
   */
    getAllImages(): MspImage[] {
        return this.documents;
    }

    hasAnyVisitorInApplication(): boolean {

        if (this.updatedSpouse &&  this.updatedSpouse.isVisitor()) {
            return true;
        }
        if (this.addedSpouse &&  this.addedSpouse.isVisitor()) {
            return true;
        }
        const children: Array<Person> = [...this.addedChildren, ...this.updatedChildren];
        return ((children.findIndex( child => child.isVisitor())) > -1 );

    }

    constructor(){
        this.id = UUID.UUID();
    }

}

class AccountChangeOptions {

    personInfoUpdate: boolean = false;
    dependentChange: boolean = false;
    addressUpdate: boolean = false;

    get nameChangeDueToMarriage(): boolean {
        return this._nameChangeDueToMarriage;
    }

    set nameChangeDueToMarriage(value: boolean) {
        this._nameChangeDueToMarriage = value;
    }

    statusUpdate: boolean = false;
    private _nameChangeDueToMarriage: boolean = false ;

    hasAnyPISelected (): boolean {
        return this.personInfoUpdate || this.statusUpdate;
    }
    hasAllOptionsSelected (): boolean {
        return this.personInfoUpdate && this.dependentChange && this.addressUpdate && this.statusUpdate ;
    }
    hasAllPISelected () {
        return this.personInfoUpdate && this.addressUpdate && this.statusUpdate ;
    }
    hasOnlyAddressSelected () {
        return  this.addressUpdate && !(this.personInfoUpdate  ||  this.dependentChange || this.statusUpdate);
    }

    hasAnyOptionSelected() {
        return  this.addressUpdate || this.personInfoUpdate  ||  this.dependentChange || this.statusUpdate;
    }
}

export {MspAccountApp, AccountChangeOptions, Person};
