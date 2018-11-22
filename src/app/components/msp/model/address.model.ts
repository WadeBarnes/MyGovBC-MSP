import * as _ from 'lodash';
//import { Input } from '@angular/core';

class Address {
  // Street number, name and suffix
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;

  // City
  city: string;

  // Full Name
  province: string;

  // canadian postal code
  private _postal: string;

  static PostalCodeBCRegEx = "^[Vv]\\d[ABCEGHJ-NPRSTV-Zabceghj-nprstv-z][ ]?\\d[ABCEGHJ-NPRSTV-Zabceghj-nprstv-z]\\d$";
  static ukpostcodeRegEx= "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})"; //https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive

  // postal accessors
  get postal(): string {
    return this._postal;
  }
  //@Input('postal')
  set postal(value: string) {
    if(!!value){
      this._postal = value.toUpperCase();
    }else {
        this._postal = null;
    }
  }

  // Full english spelling of country
  country: string;

  get hasValue(): boolean {
    return (this.addressLine1 != null);
  }

  get isValid(): boolean {
    // check required
    let isValid = !_.isEmpty(this.addressLine1)
        &&!_.isEmpty(this.city)
        &&!_.isEmpty(this.province)
        &&!_.isEmpty(this.postal)
        &&!_.isEmpty(this.country)

    return isValid;
  }

  get isBCOnly(): boolean {
    let isValid = false;
    if (this.postal &&
      this.postal.length > 0) {
      let regEx = new RegExp(Address.PostalCodeBCRegEx);
      isValid = regEx.test(this.postal);
    }
    return isValid;
  }

  constructor(){
  }

}

export {Address};