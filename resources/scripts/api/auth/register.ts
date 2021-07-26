import http from '@/api/http';

export interface RegisterResponse {
    complete: boolean;
}
export interface RegisterData {
    username: string;
    password: string;
    email: string;
    nom: string;
    prenom: string;
    recaptchaData?: string | null;
}

export default ({ username, password, email, nom, prenom, recaptchaData }: RegisterData): Promise<RegisterResponse> => {
    return new Promise((resolve, reject) => {
        http.post('/auth/register', {
            username,
            password,
            email,
            nom,
            prenom,
            'g-recaptcha-response': recaptchaData,
        })
            .then(response => {
                if (!(response.data instanceof Object)) {
                    return reject(new Error('Une erreur interne c\'est produite.'));
                }

                if(response.data.data.complete){
                    return resolve({
                        complete: response.data.data.complete,
                    });
                } else {
                    return resolve({
                        complete: response.data.data.complete,
                        reason: response.data.data.reason,
                    });
                }
                
            })
            .catch(reject);
    });
};
