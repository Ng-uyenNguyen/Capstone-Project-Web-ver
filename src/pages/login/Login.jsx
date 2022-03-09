import { Form, Input, Button, Checkbox } from "antd";
import "./login_styles.scss";
export const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <div className="login_image">
          <img src={require("../../assets/images/loginimage.png")} alt="" />
        </div>
        <div className="login_input">
          <div className="input_content">
            <div className="logo">
              <img
                src={require("../../assets/images/admin_login.png")}
                alt=""
              />
            </div>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <div className="input_block">
                  <span className="input_icon">
                    <img
                      src={require("../../assets/images/usernameicon.png")}
                      alt=""
                    />
                  </span>
                  <Input className="input_field username" />
                </div>
              </Form.Item>

              <Form.Item
                className="password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <div className="input_block">
                  <span className="input_icon">
                    <img
                      src={require("../../assets/images/password.png")}
                      alt=""
                    />
                  </span>
                  <Input.Password className="input_field password" />
                </div>
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
