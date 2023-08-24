import React from 'react';
import { Form, Button, Input } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

const { Item } = Form;
const csrf_token = document.querySelector('meta[name=csrf-token]').getAttribute('content');

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      countdown: 60,
      phoneValue: null,
    };
  }

  sendVerifyCode = () => {
    if (!this.state.sending) {
      this.setState({ sending: true });
      fetch(`/users/sign_up/send_verify_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf_token,
        },
        body: JSON.stringify({
          phone: this.state.phoneValue
        })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setTimeout(() => Turbolinks.visit(location.toString()), 1000);
            App.message.success('操作成功！');
          } else {
            App.message.error(`操作失败！${res.message}`);
          }
        });

      const countdownTimer = setInterval(() => {
        const { countdown } = this.state;
        if (countdown === 1) {
          clearInterval(countdownTimer);
          this.setState({ sending: false, countdown: 0 });
        } else {
          this.setState({ countdown: countdown - 1 });
        }
      }, 1000);
    }
  };

  handlePhoneChange = (_, field) => {
    const phoneField = field[0]
    if (phoneField.validating || phoneField.errors.length === 0) {
      this.setState({ phoneValue: phoneField.value });
    } else {
      this.setState({ phoneValue: null });
    }
  };

  render() {
    const { sending, countdown, phoneValue } = this.state;

    return (
      <Form
        name='sign_up'
        layout='vertical'
        className='lg:w-[380px]'
        onFinish={this.SignUp}
        onFieldsChange={this.handlePhoneChange} // 监听字段变化
      >
        <Item
          name={['user', 'phone']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入手机号码！'
            },
            {
              pattern: /^1[0-9]{10}$/,
              message: '请输入正确的手机号码！'
            }
          ]}
        >
          <Input placeholder="手机号码" prefix={<PhoneOutlined />} />
        </Item>

        <Item
          name={['user', 'verify_code']}
          rules={[
            {
              required: true,
              message: '请输入验证码！'
            }
          ]}
        >
          <Input
            placeholder="验证码"
            suffix={
              <Button type="link" block onClick={this.sendVerifyCode} disabled={sending || !phoneValue}>
                {
                  sending ? `${countdown}s 后重发` : '获取验证码'
                }
              </Button>
            }
          />
        </Item>

        <Item className='flex justify-center'>
          <Button type='primary' htmlType="submit" className='btn-primary w-[200px]'>登录</Button>
        </Item>
      </Form>
    );
  }
}
