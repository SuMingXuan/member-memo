import React from 'react';
import { Form, Button, Input } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

const { Item } = Form;
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
      fetch(`/users/sign_in/send_verify_code`, {
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
          if (!res.success) {
            App.message.error(res.message);
          }
        });

      const countdownTimer = setInterval(() => {
        const { countdown } = this.state;
        if (countdown === 1) {
          clearInterval(countdownTimer);
          this.setState({ sending: false, countdown: 60 });
        } else {
          this.setState({ countdown: countdown - 1 });
        }
      }, 1000);
    }
  };

  SignIn = (values) => {
    fetch(`/users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf_token,
      },
      body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          window.location.href = res.location;
        } else {
          App.message.error(res.message);
        }
      });
  }

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
        name='sign_in'
        layout='vertical'
        className='lg:w-[380px]'
        onFinish={(values) => this.SignIn(values)}
        onFieldsChange={this.handlePhoneChange}
      >
        <input type="hidden" name="authenticity_token" value={csrf_token} />
        <Item
          name='phone'
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
          <Input className='rounded-full px-[19px] py-[10px] h-[48px] text-[16px]' placeholder="手机号码" prefix={<span className='mr-[12px] flex'><PhoneOutlined /></span>} />
        </Item>

        <Item
          name='verify_code'
          rules={[
            {
              required: true,
              message: '请输入验证码！'
            }
          ]}
        >
          <Input
            placeholder="验证码"
            className='rounded-full px-[19px] py-[10px] h-[48px] text-[16px]'
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
