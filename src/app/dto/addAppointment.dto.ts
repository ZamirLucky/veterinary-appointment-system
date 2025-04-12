export class AddAppointment{
    private _patientName: string; 
    private _animalType: string; 
    private _ownerIdCardNumber: string; 
    private _ownerName: string; 
    private _ownerSurname: string; 
    private _ownerContactNumber: string; 
    private _appointmentDate: string;  
    private _appointmentTime: string; 
    private _appointmentDuration: number; 
    private _reasonForAppointment: string;

    constructor(
        patientName: string,
        animalType: string,
        ownerIdCardNumber: string,
        ownerName: string,
        ownerSurname: string,
        ownerContactNumber: string,
        appointmentDate: string,
        appointmentTime: string,
        appointmentDuration: number,
        reasonForAppointment: string
    ) {
        this._patientName = patientName;
        this._animalType = animalType;
        this._ownerIdCardNumber = ownerIdCardNumber;
        this._ownerName = ownerName;
        this._ownerSurname = ownerSurname;
        this._ownerContactNumber = ownerContactNumber;
        this._appointmentDate = appointmentDate;
        this._appointmentTime = appointmentTime;
        this._appointmentDuration = appointmentDuration;
        this._reasonForAppointment = reasonForAppointment;
    }
    
    public get patientName(): string {
        return this._patientName;
    }
    public set patientName(value: string) {
        this._patientName = value;
    }
    
    public get animalType(): string {
        return this._animalType;
    }
    public set animalType(value: string) {
        this._animalType = value;
    }
    
    public get ownerIdCardNumber(): string {
        return this._ownerIdCardNumber;
    }
    public set ownerIdCardNumber(value: string) {
        this._ownerIdCardNumber = value;
    }
    
    public get ownerName(): string {
        return this._ownerName;
    }
    public set ownerName(value: string) {
        this._ownerName = value;
    }
    
    public get ownerSurname(): string {
        return this._ownerSurname;
    }
    public set ownerSurname(value: string) {
        this._ownerSurname = value;
    }
    
    public get ownerContactNumber(): string {
        return this._ownerContactNumber;
    }
    public set ownerContactNumber(value: string) {
        this._ownerContactNumber = value;
    }
    
    public get appointmentDate(): string {
        return this._appointmentDate;
    }
    public set appointmentDate(value: string) {
        this._appointmentDate = value;
    }

    public get appointmentTime(): string {
        return this._appointmentTime;
    }
    public set appointmentTime(value: string) {
        this._appointmentTime = value;
    }
    
    public get appointmentDuration(): number {
        return this._appointmentDuration;
    }
    public set appointmentDuration(value: number) {
        this._appointmentDuration = value;
    }
    
    public get reasonForAppointment(): string {
        return this._reasonForAppointment;
    }
    public set reasonForAppointment(value: string) {
        this._reasonForAppointment = value;
    }
}