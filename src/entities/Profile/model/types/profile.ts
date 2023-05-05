import { Country } from 'entities/Country';
import { Currency } from 'entities/Curency';

export interface Profile {
        id?: string,
        firstname?: string,
        lastname?: string,
        age?: string,
        currency?: Currency,
        country?: Country,
        city?: string,
        username?: string,
        avatar?: string

}
export interface ProfileSchema {
    data?: Profile;
    formData?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean
}
