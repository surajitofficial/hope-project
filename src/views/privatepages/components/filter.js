import React from "react";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Space from "antd/lib/space";
import Drawer from "antd/lib/drawer";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import _ from "lodash";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <Drawer
        visible={true}
        title="Filter"
        onClose={() => {
          this.props.onCancel();
        }} maskClosable={false}
      >
        <Form
          ref={r => (this.form = r)}
          noValidate
          layout="vertical"
          initialValues={this.props.value}
          onFinish={values => {
            let obj = {};
            let keys = Object.keys(values);
            keys.forEach(d => {
              if (values[d]) obj[d] = values[d];
            });
            this.props.onFilter(obj);
          }}
        >
          <Row gutter={15}>
            {_.filter(this.props.columns, a => a.filterType !== undefined).map(
              d => (
                <Col md={24} xs={24}>
                  {d.filterType === "DropDown" ? (
                    <Form.Item name={d.key} label={d.title}>
                      <Select labelId={d.field} style={{ width: "100%" }}>
                        {d.filterDropDownValues.map(dd => (
                          <Select.Option value={dd.value}>
                            {dd.text}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Form.Item name={d.key} label={d.title}>
                      <Input
                        label={d.headerName}
                        inputMode={d.filterTextType}
                        required
                        maxLength="255"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  )}
                </Col>
              )
            )}
          </Row>

          <Space className="mb-3">
            <Button
              style={{
                width: "68px",
                marginRight: "-8px",
                textAlign: "center"
              }}
              htmlType="submit"
              type="primary"
              loading={this.state.saving}
            >
              FILTER
            </Button>
            <Button
              style={{
                width: "80px",
                marginRight: "-8px",
                textAlign: "center"
              }}
              onClick={() => {
                this.props.onCancel();
              }}
              className="ml-2"
            >
              CANCEL
            </Button>
            <Button
              style={{ width: "68px", textAlign: "center" }}
              onClick={() => {
                this.form.resetFields();
                let obj = {};
                this.props.onFilter(obj);
              }}
              className="ml-2"
            >
              RESET
            </Button>
          </Space>
        </Form>
      </Drawer>
    );
  }
}

export default Index;
