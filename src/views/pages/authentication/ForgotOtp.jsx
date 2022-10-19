import React, { useState } from "react";
import { connect } from "react-redux";
import * as API from "../../../services/auth";
import { loginBack, ForgotIcon } from "helper/constant";
import Form from "antd/lib/form";
import { Redirect } from "react-router-dom";
import Button from "antd/lib/button";
import SweetAlert from "react-bootstrap-sweetalert";
function Index({ auth, onLogin }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const loginContainer = {
    backgroundImage: `url(${loginBack})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0
  };
  if (auth.fstep > 1) return <Redirect to="/forgotverify" />;
  if (auth.isLogin) return <Redirect to="/" />;
  return (
    <div className="container-fluid" style={loginContainer}>
      {error && (
        <SweetAlert
          title={error}
          onConfirm={() => {
            setError(false);
          }}
        />
      )}
      <div className="form-container">
        <div className="login-icon">
          <img src={ForgotIcon} alt="icon" height="100px" />
        </div>
        <div className="login-title">Forgot Password ?</div>
        <div className="text-center form-info-text plr-24 mt-16">
          Enter the Otp to sent on <span>{auth.email}</span>
        </div>
        <Form
          layout="vertical"
          className="pa-24"
          onFinish={values => {
            values.email = auth.email;
            setSaving(true);
            API.VerifyResetPasswordOTP(values)
              .then(res => {
                onLogin(res.data);
                setSaving(false);
              })
              .catch(err => {
                if (err.response.data) {
                  setError(err.response.data);
                }
                setSaving(false);
              });
          }}
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "OTP required!" }]}
          >
            <input
              type="text"
              className="form-control react-form-input"
              placeholder="OTP"
            />
          </Form.Item>

          <Button
            size="large"
            loading={saving}
            htmlType="submit"
            className="btn form-button"
          >
            Verify
          </Button>
        </Form>
      </div>
    </div>
  );
}
const mapStateToProps = ({ auth }) => ({
  auth: auth
});
const mapDispatchToProps = dispatch => {
  return {
    onLogin: data => {
      dispatch({ type: "RESET_PASSWORD", payload: data });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
