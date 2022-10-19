import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PageTitle from "components/common/PageTitle";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import * as API from "../../../services/master";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Space from "antd/lib/space";
import Input from "antd/lib/input";
import Spin from "antd/lib/spin";
import InputNumber from "antd/lib/input-number";
import SweetAlert from "react-bootstrap-sweetalert";

import "react-phone-input-2/lib/style.css";
let form = null;
function Index({ theme, history, match }) {
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sidebarTheme } = theme;

  const activeColor = {
    color: sidebarTheme.activeColor
  };
  // useEffect(() => {
  //   API.selectStatus("VolunteerSites").then(res => {
  //     setSiteStatus(res.data.data);
  //   });
  // }, []);
  useEffect(() => {
    if (match.params.id !== "0") {
      setLoading(true);
      API.select("VolunteerSiteDetails", match.params.id).then(res => {
        setLoading(false);
        form.setFieldsValue(res.data);
      });
    }
  }, [match.params.id]);
  return (
    <div>
      {error && (
        <SweetAlert
          title={error}
          onConfirm={() => {
            setError(false);
          }}
        />
      )}
      <PageTitle
        title="Site Form"
        breadCrumb={[
          { name: "Sites", link: "/volunteersites" },
          match.params.id && match.params.id !== "0"
            ? { name: "Add/Edit site details" }
            : { name: "Add" }
        ]}
      />

      <div className="plr-15" style={activeColor}>
        <div className="mtb-30 theme-color">
          <Spin spinning={loading}>
            <Form
              ref={r => (form = r)}
              noValidate
              layout="vertical"
              onFinish={values => {
                values.SiteID = match.params.id;
                setSaving(true);
                API.saveapi("VolunteerSiteDetails", values).then(res => {
                  history.push("/volunteersites");
                });
              }}
            >
              <Row gutter={15}>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="Deadline"
                    required
                    label="Deadline"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="Price"
                    label="Price"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <InputNumber maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item name="Audience" label="Audience">
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>{" "}
                <Col md={18} xs={18}></Col>
              </Row>
              <Row>
                <Col md={18} xs={18}>
                  <Form.Item
                    name="What"
                    required
                    label="What"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input maxLength="30" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={18} xs={18}>
                  <Form.Item
                    name="Why"
                    required
                    label="Why"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={18} xs={18}>
                  <Form.Item
                    name="Who"
                    label="Who"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input
                      maxLength="255"
                      style={{ width: "100%" }}
                      placeholder="Who"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Space className="mb-3">
                <Button
                  style={{ backgroundColor: "#3f8fb5", color: "white" }}
                  htmlType="submit"
                  type="primary"
                  loading={saving}
                >
                  SAVE
                </Button>
                <Button
                  onClick={() => {
                    history.push("/volunteersites");
                  }}
                  className="ml-2"
                >
                  CANCEL
                </Button>
              </Space>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ themeChanger }) => {
  return {
    theme: themeChanger
  };
};

export default connect(mapStateToProps, null)(Index);
