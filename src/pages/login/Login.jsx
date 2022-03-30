import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import "./login_styles.scss";
export const Login = () => {
  const onFinish = async (values) => {
    console.log(values);
    const url = "https://capstone-web-server-nabati.herokuapp.com/login";
    const form = new FormData();
    form.append("email", "NguyenNDB@capstone.com");
    form.append("password", "ERPsTGsKbi");
    fetch(url, {
      body: form,
      method: "post",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

    // const data = {
    //   khoa: 0,
    //   roleId: 1,
    //   specializationId: 1,
    //   personalEmail: "Nguyenndb511@gmail.com",
    //   name: "Nguyen",
    //   age: 20,
    //   avatar: "string",
    //   phone: "string",
    //   gender: 0,
    //   address: "string",
    // };
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // if (response.status === 200)
    navigate("/management", { replace: true });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();

    navigate("/management", { replace: true });
  }
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
