import { IPhoto } from './IPhoto';

export interface Iuser {
    Id: number;
    username: string;
    Gender: string;
    Age: number;
    KnownAs: string;
    Created: Date;
    LastActive: Date;
    Introduction?: string;
    LookingFor?: string;
    Interests?: string;
    City: string;
    Country: string;
    PhotoUrl: string;
    Photo?: IPhoto[];
}
