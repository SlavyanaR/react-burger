import React, { FC, ChangeEvent, FormEvent } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { resetPassword, setResetFormValue } from '../../services/actions/auth';
import { getCookie } from '../../utils/utils';
import ResetPasswordStyles from './reset-password.module.css';
import { TLocation } from '../../services/types/data';

export const ResetPassword: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<TLocation>()
    const cookie = getCookie('token');
    const { password, code } = useSelector(state => state.auth.form);
    const { resetPassSuccess, forgetPassSuccess } = useSelector(state => state.auth);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setResetFormValue(e.target.name, e.target.value));
    }

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassword({ password, token: code }));
    }

    if (cookie) {
        return (<Redirect to={location.state?.from || '/'} />);
    }
    if (!forgetPassSuccess) {
        return <Redirect to={{ pathname: "/forgot-password" }} />;
    }

    return (
        <div className={ResetPasswordStyles.container}>
            <h2 className={`${ResetPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
            <form className={ResetPasswordStyles.form} onSubmit={onFormSubmit}>
                <div className="pb-6">
                    <PasswordInput
                        onChange={onChange}
                        value={password}
                        name={'password'}
                        size="default"
                    />
                </div>
                <div className="pb-6">
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChange}
                        value={code}
                        name={'code'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                {code && password ?
                    <Button type="primary" size="medium">
                        {!!resetPassSuccess
                            ? (<Redirect to={location.state?.from || '/profile'} />)
                            : ''
                        }
                        Сохранить
                    </Button>
                    : (<Button type="primary" size="medium" disabled>
                        Сохранить
                    </Button>)}
            </form>
            <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль?
                <Link className={ResetPasswordStyles.link} to='/login'>Войти</Link>
            </p>
        </div >)
}