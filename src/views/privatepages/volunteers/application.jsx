import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import * as API from "../../../services/master";
import Spin from "antd/lib/spin";
import Layout from "components/publicarea/layout.jsx";
import PageTitle from "components/common/PageTitle";
import { Divider } from "antd";
import moment from "moment";
import Tabs from "antd/lib/tabs";
function formatPhone(PhoneString) {
  var cleaned = ('' + PhoneString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  var match1 = cleaned.match(/^(\d{3})(\d{3})(\d{5})$/)
  if (match) {
    return  match[1] + '-' + match[2] + '-' + match[3]
  }
  else if(match1)
    return  match1[1] + '-' + match1[2] + '-' + match1[3]

  return cleaned;
}
function Index({ theme, history, match }) {
  const [data, setData] = useState(false);
  const [adata, setAData] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [stepData, setStepData] = useState([]);
  const [active, setActive] = useState("1");
  const [applnDatas, setApplnDatas] = useState("");
  // const [tab, setTab] = useState(1);
  const activeColor = {
    color: "#563c91"
  };
  useEffect(() => {
    setLoaded(true);
    API.Get_ApplicationSteps(Number(active), match.params.aid).then(res => {
      let datas = Number(active) === 2 ? res.data : res.data.data;
      setStepData(datas);
      setLoaded(false);
    });
  }, [match, active]);

  const IndexChange = useCallback(e => {
    setActive(e);
  }, []);

  useEffect(() => {
    if (match.params.id !== "0") {
      API.getProfile(match.params.id).then(res => {
        setData(res.data);
      });
    }
  }, [match.params.id]);
  useEffect(() => {
    if (match.params.aid !== "0") {
      API.getApplication(match.params.aid).then(res => {
        setAData(res.data);
      });
    }
  }, [match.params.aid]);
  useEffect(() => {
    API.Get_ApplicationData(Number(match.params.aid)).then(res => {
      setApplnDatas(res.data.volunteerProfileDetails[0]);
    });
  }, [match.params.aid]);

  if (!data)
    return (
      <div>
        <div className="plr-15" style={activeColor}>
          <div className="mtb-30 theme-color">
            <Spin spinning={true}>
              {adata && <div style={{ height: 100 }}></div>}
            </Spin>
          </div>
        </div>
      </div>
    );

  return (
    <Layout>
      <PageTitle
        breadCrumb={[
          { name: "Volunteers", link: "/volunteers" },
          { name: "Applications", link: "/volunteers/" + match.params.id },
          {
            name: `${data.volunteerProfile[0].firstName} ${data.volunteerProfile[0].lastName}`
          }
        ]}
        hidden={true}
      />
      <div className="profilePage">
        <div>
          <div className="m-3">
            <div className="ppdBlock">
              <div className="sDetails">
                <div className="sLeft">
                  <div className="sName">{applnDatas.siteName}</div>
                  <div className="sStatus">
                    <span></span> Current Application
                  </div>
                </div>

                <div className="sRight">
                  <div className="pBarBlock">
                    <div className="pBar">
                      <div
                        className="theProgress"
                        style={{
                          width: (applnDatas.app_Total / 7) * 100 + "%"
                        }}
                      ></div>
                    </div>
                    <div className="pBarLabel">
                      <div className="pblLeft">Completed</div>
                      <div className="pblRight">
                        {((applnDatas.app_Total / 7) * 100).toFixed(2) + "%"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sOtherDetails">
                  <ul>
                    <li>{applnDatas.program_Dates}</li>
                    <li>
                      <b>Due Amount:</b> ${applnDatas.participant_Fee}
                    </li>
                    <li>Other Details</li>
                  </ul>
                </div>
              </div>

              <ul className="list-inline theme-color">
                <Tabs defaultActiveKey={active} onChange={IndexChange}>
                  <Tabs.TabPane tab="SITES" key="1">
                    <div class="formBlock">
                      <div className="detailDisplay">
                        {!loaded ? (
                          stepData && stepData.length > 0 ? (
                            stepData.map((d, i) => (
                              <div>
                                <div className="subTitle">{`Site ${i +
                                  1}`}</div>
                                <Divider />
                                <div className="row mt-2">
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Site Name:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.siteName}
                                  </div>
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Address Line1:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.addressLine1}
                                  </div>
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    City:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.city}
                                  </div>
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Participant Fee:
                                  </div>
                                  <div className="col-3 text-left">
                                    ${d.participant_Fee}
                                  </div>
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Payment Due:
                                  </div>
                                  <div className="col-3 text-left">
                                    {moment(d.payment_Due).format("MM/DD/YYYY")}
                                  </div>
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Deposit Amount:
                                  </div>
                                  <div className="col-3 text-left">
                                    {"$" + d.depositAmount}
                                  </div>
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Description:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.description}
                                  </div>
                                </div>
                                <Divider />
                              </div>
                            ))
                          ) : (
                            <div>No Data</div>
                          )
                        ) : (
                          <Spin
                            spinning={loaded}
                            style={{ marginLeft: "50%", marginTop: "5%" }}
                          />
                        )}
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="VOLUNTEER" key="2">
                    <div class="formBlock">
                      <div className="detailDisplay">
                        {!loaded ? (
                          stepData &&
                            stepData.volunteerProfileDetails &&
                            stepData.volunteerProfileDetails.length > 0 ? (
                            <div>
                              <div className="row mt-2">
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  First Name:
                                </div>
                                <div className="col-3 text-left">
                                  {
                                    stepData.volunteerProfileDetails[0]
                                      .firstName
                                  }
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Last Name:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData.volunteerProfileDetails[0].lastName}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Gender:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData.volunteerProfileDetails[0].gender}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Age:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData.volunteerProfileDetails[0].age}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Date Of Birth:
                                </div>
                                <div className="col-3 text-left">
                                  {moment(
                                    stepData.volunteerProfileDetails[0]
                                      .birthdate,"MM/DD/YYYY[T]HH:mm:ss"
                                  ).format("MM/DD/YYYY")}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Date Of Baptism:
                                </div>
                                <div className="col-3 text-left">
                                  {moment(
                                    stepData.volunteerProfileDetails[0]
                                      .baptismdate,"MM/DD/YYYY[T]HH:mm:ss"
                                  ).format("MM/DD/YYYY")}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Language Spoken:
                                </div>
                                <div className="col-3 text-left">
                                  {
                                    stepData.volunteerProfileDetails[0]
                                      .langaugeSpoken
                                  }
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Citizenship:
                                </div>
                                <div className="col-3 text-left">
                                  {
                                    stepData.volunteerProfileDetails[0]
                                      .citizenship
                                  }
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Current Eductaional Level:
                                </div>
                                <div className="col-3 text-left">
                                  {
                                    stepData.volunteerProfileDetails[0]
                                      .education
                                  }
                                </div>

                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Employer:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData.volunteerProfileDetails[0].employer}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Mailing Address:
                                </div>
                                <div className="col-3 text-left">
                                  {
                                    stepData.volunteerProfileDetails[0]
                                      .mailingAddress
                                  }
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  T-Shirt Size:
                                </div>
                                <div className="col-3 text-left">
                                  {
                                    stepData.volunteerProfileDetails[0]
                                      .tshirtSize
                                  }
                                </div>
                              </div>
                              <Divider />
                              {stepData.volunteerPreviousHVCs.length > 0 &&
                                stepData.volunteerPreviousHVCs.map((d, i) => (
                                  <div>
                                    <div className="subTitle">{`HVC ${i +
                                      1}`}</div>
                                    <Divider />
                                    <div className="row mt-2">
                                     {/*  <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Location:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.location}
                                      </div> */}
                                      <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Site Name:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.siteName}
                                      </div>
                                      <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Year:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.startDate}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              <Divider />
                              {stepData.volunteerChilds.length > 0 &&
                                stepData.volunteerChilds.map((d, i) => (
                                  <div>
                                    <div className="subTitle">{`Child Details`}</div>
                                    <Divider />
                                    <div className="row mt-2">
                                      <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Parent/Guardian Name:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.guardianName}
                                      </div>
                                      <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Parent/Guardian Phone Number:
                                      </div>
                                      <div className="col-3 text-left">
                                        {formatPhone(d.guardianPhone)}
                                      </div>
                                      <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Parent/Guardian Email Address:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.guardianEmail}
                                      </div>
                                      <Divider />
                                      <div className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >Child's FirstName:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.childFirstName}
                                      </div>
                                      <div className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Child's LastName:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.childLastName}
                                      </div>                                     
                                      <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Child's Date Of Birth:
                                      </div>
                                      <div className="col-3 text-left">
                                      {moment(d.childbirthDate,"MM/DD/YYYY[T]HH:mm:ss").format("MM/DD/YYYY")}
                                      </div>
                                      <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Child's Age:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.childAge + " Year(s)"}
                                      </div>
                                      <div className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Child's Gender:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.childGender}
                                      </div>
                                      <div
                                        className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Child's T-Shirt Size:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.childtshirtSize}
                                      </div>
                                      <div className="col-3 text-right"
                                        style={{ fontWeight: 700 }}
                                      >
                                        Anything we should know regarding your child’s health:
                                      </div>
                                      <div className="col-3 text-left">
                                        {d.childhealth}
                                      </div>
                                    </div>
                                   
                                  </div>
                                ))}
                                 <Divider />
                                    <div style={{ marginBottom: '2%' }}></div>
                                    <div className="detailTitle">
                                      Applicant Contact Information
                                    </div>
                                    <div className="row mt-2">
                                      <div className="col-3 text-right"
                                        style={{ fontWeight: 700 }}>
                                        Phone Number1:
                                      </div>
                                      <div className="col-3 text-left">
                                        {stepData.volunteerContact.length > 0 && formatPhone(stepData.volunteerContact[0].parentPhone)} 
                                      </div>
                                      <div className="col-3 text-right"
                                        style={{ fontWeight: 700 }}>
                                        Email:
                                      </div>
                                      <div className="col-3 text-left">
                                        {stepData.volunteerContact.length > 0 && stepData.volunteerContact[0].parentEmail}
                                      </div>
                                      <div className="col-3 text-right"
                                        style={{ fontWeight: 700 }}>
                                        Guardian's Name:
                                      </div>
                                      <div className="col-3 text-left">
                                        {stepData.volunteerContact.length > 0 && stepData.volunteerContact[0].parentName}
                                      </div>
                                      <div className="col-3 text-right"
                                        style={{ fontWeight: 700 }}>
                                        Phone Number2:
                                      </div>
                                      <div className="col-3 text-left">
                                        {stepData.volunteerContact.length > 0 && formatPhone(stepData.volunteerContact[0].parentPhone1)}
                                      </div>
                                    </div>
                            </div>
                          ) : (
                            <div>No Data</div>
                          )
                        ) : (
                          <Spin
                            spinning={loaded}
                            style={{ marginLeft: "50%", marginTop: "5%" }}
                          />
                        )}
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="CHURCH" key="3">
                    <div class="formBlock">
                      <div className="detailDisplay">
                        {!loaded ? (
                          stepData && stepData.length > 0 ? (
                            <div>
                              <div className="detailTitle">
                                Church Information
                              </div>
                              <div className="row mt-2">
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Congregation Name:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData[0].name}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Congregation City:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData[0].city}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  State:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData[0].state}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Leader’s Name:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData[0].leaderName}
                                </div>
                              </div>
                              <Divider />
                              {/* <div style={{ marginBottom: "2%" }}></div>
                              <div className="detailTitle">
                                Applicant Contact Information
                              </div>
                              <div className="row mt-2">
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Guardian's Phone Number1:
                                </div>
                                <div className="col-3 text-left">
                                  {formatPhone(stepData[0].guarPhone1)}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Email:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData[0].guarEmail}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Guardian's Name:
                                </div>
                                <div className="col-3 text-left">
                                  {stepData[0].guarName}
                                </div>
                                <div
                                  className="col-3 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Guardian's Phone Number2:
                                </div>
                                <div className="col-3 text-left">
                                  {formatPhone(stepData[0].guarPhone2)}
                                </div>
                              </div> */}
                            </div>
                          ) : (
                            <div>No Data</div>
                          )
                        ) : (
                          <Spin
                            spinning={loaded}
                            style={{ marginLeft: "50%", marginTop: "5%" }}
                          />
                        )}
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="DISCLAIMER" key="4">
                  <div class="formBlock">
                      <div className="detailDisplay">
                        {!loaded ? (
                          stepData && stepData.length > 0 ? (
                            <div>                              
                              <div className="row mt-2">
                                <div
                                  className="col-9 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  HOPE worldwide Volunteer Corps programs have a spiritual focus as we believe that serving others is a vital part of living out Jesus’ ministry in our everyday lives. This focus includes participation in daily devotionals, regular small group discussions and attendance at local church services during the program. Are you comfortable with the spiritual aspects of this program?
                                </div>
                                <div className="col-2 text-left">
                                  {stepData[0].answer1}
                                </div><Divider />
                                <div
                                  className="col-9 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  Please describe why you feel led to serve in HOPE worldwide's Volunteer Programs.
                                </div>
                                <div className="col-2 text-left">
                                  {stepData[0].answer2}
                                </div><Divider />
                                <div
                                  className="col-9 text-right"
                                  style={{ fontWeight: 700 }}
                                >
                                  How would you describe your view of spirituality and/or relationship with God? There is no wrong answer!
                                </div>
                                <div className="col-2 text-left">
                                  {stepData[0].answer3}
                                </div>                                
                              </div>                             
                            </div>
                          ) : (
                            <div>No Data</div>
                          )
                        ) : (
                          <Spin
                            spinning={loaded}
                            style={{ marginLeft: "50%", marginTop: "5%" }}
                          />
                        )}
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="HEALTH FORM" key="5">
                    <div class="formBlock">
                      <div className="detailDisplay">
                        {!loaded ? (
                          stepData && stepData.length > 0 ? (
                            <div className="row mt-2">
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Currently Treated Any Health:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].currTreatedAny === 0
                                  ? "No"
                                  : "Yes"}{stepData[0].currTreatedAnyDet !== '' && stepData[0].currTreatedAny === 1 ?',  ' + stepData[0].currTreatedAnyDet :''}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Currently Treated Any Mental:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].currTreatedAnyMental === 0
                                  ? "No"
                                  : "Yes"}{stepData[0].currTreatedAnyMentalDet !== '' && stepData[0].currTreatedAnyMental === 1 ?',  ' + stepData[0].currTreatedAnyMentalDet :''}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Past Treated Any Mental:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].pastTreatedAnyMental === 0
                                  ? "No"
                                  : "Yes"}{stepData[0].pastTreatedAnyMentalDet !== '' && stepData[0].pastTreatedAnyMental === 1 ?',  ' + stepData[0].pastTreatedAnyMentalDet :''}
                              </div>                             
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Allergies to Medications, Foods or Environment:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].haveAllergies === 0
                                  ? "No"
                                  : "Yes"}{stepData[0].listAllergies !== '' && stepData[0].haveAllergies === 1 ?',  ' + stepData[0].listAllergies :''}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                               EpiPen:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].haveEpipen === 0
                                  ? "No"
                                  : "Yes"}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Medications take Every day or Week:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].anyMedication === 0
                                  ? "No"
                                  : "Yes"}{stepData[0].medDeatils !== '' && stepData[0].anyMedication === 1 ?',  ' + stepData[0].medDeatils :''}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Strong Aversions (Phobias):
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].anyPhobias === 0
                                  ? "No"
                                  : "Yes"}{stepData[0].phobiaDetails !== '' && stepData[0].anyPhobias === 1 ?',  ' + stepData[0].phobiaDetails :''}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Height:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].height +" " + stepData[0].heightUnit}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Weight:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].weight +" " + stepData[0].weightUnit}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Anything Else About General Health:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].genHealthDetails}
                              </div>
                              <div
                                className="col-3 text-right"
                                style={{ fontWeight: 700 }}
                              >
                                Detailed Information:
                              </div>
                              <div className="col-3 text-left">
                                {stepData[0].otherInfo}
                              </div>
                            </div>
                          ) : (
                            <div>No Data</div>
                          )
                        ) : (
                          <Spin
                            spinning={loaded}
                            style={{ marginLeft: "50%", marginTop: "5%" }}
                          />
                        )}
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="RECOMMENDATIONS" key="6">
                    <div class="formBlock">
                      <div className="detailDisplay">
                        {!loaded ? (
                          stepData && stepData.length > 0 ? (
                            stepData.map((d, i) => (
                              <div>
                                <div className="subTitle">{`Reference ${i +
                                  1}`}</div>
                               {/*  <Divider /> */}
                                <div className="row mt-2">
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Name:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.name}
                                  </div>
                                  {/* <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Phone:
                                  </div>
                                  <div className="col-3 text-left">
                                    {formatPhone(d.phone)}
                                  </div> */}
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Email:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.email}
                                  </div>
                                  {/* <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Church:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.church}
                                  </div>
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Position:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.position}
                                  </div>
                                  <div
                                    className="col-3 text-right"
                                    style={{ fontWeight: 700 }}
                                  >
                                    Description:
                                  </div>
                                  <div className="col-3 text-left">
                                    {d.description}
                                  </div> */}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div>No Data</div>
                          )
                        ) : (
                          <Spin
                            spinning={loaded}
                            style={{ marginLeft: "50%", marginTop: "5%" }}
                          />
                        )}
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="PAYMENT" key="7">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                </Tabs>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = ({ themeChanger }) => {
  return {
    theme: themeChanger
  };
};

export default connect(mapStateToProps, null)(Index);
