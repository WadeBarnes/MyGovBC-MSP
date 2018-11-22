import {TestBed, inject, async} from '@angular/core/testing'
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history.component'
import { MspDataService } from '../../service/msp-data.service';
import { CompletenessCheckService } from '../../service/completeness-check.service';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import {MspApplication} from "../../model/application.model";
import {MspAddressComponent} from "../../common/address/address.component";
import {MspPhoneComponent} from "../../common/phone/phone.component";
import { TypeaheadModule } from 'ngx-bootstrap';
import {MspProvinceComponent} from "../../common/province/province.component";
import {MspDepartureDateComponent} from "../../common/departure-date/departure-date.component";
import {MspReturnDateComponent} from "../../common/return-date/return-date.component";
import {MspCountryComponent} from "../../common/country/country.component";
import {MspCancelComponent} from "../../common/cancel/cancel.component";
import {ModalModule} from "ngx-bootstrap";
import {MspLoggerDirective} from "../../common/logging/msp-logger.directive";
import { MspLogService } from '../../service/log.service';
import { MspValidationService } from '../../service/msp-validation.service';
import { ProcessService } from "../../service/process.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Application Address Component Test', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HistoryComponent, MspAddressComponent, MspPhoneComponent, MspProvinceComponent,
                MspDepartureDateComponent, MspReturnDateComponent, MspCountryComponent,
                MspCancelComponent, MspLoggerDirective],
            imports: [FormsModule, TypeaheadModule, ModalModule.forRoot(), HttpClientModule, RouterTestingModule, LocalStorageModule.withConfig({
                prefix: 'ca.bc.gov.msp',
                storageType: 'sessionStorage'
              })],
            providers: [MspDataService, CompletenessCheckService, MspLogService,MspValidationService, ProcessService
            ]
        })
    });

    it ('should work', () => {
        let fixture = TestBed.createComponent(HistoryComponent);
        
        (fixture.componentInstance as HistoryComponent).mspApplication = new MspApplication();
        
        expect(fixture.componentInstance instanceof HistoryComponent).toBe(true, 'should create HistoryComponent');
    });
})
