import React,{useState} from "react";
import { loginBack, iconDemo } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import * as API from '../../../services/auth'
import SweetAlert from 'react-bootstrap-sweetalert';
import {Redirect} from 'react-router-dom'
function Login({history,onLogin,auth})
{
    
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(false);
    const loginContainer = {
        backgroundImage: `url(${loginBack})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        position: "fixed",
        overflow: "auto",
        top: 0,
        bottom: 0,
    };
    
    if(auth.step===1)
        return <Redirect to="/otp" />
    if(auth.step===0)
        return <Redirect to="/" />
    if(auth.isLogin)
        return <Redirect to="/" />
    return <div className="container-fluid" style={loginContainer}>
        {error && <SweetAlert title={error} onConfirm={()=>{ setError(false) }} />}
    <div className="form-container">
        <div className="login-icon">
            <img src={iconDemo} alt="icon" height="100px" />
        </div>
        <div className="login-title">Enter Opt to sent on</div>
        <div className="text-center" style={{textTransform:'lowercase'}}>{auth.temail}</div>
        <Form  layout="vertical" className="pa-24" onFinish={(values)=>{
            values.otpIdentifier=auth.otpIdentifier;
            setSaving(true);
            API.VerifyOTP(values).then((res)=>{
                if(res.data.id)
                API.getUser(res.data.id).then((resp)=>{
                    res.data.firstName = resp.data[0].firstName;
                    res.data.lastName = resp.data[0].lastName   
                    onLogin(res.data);        
                })
               
                setSaving(false);
            }).catch((err)=>{
                if(err.response.data)
                {
                    setError(err.response.data)
                }
                setSaving(false);
            })
        }}>
            <Form.Item name="otp" rules={[{required:true,message:'OTP required!'}]}>
                <input
                    type="text"
                    className="form-control react-form-input"
                    placeholder="OTP"
                />
            </Form.Item>

            <Button size="large" loading={saving} htmlType="submit" className="btn form-button">
                Login
            </Button>
            
        </Form>
    </div>
</div>

}
const mapStateToProps = ({ auth }) => ({
    auth: auth
})
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (data) => {
            if (data.otpIdentifier)
                dispatch({ type: 'USER_2WAY_AUTH', payload: data });
            else
                dispatch({ type: 'USER_LOGIN', payload: data });
        }
    };
};
export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Login);
