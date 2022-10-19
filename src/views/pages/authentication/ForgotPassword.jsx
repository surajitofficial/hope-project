import React, { useState } from "react";
import { loginBack, ForgotIcon } from "helper/constant";
import * as API from "../../../services/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import SweetAlert from "react-bootstrap-sweetalert";
function Index({ setvalues, onLogin, auth }) {
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
  if (auth.fstep > 0) return <Redirect to="/forgototp" />;
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
          Provide your e-mail address to reset your password
        </div>
        <Form
          className="pa-24"
          onFinish={values => {
            setSaving(true);
            API.ForgotPasswordByEmail(values)
              .then(res => {
                setError(res.data);
                values.temail = values.Email;
                onLogin(values);
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
            name="email"
            rules={[{ required: true, message: "Email required!" }]}
          >
            <input
              type="text"
              className="form-control react-form-input"
              placeholder="Email"
            />
          </Form.Item>
          <Button
            size="large"
            loading={saving}
            htmlType="submit"
            className="btn form-button"
          >
            Get OTP
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
      dispatch({ type: "USER_2WAY_AUTH_FORGOT", payload: data });
    },
    setvalues: data => {
      dispatch({ type: "USER_DATAS", payload: data });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
