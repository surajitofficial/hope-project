import React, { useState } from "react";
import { connect } from "react-redux";
import * as API from "../../../services/auth";
import { Redirect } from "react-router";
import { loginBack, ForgotIcon } from "helper/constant";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import SweetAlert from "react-bootstrap-sweetalert";
function Index({ auth, onLogin }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const loginContainer = {
    backgroundImage: `url(${loginBack})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0
  };
  if (redirect) {
    return <Redirect to={"/"} />;
  }

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
            let data = {
              email: auth.email,
              newPassword: values.password
            };
            setSaving(true);
            API.ForgotPassword(data).then(res => {
              setRedirect(true);
              localStorage.clear();
              onLogin();
              setSaving(false);
            });

            return false;
          }}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "New Password required!" }]}
            hasFeedback
          >
            <input
              type="text"
              className="form-control react-form-input"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Confirm Password required!"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                }
              })
            ]}
          >
            <input
              type="text"
              className="form-control react-form-input"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Button
            size="large"
            loading={saving}
            htmlType="submit"
            className="btn form-button"
          >
            RESET
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
    onLogin: () => {
      dispatch({ type: "RESET_PASSWORD_DONE" });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
