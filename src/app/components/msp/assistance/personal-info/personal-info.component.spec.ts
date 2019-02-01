import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AssistancePersonalInfoComponent } from './personal-info.component';
import { MspDataService } from '../../service/msp-data.service';
import { CompletenessCheckService } from '../../service/completeness-check.service';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import {MspPhnComponent} from '../../common/phn/phn.component';
import {MspNameComponent} from '../../common/name/name.component';
import {MspBirthDateComponent} from '../../common/birthdate/birthdate.component';
import {MspAddressComponent} from '../../common/address/address.component';
import {Mod11CheckValidator} from '../../common/phn/phn.validator';
import {MspProvinceComponent} from '../../common/province/province.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import {AssistancePersonalDetailComponent} from './personal-details/personal-details.component';
import {MspPhoneComponent} from '../../common/phone/phone.component';
import {MspGenderComponent} from '../../common/gender/gender.component';
import {MspCountryComponent} from '../../common/country/country.component';
import {MspCancelComponent} from '../../common/cancel/cancel.component';
import {ModalModule} from 'ngx-bootstrap';
import {MspLoggerDirective} from '../../common/logging/msp-logger.directive';
import { MspLogService } from '../../service/log.service';
import {MspValidationService} from '../../service/msp-validation.service';

import {CalendarYearFormatter} from '../../common/calendar/calendar-year-formatter.component';
import {CalendarYearValidator} from '../../common/calendar/calendar-year.validator';
import {CalendarDayValidator} from '../../common/calendar/calendar-day.validator';
import { ProcessService } from '../../service/process.service';
import { SinCheckValidator } from '../../common/sin/sin.validator';
import {HttpClientModule} from '@angular/common/http';
import {TextMaskModule} from 'angular2-text-mask';

describe('AssistancePersonalInfoComponent Test', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistancePersonalInfoComponent, AssistancePersonalDetailComponent,
        MspPhnComponent, MspNameComponent, MspPhoneComponent,
        MspBirthDateComponent, MspAddressComponent, MspProvinceComponent, MspCountryComponent,
        Mod11CheckValidator, MspGenderComponent, MspCancelComponent, MspLoggerDirective,
        CalendarYearFormatter, CalendarYearValidator, CalendarDayValidator, SinCheckValidator],
      imports: [TextMaskModule, FormsModule, TypeaheadModule, ModalModule.forRoot(), HttpClientModule, RouterTestingModule, LocalStorageModule.withConfig({
        prefix: 'ca.bc.gov.msp',
        storageType: 'sessionStorage'
      })],
      providers: [MspDataService, CompletenessCheckService, MspLogService, MspValidationService, ProcessService,


      ]
    });
  });
  it ('should work', () => {
    const fixture = TestBed.createComponent(AssistancePersonalInfoComponent);
    expect(fixture.componentInstance instanceof AssistancePersonalInfoComponent).toBe(true, 'should create AssistancePersonalInfoComponent');

  });
});
