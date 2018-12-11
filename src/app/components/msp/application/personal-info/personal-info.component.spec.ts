import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PersonalInfoComponent } from './personal-info.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { MspDataService } from '../../service/msp-data.service';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import {MspPhnComponent} from '../../common/phn/phn.component';
import {MspNameComponent} from '../../common/name/name.component';
import {MspProvinceComponent} from '../../common/province/province.component';
import {MspArrivalDateComponent} from '../../common/arrival-date/arrival-date.component';
import {MspDepartureDateComponent} from '../../common/departure-date/departure-date.component';
import {MspReturnDateComponent} from '../../common/return-date/return-date.component';
import {MspGenderComponent} from '../../common/gender/gender.component';
import {MspDischargeDateComponent} from '../../common/discharge-date/discharge-date.component';
import {MspBirthDateComponent} from '../../common/birthdate/birthdate.component';
import {MspSchoolDateComponent} from '../../common/schoolDate/school-date.component';
import {FileUploaderComponent} from '../../common/file-uploader/file-uploader.component';
import {MspAddressComponent} from '../../common/address/address.component';
import {Mod11CheckValidator} from '../../common/phn/phn.validator';
import { TypeaheadModule } from 'ngx-bootstrap';
import {ThumbnailComponent} from '../../common/thumbnail/thumbnail.component';
import {ModalModule, AccordionModule} from 'ngx-bootstrap';
import {HealthNumberComponent} from '../../common/health-number/health-number.component';
import { CompletenessCheckService } from '../../service/completeness-check.service';
import {MspCountryComponent} from '../../common/country/country.component';
import {MspIdReqModalComponent} from '../../common/id-req-modal/id-req-modal.component';
import {MspOutofBCRecordComponent} from '../../common/outof-bc/outof-bc.component';
import {MspCancelComponent} from '../../common/cancel/cancel.component';
import {MspImageErrorModalComponent} from '../../common/image-error-modal/image-error-modal.component';
import {MspLoggerDirective} from '../../common/logging/msp-logger.directive';
import { MspLogService } from '../../service/log.service';
import {MspValidationService} from '../../service/msp-validation.service';


import {RouterTestingModule} from '@angular/router/testing';

import {CalendarYearFormatter} from '../../common/calendar/calendar-year-formatter.component';
import {CalendarYearValidator} from '../../common/calendar/calendar-year.validator';
import {CalendarDayValidator} from '../../common/calendar/calendar-day.validator';
import { ProcessService } from '../../service/process.service';
import { ServicesCardDisclaimerModalComponent  } from '../../common/services-card-disclaimer/services-card-disclaimer.component';


describe('PersonalInfoComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInfoComponent, PersonalDetailsComponent, MspPhnComponent, MspNameComponent, MspProvinceComponent,
        MspArrivalDateComponent, MspArrivalDateComponent, MspGenderComponent, MspDischargeDateComponent,
        MspBirthDateComponent, MspSchoolDateComponent, FileUploaderComponent, MspAddressComponent,
        Mod11CheckValidator, ThumbnailComponent, HealthNumberComponent, MspCountryComponent, MspIdReqModalComponent,
        MspOutofBCRecordComponent, MspDepartureDateComponent, MspReturnDateComponent, MspCancelComponent,
        MspImageErrorModalComponent, MspLoggerDirective, CalendarYearFormatter, CalendarYearValidator, CalendarDayValidator,
        ServicesCardDisclaimerModalComponent
        ],
      imports: [FormsModule, TypeaheadModule, ModalModule.forRoot(), AccordionModule.forRoot(), HttpClientModule, RouterTestingModule, LocalStorageModule.withConfig({
        prefix: 'ca.bc.gov.msp',
        storageType: 'sessionStorage'
      })],
      providers: [MspDataService, MspLogService, MspValidationService, ProcessService,
        CompletenessCheckService,


      ]
    });
  });
  it ('should work', () => {
    const fixture = TestBed.createComponent(PersonalInfoComponent);
    expect(fixture.componentInstance instanceof PersonalInfoComponent).toBe(true, 'should create PersonalInfoComponent');

  });
});
