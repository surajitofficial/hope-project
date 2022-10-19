import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import * as API from "../../../services/master";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Spin from "antd/lib/spin";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Space from "antd/lib/space";
import Button from "antd/lib/button";
// import Layout from "components/publicarea/layout.jsx";
import PageTitle from "components/common/PageTitle";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";

let form = null;
function Index({ theme, history, match, auth }) {
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(false);
  const [adding, setAdding] = useState(false);
  const [reload, setReload] = useState(0);
  const [IsAdd, setIsAdd] = useState(false);
  const [speakData, setSpeakData] = useState(false);
  const [speakLoading, setSpeakLoading] = useState(false);
  const activeColor = {
    color: "#563c91",
  };

  useEffect(() => {
    if (match.params.id !== "0") {
      API.getProfile(match.params.id).then((res) => {
        setData(res.data);
      });
    }
  }, [match.params.id]);
  useEffect(() => {
    if (match.params.id !== "0") {
      API.select("VolunteerSpeaks", match.params.id).then((res) => {
        setSpeakData(res.data.Speak);
      });
    }
  }, [match.params.id]);

  const speakChange = useCallback(
    (e) => {
      if (match.params.id !== "0") {
        setSpeakLoading(true);
        API.select("VolunteerSpeaks", match.params.id).then((res) => {
          setSpeakData(res.data.Speak);
          setSpeakLoading(false);
        });
      }
    },
    [match.params.id]
  );
  if (!data)
    return (
      <div>
        <div className="plr-15" style={activeColor}>
          <div className="mtb-30 theme-color">
            <Spin spinning={true}>
              <div style={{ height: 100 }}></div>
            </Spin>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      {IsAdd && !speakLoading && (
        <SweetAlert
          input
          defaultValue={speakData}
          showCancel
          cancelBtnCssClass="btn btn-primary"
          cancelBtnStyle={{ color: "white" }}
          cancelBtnText="Cancel"
          disabled={adding}
          confirmBtnText={
            <span>{adding && <i class="fas fa-spinner fa-spin"></i>} Save</span>
          }
          confirmBtnCssClass="btn btn-success"
          title="Volunteer Speaks"
          onConfirm={(e) => {
            setAdding(true);
            let data = {
              profileId: match.params.id,
              speak: e,
              userId: auth.id,
            };
            API.saveapi("VolunteerSpeaks", data).then((res) => {
              setIsAdd(false);
              setReload(reload + 1);
              setAdding(false);
            });
          }}
          onCancel={() => {
            setIsAdd(false);
          }}
        />
      )}
      <div>
        <PageTitle
          breadCrumb={[
            { name: "Volunteers", link: "/volunteers" },
            {
              name: `${data.volunteerProfile[0].firstName} ${data.volunteerProfile[0].lastName}`,
            },
          ]}
          title="Volunteers"
          controls={[
            <Button
              className=" ma-5 c-rounded c-seconadry"
              style={{ backgroundColor: "white", color: "black", top: 10 }}
              type="primary"
              onClick={() => {
                setIsAdd(true);
                speakChange();
              }}
              // loading={speakLoading}
            >
              <i className="fab fa-speakap mr-2"></i>
              <span style={{ fontSize: 12 }}>Add/Edit Volunteer Speaks</span>
            </Button>,
          ]}
        />
        <div className="profilePage">
          <div>
            <div className="m-3">
              {/* <div className="ppdBlock">
                <div className="cDetails">
                  <div className="cLeft">
                    <div className="cName">
                      {data.volunteerProfile[0].firstName}{" "}
                      {data.volunteerProfile[0].lastName}
                    </div>
                    <div className="cTags">
                      <span>Church Name</span>
                      <span>City</span>
                    </div>
                    <div className="cContact">
                      <i className="ti-mobile"></i>{" "}
                      {data.volunteerProfile[0].phone} |{" "}
                      <i className="ti-email"></i>{" "}
                      {data.volunteerProfile[0].email}
                    </div>
                  </div>

                  <div className="cRight"></div>
                </div>

                {data.volunteerApplication.map(d => (
                  <div
                    className="sDetails"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push(`/volunteers/${match.params.id}/${d.id}`);
                    }}
                  >
                    <div className="sLeft">
                      <div className="sName">
                        {moment(d.applicationdate).format("MM/DD/YYYY")}
                      </div>
                      <div className="sStatus">
                        <span></span> Current Application
                      </div>
                    </div>

                    <div className="sRight">
                      <div className="pBarBlock">
                        <div className="pBar">
                          <div
                            className="theProgress"
                            style={{ width: (d.app_Total / 7) * 100 + "%" }}
                          ></div>
                        </div>
                        <div className="pBarLabel">
                          <div className="pblLeft">Completed</div>
                          <div className="pblRight">
                            {((d.app_Total / 7) * 100).toFixed(2) + "%"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sOtherDetails">
                      <ul>
                        <li>
                          <b>Citizenship:</b> {d.citizenship}
                        </li>
                        <li>
                          <b>Language:</b> {d.langaugeSpoken}
                        </li>
                        <li>
                          <b>Education:</b> {d.education}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div> */}
              <div className="plr-15" style={activeColor}>
                <div className="mtb-30 theme-color">
                  <Spin>
                    <Form
                      ref={(r) => (form = r)}
                      noValidate
                      layout="vertical"
                      onFinish={(values) => {
                        values.EmployeeId = "test";
                        values.customValues = "test";
                        if (values.password === values.confirmpswd) {
                          setSaving(true);
                          API.save("User", match.params.id, values).then(
                            (res) => {
                              history.push("/users");
                            }
                          );
                        } else setError("Password mismatch!!!");
                      }}
                    >
                      <Row gutter={15}>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="First Name"
                            required
                            label="First Name"
                            rules={[
                              { required: true, message: "Please enter" },
                            ]}
                          >
                            <Input maxLength="255" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item name="middleName" label="Middle Name">
                            <Input maxLength="255" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name={data.volunteerProfile[0].lastName}
                            required
                            label="Last Name"
                            rules={[
                              { required: true, message: "Please enter" },
                            ]}
                          >
                            <Input maxLength="255" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="First Name"
                            required
                            label="First Name"
                            rules={[
                              { required: true, message: "Please enter" },
                            ]}
                          >
                            <Input maxLength="255" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item name="middleName" label="Middle Name">
                            <Input maxLength="255" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name={data.volunteerProfile[0].lastName}
                            required
                            label="Last Name"
                            rules={[
                              { required: true, message: "Please enter" },
                            ]}
                          >
                            <Input maxLength="255" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Space className="mb-3">
                        <Button
                          style={{ backgroundColor: "#3f8fb5", color: "white" }}
                          htmlType="submit"
                          type="primary"
                          // loading={saving}
                        >
                          SAVE
                        </Button>
                        <Button
                          onClick={() => {
                            history.push("/users");
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
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ themeChanger, auth }) => {
  return {
    theme: themeChanger,
    auth: auth,
  };
};

export default connect(mapStateToProps, null)(Index);
