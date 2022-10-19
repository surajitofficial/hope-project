import React, { useState } from "react";
import { loginBack, iconDemo } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import * as API from "../../../services/auth";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";
function Login({ history, onLogin, auth }) {
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

  if (auth.step > 0) return <Redirect to="/otp" />;
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
          <img src={iconDemo} alt="icon" height="100px" />
        </div>
        <div className="login-title">Sign in to your account</div>
        <Form
          layout="vertical"
          className="pa-24"
          onFinish={values => {
            setSaving(true);

            API.login2(values)
              .then(res => {
                console.log(res.data);
                // values.otpIdentifier = res.data.otpIdentifier;
                values.tphone = res.data.phone;
                values.temail = res.data.email;
                values.id = res.data.id;
                if (res.data.token) values.token = res.data.token;

                if (values.id)
                  API.getUser(values.id).then(res => {
                    values.firstName = res.data[0].firstName;
                    values.lastName = res.data[0].lastName;
                    onLogin(values);
                  });
                else onLogin(values);

                setSaving(false);
              })
              .catch(err => {
                // alert(JSON.stringify(err));
                if (err.response.data && err.response.data.message) {
                  setError(err.response.data.message);
                }
                setSaving(false);
              });
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter!" },
              { type: "email", message: "Please enter valid email!" }
            ]}
          >
            <input
              type="email"
              className="form-control react-form-input"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter!" }]}
          >
            <input
              type="password"
              className="form-control react-form-input"
              placeholder="Password"
            />
          </Form.Item>

          <Button
            size="large"
            loading={saving}
            htmlType="submit"
            className="btn form-button"
          >
            Login
          </Button>
          <div
            className="text-center link-label"
            onClick={() => history.push("/forgotPassword")}
          >
            Forgot Password ?
          </div>
          <div>
            <br></br>
            Version:{auth.version}
          </div>
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
      // if (data.otpIdentifier)
      //     dispatch({ type: 'USER_2WAY_AUTH', payload: data });
      // else
      dispatch({ type: "USER_LOGIN", payload: data });
    }
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
