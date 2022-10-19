import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import PageTitle from 'components/common/PageTitle';
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import * as API from '../../../services/master'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Input from 'antd/lib/input'
import Spin from 'antd/lib/spin'
import PhoneInput from 'react-phone-input-2'
import SweetAlert from 'react-bootstrap-sweetalert';
import 'react-phone-input-2/lib/style.css'
let form = null;
function Index({theme,history,match}) {
    const [error, setError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const { sidebarTheme } = theme
    const activeColor = {
        color: sidebarTheme.activeColor
    }
    useEffect(()=>{
        if (match.params.id!=='0') {
            setLoading(true)
            API.select("User", match.params.id).then((res) => {
                setLoading(false)
                form.setFieldsValue(res.data[0]);
                
            })
        }
    },[match.params.id])
    return (
        <div>
            {error && <SweetAlert title={error} onConfirm={()=>{ setError(false) }} />}
            <PageTitle title="User Form" breadCrumb={[{name:'Users',link:'/users'},{name:'Add'}]} />
            
            <div className="plr-15" style={activeColor}>
                <div className="mtb-30 theme-color">
                <Spin spinning={loading}>
                <Form ref={(r) => form = r} noValidate layout="vertical"
                    onFinish={(values) => {

                        values.EmployeeId = "test";
                        values.customValues = "test";
                        if (values.password === values.confirmpswd) {
                            setSaving(true)
                            API.save("User", match.params.id, values).then((res) => {
                                history.push("/users")
                            })
                        }
                        else
                            setError("Password mismatch!!!")
                    }}>
                            
                    <Row gutter={15}>
                        <Col md={8} xs={24}>
                            <Form.Item name="firstName" required label="First Name" rules={[{ required: true, message: "Please enter" }]}>
                                <Input maxLength="255" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item name="middleName" label="Middle Name">
                                <Input maxLength="255" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item name="lastName" required label="Last Name" rules={[{ required: true, message: "Please enter" }]}>
                                <Input maxLength="255" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item name="phone" required label="Phone" rules={[{ required: true, message: "Please enter" }]}>
                            <PhoneInput  style={{ width: '100%' }}  country={'us'}                                
                                   
                                   /*  onChange={phone => setPhone(phone)} *//>
                                    {/* <Input maxLength="30" style={{ width: '100%' }} /> */}
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item name="email" required label="Email" rules={[{ required: true, message: "Please enter" }, { type: 'email', message: "Enter Valid Email" }]}>
                                <Input maxLength="255" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        {match.params.id==='0' && <Col md={12} xs={24}>
                            <Form.Item name="password" required label="Password" rules={[{ required: true, message: "Please enter" }]}>
                                <Input maxLength="30" type="password" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>}
                        {match.params.id==='0' && <Col md={12} xs={24}>
                            <Form.Item name="confirmpswd" required label="Confirm Password" rules={[{ required: true, message: "Please enter" }]}>
                                <Input maxLength="255" type="password" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>}
                        <Col md={24} xs={24}>
                            <Form.Item name="address1" label="Address" rules={[{ required: true, message: "Please enter" }]}>
                                <Input maxLength="255" style={{ width: '100%' }} placeholder="Address 1" />
                            </Form.Item>
                        </Col>
                        <Col md={24} xs={24}>
                            <Form.Item name="address2">
                                <Input maxLength="255" label="Address1" style={{ width: '100%' }} placeholder="Address 2" />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item name="city" label="City" required rules={[{ required: true, message: "Please enter" }]}>
                                <Input maxLength="255" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item name="state" label="State" required rules={[{ required: true, message: "Please enter" }]}>
                                <Input maxLength="255" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                            <Form.Item name="country" label="Company" required rules={[{ required: true, message: "Please enter" }]}>
                                <Input maxLength="255" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                       {/*  <Col md={24} xs={24}>
                            <Form.Item name="comments" label="Comments">
                                <Input.TextArea autoSize maxLength="255" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col> */}

                    </Row>

                    <Space className="mb-3">
                        <Button style={{ backgroundColor: '#3f8fb5', color: 'white' }} htmlType="submit" type="primary" loading={saving}>SAVE</Button>
                        <Button onClick={() => { history.push("/users") }} className="ml-2">CANCEL</Button>
                    </Space>
                </Form>
                    </Spin>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({themeChanger}) => {
    return {
        theme:themeChanger
    };
}

export default connect(mapStateToProps, null)(Index);