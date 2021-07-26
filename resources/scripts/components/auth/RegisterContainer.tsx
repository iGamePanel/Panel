import React, { useEffect, useRef, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import RegisterFormContainer from '@/components/auth/RegisterFormContainer';
import { useStoreState } from 'easy-peasy';
import { Formik, FormikHelpers } from 'formik';
import register from '@/api/auth/register';
import { object, string } from 'yup';
import Field from '@/components/elements/Field';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import Reaptcha from 'reaptcha';
import useFlash from '@/plugins/useFlash';

interface Values {
    username: string;
    password: string;
    email: string;
    nom: string;
    prenom: string;
}

const RegisterContainer = ({ history }: RouteComponentProps) => {
    const ref = useRef<Reaptcha>(null);
    const [ token, setToken ] = useState('');

    const { clearFlashes, clearAndAddHttpError, addFlash } = useFlash();
    const { enabled: recaptchaEnabled, siteKey } = useStoreState(state => state.settings.data!.recaptcha);

    useEffect(() => {
        clearFlashes();
    }, []);

    const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes();

        if (recaptchaEnabled && !token) {
            ref.current!.execute().catch(error => {
                console.error(error);

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });

            return;
        }

        register({ ...values, recaptchaData: token })
            .then(response => {
                if (response.complete) {
                    window.location.replace('/');
                    return;
                } else if (!response.complete){
                    if(response.reason == 'disabled'){
                        addFlash({ type: 'error', title: 'Erreur', message: 'Les inscriptions sont actuellement fermé !' });
                    }
                }
            })
            .catch(error => {
                console.error(error);

                setToken('');
                if (ref.current) ref.current.reset();

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={{ username: '', password: '', prenom: '', nom: '', email: '' }}
            validationSchema={object().shape({
                username: string().required('Un pseudo est requis pour pouvoir s\'inscrire.'),
                password: string().required('Veuillez indiquez un mot de passe.'),
                email: string().required('Veuillez indiquez une adresse email valide.'),
                prenom: string().required('Veuillez indiquez votre prénom.'),
                nom: string().required('Veuillez indiquez votre nom de famille.'),
            })}
        >
            {({ isSubmitting, setSubmitting, submitForm }) => (
                <RegisterFormContainer title={'Inscription'} css={tw`w-full flex`}>
                    <Field
                        type={'text'}
                        label={'Nom de famille'}
                        name={'nom'}
                        disabled={isSubmitting}
                    />
                    <div css={tw`mt-6`}>
                        <Field
                            type={'text'}
                            label={'Prénom'}
                            name={'prenom'}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field
                            type={'text'}
                            label={'Pseudo'}
                            name={'username'}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field
                            type={'text'}
                            label={'Adresse email'}
                            name={'email'}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field
                            type={'password'}
                            label={'Mot de passe'}
                            name={'password'}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div css={tw`mt-6`}>
                        <Button type={'submit'} size={'xlarge'} isLoading={isSubmitting} disabled={isSubmitting}>
                            S'inscrire
                        </Button>
                    </div>
                    {recaptchaEnabled &&
                    <Reaptcha
                        css={tw`hidden`}
                        ref={ref}
                        size={'invisible'}
                        sitekey={siteKey || '_invalid_key'}
                        onVerify={response => {
                            setToken(response);
                            submitForm();
                        }}
                        onExpire={() => {
                            setSubmitting(false);
                            setToken('');
                        }}
                    />
                    }
                    <div css={tw`mt-6 text-center`}>
                        <Link
                            to={'/auth/login'}
                            css={tw`text-xs text-neutral-100 tracking-wide no-underline uppercase hover:text-neutral-300`}
                        >
                            Vous disposez déjà d'un compte?
                        </Link>
                    </div>
                </RegisterFormContainer>
            )}
        </Formik>
    );
};

export default RegisterContainer;
