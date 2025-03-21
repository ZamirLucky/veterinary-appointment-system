export class Appointment{
    private _id: number;
    private _patientName: string;
    private _animalType: string;
    private _ownerName: string;                
    private _ownerSurname: string;
    private _appointmentDateTime: Date;
    private _appointmentDuration: string;

    constructor(
        id: number,
        pattientNAme: string,
        animalType: string,
        ownerName: string,
        ownerSurname: string,
        appointmentDateTime: Date,
        appointmentDuratino: string
    ){
        this._id = id;
        this._patientName = pattientNAme;
        this._animalType = animalType;
        this._ownerName = ownerName;
        this._ownerSurname = ownerSurname;
        this._appointmentDateTime = appointmentDateTime;
        this._appointmentDuration = appointmentDuratino;

    }

    public get id(): number{
        return this._id;
    }
    public set id(id: number){
        this._id = id;
    }

    public get PatientName(): string{
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
        return this.ownerSurname;
    }
    public set ownersurname(ownerSurname: string){
        this._ownerSurname = ownerSurname;
    }

    public get appointmentDateTime(): Date{
        return this._appointmentDateTime;
    }
    public set appointmentDateTime(appointmentDateTime: Date){
        this._appointmentDateTime = appointmentDateTime;
    }

    public get appointmentDuration(): string{
        return this._appointmentDuration;
    }
    public set appointmentDuration(appointmentDuratino: string){
        this._appointmentDuration = this.appointmentDuration;
    }

}