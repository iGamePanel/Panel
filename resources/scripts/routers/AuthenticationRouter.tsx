import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import LoginContainer from '@/components/auth/LoginContainer';
import RegisterContainer from '@/components/auth/RegisterContainer';
import ForgotPasswordContainer from '@/components/auth/ForgotPasswordContainer';
import ResetPasswordContainer from '@/components/auth/ResetPasswordContainer';
import LoginCheckpointContainer from '@/components/auth/LoginCheckpointContainer';
import { NotFound } from '@/components/elements/ScreenBlock';

export default ({ location, history, match }: RouteComponentProps) => (
    <div className={'pt-8 xl:pt-32'}>
        <Switch location={location}>
            <Route path={`${match.path}/login`} component={LoginContainer} exact/>
            <Route path={`${match.path}/login/checkpoint`} component={LoginCheckpointContainer}/>
            <Route path={`${match.path}/password`} component={ForgotPasswordContainer} exact/>
            <Route path={`${match.path}/password/reset/:token`} component={ResetPasswordContainer}/>
            <Route path={`${match.path}/checkpoint`}/>

            <Route path={`${match.path}/register`} component={RegisterContainer} exact/>

            <Route path={'*'}>
                <NotFound onBack={() => history.push('/auth/login')}/>
            </Route>
        </Switch>
    </div>
);
