export class User {
    constructor(private email: string
        , private id: string
        , private _token: string
        , private _tokenExiprtionDate: Date
        ) {}

 get token() {
     if(!this._tokenExiprtionDate || new Date() > this._tokenExiprtionDate) {
         return null;
     }
     return this._token;
 }
}