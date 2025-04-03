export class Appointment{
    private _appointmentId: number;
    private _patientName: string;
    private _animalType: string;
    private _ownerName: string;                
    private _ownerSurname: string;
    private _appointmentDate: string;
    private _appointmentTime: string;
    private _appointmentDuration: number;

    constructor(
        appointmentId: number,
        patientName: string,
        animalType: string,
        ownerName: string,
        ownerSurname: string,
        appointmentDate: string,
        appointmentTime: string,
        appointmentDuratino: number
    ){
        this._appointmentId = appointmentId;
        this._patientName = patientName;
        this._animalType = animalType;
        this._ownerName = ownerName;
        this._ownerSurname = ownerSurname;
        this._appointmentDate = appointmentDate;
        this._appointmentTime = appointmentTime;
        this._appointmentDuration = appointmentDuratino;
    }

    public get appointmentId(): number{
        return this._appointmentId;
    }
    public set appointmentId(appointmentId: number){
        this._appointmentId = appointmentId;
    }

    public get patientName(): string{
        return this._patientName;
    }
    public set patientName(patientName: string){
        this._patientName = patientName;
    }

    public get animalType(): string{
        return this._animalType;
    }
    public set animalType(animalType: string){
        this._animalType = animalType;
    }

    public get ownerName(): string{
        return this._ownerName;
    }
    public set ownerName(ownerName: string){
        this._ownerName = ownerName;
    }

    public get ownerSurname(): string{
        return this._ownerSurname;
    }
    public set ownerSurname(ownerSurname: string){
        this._ownerSurname = ownerSurname;
    }

    public get appointmentDate(): string{
        return this._appointmentDate;
    }
    public set appointmentDate(appointmentDate: string){
        this._appointmentDate = appointmentDate;
    }

    public get appointmentTime(): string{
        return this._appointmentTime;
    }
    public set appointmentTime(appointmentTime: string){
        this._appointmentTime = appointmentTime;
    }

    public get appointmentDuration(): number{
        return this._appointmentDuration;
    }
    public set appointmentDuration(appointmentDuration: number){
        this._appointmentDuration = appointmentDuration;
    }

}