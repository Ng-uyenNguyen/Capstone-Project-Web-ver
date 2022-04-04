import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import "./login_styles.scss";
import { apiStore } from "../../constant/apiStore";
import axios from "axios";

export const Login = () => {
  let navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    const form = new FormData();
    form.append("email", "TranLQ@capstone.com");
    form.append("password", "FpXxmBwXMv");
    fetch(apiStore.login, {
      body: form,
      method: "post",
      headers: {
        Cache: "no-cache",
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const res = await axios.post(apiStore.login, form, { withCredentials: true });
    console.log(res);
    // const profileRes = await axios.get(apiStore.getProfile, { withCredentials: true });
    // console.log(profileRes);
    // if (res.status === 200) {
    //   const accountId = res.data;
    //   console.log(accountId);
    // const profileRes = await axios.get(apiStore.getProfile);
    // const profile = await profileRes.json();
    // console.log(profile);
    // if (profile.roles[0] === "ROLE_MANAGER");
    // navigate("management", { replace: true });
    // console.log("Login successfully");
    // }
    // console.log(res);
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
              <img src={require("../../assets/images/admin_login.png")} alt="" />
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
              autoComplete="off">
              <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <div className="input_block">
                  <span className="input_icon">
                    <img src={require("../../assets/images/usernameicon.png")} alt="" />
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
                ]}>
                <div className="input_block">
                  <span className="input_icon">
                    <img src={require("../../assets/images/password.png")} alt="" />
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
                }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}>
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
