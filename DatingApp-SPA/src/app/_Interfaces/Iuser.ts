import { IPhoto } from './IPhoto';

export interface Iuser {
    id: number;
    username: string;
    gender: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    city: string;
    country: string;
    photoUrl: string;
    photo?: IPhoto[];
}
