/**
 * Documents for account management changes the user may upload as supporting
 * documentation, e.g. passport.
 */
enum Documents {
    CanadianBirthCertificate,   //0
    CanadianPassport,           //1
    CanadianCitizenCard, //2
    RecordOfLanding, //3
    PermanentResidentCard, //4
    WorkPermit, //5
    StudyPermit, //6
    VisitorVisa, //7
    PassportWithDiplomaticFoil, //8
    MarriageCertificate, //9
    ChangeOfNameCertificate, //10
    //new docs for account management
    DivorceDecreeRequiredForRetro, //11
    SeparationAgreement, //12
    LandedImmigrationDocs, //13
    ReligiousWorkerPermit, //14
    ReligiousConfirmationOrder, //15
    FoilDiplomaticPassport, //16
    AdoptionVerification, //17
    CurrentImigrationDocs, //18
    BCDriverLicense, //19
    GenderDesignationAdult, //20
    GenderDesignationMinor, //21
    WaiverParentalConsent, //22
    PhysicianConfirmationForGenderChange, //23
    MaritalStatusSignedWrittenStatement, //24
    NotarizedStatmentAffidavit, //25
    ConfirmationofPermanentResidence, //26
    AuthorisationToWorkInCanada , //27
    NoticeOfDecisionForConventionRefugeeStatus , //28
    VisitorPermitSpouse , //29
    VisitorPermitChild , //30
    ForeignLongFormBirthCertificate , //31
    NewlyAdoptedKidContactHIBC,
    SwornAffidavit,
    SignedStatement,
    DivorceDecree
}


/**
 * Account change has a different structure for documents section..
 * This can be modified if requirements changes
 */
class AccountDocumentRules {

    static availiableDocuments(): DocumentGroup[] {

        //TODO! NOT DONE. MISSING EXAMPLE DOCS
        const addSpouseOrChildren: DocumentGroup = new DocumentGroup('Add Spouse or Child(ren)', [
            Documents.CanadianBirthCertificate,
            Documents.CanadianCitizenCard,
            Documents.CanadianPassport,
            Documents.LandedImmigrationDocs,
            Documents.PermanentResidentCard,
            Documents.StudyPermit,
            Documents.WorkPermit,
            Documents.ReligiousConfirmationOrder,
            Documents.ReligiousWorkerPermit,
            Documents.AdoptionVerification


        ]);
        //TODO! NOT DONE. MISSING EXAMPLE DOCS
        const removeSpouseOrChildren: DocumentGroup = new DocumentGroup('Remove Spouse or Child(ren)', [
            Documents.DivorceDecree,
            Documents.SeparationAgreement,
            Documents.NotarizedStatmentAffidavit,
            Documents.MaritalStatusSignedWrittenStatement
        ]);

        const updateBirthdate: DocumentGroup = new DocumentGroup('Update or Correct Birthdate', [
            Documents.CanadianBirthCertificate,
            Documents.CanadianCitizenCard,
            Documents.CanadianPassport,
            Documents.LandedImmigrationDocs,
            Documents.PermanentResidentCard,
            Documents.CurrentImigrationDocs
        ]);

        const updateName: DocumentGroup = new DocumentGroup('Update or Correct Name', [
            Documents.CanadianBirthCertificate,
            Documents.CanadianCitizenCard,
            Documents.CanadianPassport,
            Documents.ChangeOfNameCertificate,
            Documents.LandedImmigrationDocs,
            Documents.MarriageCertificate,
            Documents.PermanentResidentCard,
            Documents.CurrentImigrationDocs,
            Documents.DivorceDecree,
            Documents.SeparationAgreement,

        ]);

        const statusInCanada: DocumentGroup = new DocumentGroup('Update or Confirm Status in Canada', [
            Documents.CanadianPassport,
            Documents.LandedImmigrationDocs,
            Documents.PermanentResidentCard,
            Documents.StudyPermit,
            Documents.WorkPermit,
            Documents.ReligiousConfirmationOrder,
            Documents.CurrentImigrationDocs,
            Documents.FoilDiplomaticPassport,
            Documents.ReligiousWorkerPermit,

        ]);

        const genderCorrection: DocumentGroup = new DocumentGroup('Correct Gender', [
            Documents.BCDriverLicense,
            Documents.CanadianBirthCertificate,
            Documents.CanadianCitizenCard,
            Documents.CanadianPassport,
            Documents.LandedImmigrationDocs,
            Documents.PermanentResidentCard,
            Documents.CurrentImigrationDocs
        ]);

        const genderChange: DocumentGroup = new DocumentGroup('Change Gender Designation', [

            Documents.CanadianBirthCertificate,
            Documents.CanadianPassport,
            Documents.GenderDesignationAdult,
            Documents.GenderDesignationMinor,
            Documents.PhysicianConfirmationForGenderChange,
            Documents.WaiverParentalConsent
        ]);

        return [
            addSpouseOrChildren,
            removeSpouseOrChildren,
            updateBirthdate,
            updateName,
            statusInCanada,
            genderCorrection,
            genderChange
        ];
    }
}

/**
 * A collection of documents which satisfy an account change, e.g. adding a
 * dependent, getting married/divorced, updating status in Canada.  Usually one
 * of the documents is sufficient for the user to provide.
 */
class DocumentGroup {
    /** Human readable name, displayed to user. */
    title: String;
    /** A list of all possible documents which satisfy the requirement for the DocumentGroup */
    docs: Documents[];
    label: String;

    constructor(title: String, docs: Documents[] , label?: String ) {
        this.title = title;
        this.docs = docs;
        this.label = label ;
    }
}


export {AccountDocumentRules, Documents, DocumentGroup};
