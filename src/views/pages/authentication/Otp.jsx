import React, { useState } from "react";
import { loginBack, iconDemo } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Button from "antd/lib/button";
import * as API from "../../../services/auth";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";
function Login({ onLogin, auth }) {
  console.log(auth);
  const [saving1, setSaving1] = useState(false);
  const [saving2, setSaving2] = useState(false);
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
  if (auth.step === 0) return <Redirect to="/login" />;
  if (auth.step === 2) return <Redirect to="/verify" />;

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
        <div className="login-title">Select your choice.</div>
        <div className="pa-24">
          <Button
            size="large"
            className="btn form-button mb-4"
            loading={saving1}
            onClick={() => {
              let values = {};
              values.otpIdentifier = auth.otpIdentifier;
              values.type = 1;
              setSaving1(true);
              API.VerifyEmailPhone(values)
                .then(res => {
                  console.log(res.data);
                  onLogin({ type: 1 });
                  setSaving1(false);
                })
                .catch(err => {
                  if (err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                  }
                  setSaving1(false);
                });
            }}
          >
            Send OTP on Phone
          </Button>

          <Button
            size="large"
            className="btn form-button"
            loading={saving2}
            onClick={() => {
              let values = {};
              values.otpIdentifier = auth.otpIdentifier;
              values.email = auth.email;
              values.type = 2;
              setSaving2(true);

              API.VerifyEmailPhone(values)
                .then(res => {
                  console.log(res.data);
                  onLogin({ type: 2 });
                  setSaving1(false);
                })
                .catch(err => {
                  if (err.response.data) {
                    setError(err.response.data.message);
                  }
                  setSaving2(false);
                });
            }}
          >
            Send OTP on Email
          </Button>
        </div>
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
      dispatch({ type: "USER_OTP_SENT", payload: data });
    }
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
