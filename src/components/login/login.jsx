import React from 'react';
import teg from './login.module.css'
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import  style from '../common/FormsControls/FormsControls.module.css'

let LoginForm = (props) => {
    return (
        <div className={teg.di}>
            <div className={teg.form}>
                <h1>Login</h1>

                <form onSubmit={props.handleSubmit}>

                    {createField('Email','email',[required], Input)}
                    {createField('Password','password',[required], Input, {type: 'password'})}
                    {createField(null,'rememberMe',null, Input, {type: 'checkbox'}, "remember me")}

                    {/*<div><Field placeholder={'Email'}    name={'email'} validate={[required]} component={Input}/></div>
                    <div><Field placeholder={'Password'} name={'password'} validate={[required]} component={Input} type={'password'}/></div>
                    <div><Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me</div>*/}
                    <div>
                        {props.error &&  <div className={style.formSummaryError}>{props.error}</div> }
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LoginReduxForm = reduxForm({form: "login"}) (LoginForm)

function Login(props) {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit} error={props.error}/>
        </div>
    );
}
const matStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default connect (matStateToProps, {login: loginThunkCreator,}) (Login);