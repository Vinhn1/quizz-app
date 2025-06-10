import React from "react";
// tao lien ket trang nguoc lai login
import {Link} from 'react-router-dom';
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { register } from "../../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try{
      await register(values);
      message.success('Đăng ký thành công!');
      navigate('/');
    }catch(error){
      message.error('Đăng ký thất bại. Vui lòng thử lại!')
    }
  };

  return (
    <div className="register">
      <h2 className="register__title">Đăng ký tài khoản</h2>
      <Form
        className="register__form"
        name="register"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input placeholder="Nhập họ tên..." />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email',message: "Email không hợp lệ!"}]}
        >
          <Input placeholder="Nhập email..." />
        </Form.Item>

        <Form.Item
          label="Mật Khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input placeholder="Nhập mật khẩu..." />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={['password']}
          rules={[{ required: true, message: "Xác nhận mật khẩu!"}, ({getFieldValue}) => ({
            validator(_, value){
                if(!value || getFieldValue('password') === value){
                    return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'))
            },
          }),
        ]}
        >
          <Input placeholder="Nhập lại mật khẩu..." />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="register__submit">
                Đăng ký
            </Button>
            <p>Đã có tài khoản? <Link to="/">Đăng Nhập</Link></p>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
