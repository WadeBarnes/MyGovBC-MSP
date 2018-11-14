/**
 * The file contents for the current environment will overwrite these during
 * build. Importantly, unlike previous environment setup the environment files
 * do not merge. Each environment file must standalone.
 * 
 * The build system defaults to the dev environment which uses `environment.ts`,
 * but if you do `ng build --env=prod` then `environment.prod.ts` will be used
 * instead. The list of which env maps to which file can be found in
 * `.angular-cli.json`.
 * 
 * https://github.com/angular/angular-cli/wiki/build
 */

// var NODE_ENV = process.env.NODE_ENV || "production"

export const environment = {
    runtimeEnv: "development",
    logHTTPRequestsToConsole: false,
    appConstants: {
        coreApiBaseUrl: 'http://localhost:9000/api',
        serviceName: 'Capability for Work Questionnaire',
        enableLogging: true,
        addressChangeBCUrl: 'https://www.addresschange.gov.bc.ca/',
        logBaseUrl: '/msp/api/logging',
        apiBaseUrl: '/msp/api',
        envServerBaseUrl: '/msp/api/env',
        captchaApiBaseUrl: '/msp/api/captcha',
        // logBaseUrl: 'https://mygovbc-msp-dev.pathfinder.gov.bc.ca/msp/api/logging',
        // apiBaseUrl: 'https://mygovbc-msp-dev.pathfinder.gov.bc.ca/msp/api',
        // captchaApiBaseUrl: '/msp/api/captcha',
        images: {
          maxImagesPerPerson: 50,
          maxWidth: 2600,
          maxHeight: 3300,
          minWidth: 0,
          minHeight: 0,
          maxSizeBytes: 1048576,
          reductionScaleFactor: 0.8,
          acceptMimeType: "image/*",
          convertToMimeType: "image/jpeg",
          jpegQuality: 0.5,
          pdfScaleFactor: 2.0
        },
        mspIsInMaintenanceFlag: false,
        // These values are never used as long as the flag is False.
        mspIsInMaintenanceText: null,
        mspIsInMaintenanceTimes: null,

        /** Set at runtime to be either the internal or external URL as appropriate. */
        assistSDKUrl: null,
        assistSDKExternalUrl: 'https://t1cafex.maximusbc.ca',
        assistPath: '/assistserver/sdk/web/consumer/assist.js',
        // Only accessible via intranet.
        assistSDKInternalUrl: 'https://t1cafex.maximusbc.ca:8443'
      }
}