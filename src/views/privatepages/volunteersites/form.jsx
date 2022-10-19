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
import Select from "antd/lib/select";
import { DatePicker } from 'antd';
import "react-phone-input-2/lib/style.css";
let form = null;
function Index({ theme, history, match }) {
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sidebarTheme } = theme;
  const [siteStatus, setSiteStatus] = useState([]);
  const [IsCancelled, setIsCancelled] = useState(false);
  const activeColor = {
    color: sidebarTheme.activeColor
  };
  useEffect(() => {
    API.selectStatus("VolunteerSites").then(res => {
      setSiteStatus(res.data.data);
    });
  }, []);
  useEffect(() => {
    if (match.params.id !== "0") {
      setLoading(true);
      API.select("VolunteerSites", match.params.id).then(res => {
        setLoading(false);
        form.setFieldsValue(res.data[0]);
        if (res.data[0].status === 2) setIsCancelled(true);
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
            ? { name: "Edit" }
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
                values.EmployeeId = "test";
                values.customValues = "test";
                if (values.password === values.confirmpswd) {
                  setSaving(true);
                  API.save("VolunteerSites", match.params.id, values).then(
                    res => {
                      history.push("/volunteersites");
                    }
                  );
                } else setError("Password mismatch!!!");
              }}
            >
              <Row gutter={15}>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="siteName"
                    required
                    label="Site Name"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="addressLine1"
                    label="Address"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item name="addressLine2" label="Address2">
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>{" "}
                <Col md={6} xs={18}></Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="city"
                    required
                    label="City"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input maxLength="30" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="state"
                    required
                    label="State"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input
                      maxLength="255"
                      style={{ width: "100%" }}
                      placeholder="Country"
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}></Col>
                <Col md={9} xs={18}>
                  <Form.Item name="description" label="Description">
                    <Input
                      maxLength="255"
                      style={{ width: "100%" }}
                      placeholder="Description"
                    />
                  </Form.Item>
                </Col>
                <Col md={9} xs={18}>
                  <Form.Item name="shortDescription" label="Short Description">
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}></Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="depositAmount"
                    label="Amount"
                    required
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <InputNumber
                      precision={2}
                      min={0}
                      type="number"
                      step=".01"
                      parser={value => value.replace(/\$\s?|(,*)/g, "")}
                      maxLength="255"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="volunteerCount"
                    label="Volunteer Count"
                    required
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <InputNumber
                      min={0}
                      type="number"
                      parser={value => value.replace(/\$\s?|(,*)/g, "")}
                      maxLength="255"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="participant_Fee"
                    label="Participant_Fee"
                    required
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <InputNumber
                      precision={2}
                      min={0}
                      type="number"
                      step=".01"
                      parser={value => value.replace(/\$\s?|(,*)/g, "")}
                      maxLength="255"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}></Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="program_Dates"
                    label="Program Dates"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input maxLength="255" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    name="no_Of_Participants"
                    label="No of Participants"
                  >
                    <InputNumber
                      min={0}
                      type="number"
                      parser={value => value.replace(/\$\s?|(,*)/g, "")}
                      maxLength="255"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}>
                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                      { required: true, message: "Please select status" }
                    ]}
                  >
                    <Select
                      placeholder="Select.."
                      onChange={e => {
                        if (e === 2) setIsCancelled(true);
                        else setIsCancelled(false);
                        // this.setState({ IsCancelled: e === 2 ? true : false })
                      }}
                    >
                      {siteStatus.map(d => (
                        <Select.Option value={d.id}>{d.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={6} xs={18}></Col>
                {IsCancelled && (
                  <Col md={6} xs={18}>
                    <Form.Item
                      name="who"
                      label="Who"
                      rules={[{ required: true, message: "Please enter" }]}
                    >
                      <Input maxLength="500" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                )}
                {IsCancelled && (
                  <Col md={6} xs={18}>
                    <Form.Item
                      name="what"
                      label="What"
                      rules={[{ required: true, message: "Please enter" }]}
                    >
                      <Input maxLength="500" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                )}
                {IsCancelled && (
                  <Col md={6} xs={18}>
                    <Form.Item
                      name="why"
                      label="Why"
                      rules={[{ required: true, message: "Please enter" }]}
                    >
                      <Input maxLength="500" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                )}
                <Col md={6} xs={18}></Col>
                {IsCancelled && (
                  <Col md={12} xs={18}>
                    <Form.Item
                      name="cancelReason"
                      label="Cancel Reason"
                      rules={[{ required: true, message: "Please enter" }]}
                    >
                      <Input maxLength="500" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                )}
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
