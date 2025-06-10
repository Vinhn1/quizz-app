import React from "react";
import { Button, Form, Input, message} from "antd";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import Cookies from 'js-cookie';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
      try{
        const res = await login(values);
        const token = res.data.token;

        Cookies.set('token', token);
        message.success('Đăng nhập thành công!');
        navigate('/topics'); // chuyển sang trang chính sau login
        
      }catch(error){
        message.error('Email hoặc mật khẩu không đúng!');
      }
    };

  return (
    <div className="login">
      <h2 className="login__title">Đăng Nhập</h2>
      <Form
        name="loginForm"
        layout="vertical"
        onFinish={onFinish}
        className="login__form"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật Khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>

      <div className="login__footer">
        Chưa có tài khoản?
        <a href="/register">Đăng ký</a>
      </div>
    </div>
  );
};

export default Login;
