import React from 'react';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { PlusOutlined } from '@ant-design/icons';
import { Button, FloatButton, Modal, Form, Input, DatePicker, InputNumber, Col, Row, Radio } from 'antd';
const { Item } = Form

export default class Create extends React.Component {
  state = {
    isModalOpen: false,
    theme: 'dark',
  }
  createMember = (values) => {
    fetch(`/members`, {
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
          this.setState({ isModalOpen: false })
          Turbo.visit(res.location, { frame: 'main_frame', action: 'replace' });
        } else {
          App.message.error(res.message);
        }
      });

  }
  openCreateModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeCreateModal = () => {
    this.setState({ isModalOpen: false })
  }

  selectTheme = (e) => {
    this.setState({ theme: e.target.value })
  }
  render() {
    const { isModalOpen, theme } = this.state
    const { userInfo } = this.props
    const themeClass = {
      dark: 'bg-gradient-dark',
      primary: 'bg-gradient-primary'
    }
    const initialValues = {
      card_number: userInfo.phone || userInfo.name,
      birthday: userInfo.birthday && dayjs(userInfo.birthday, dateFormat),
      theme: theme,
      balance: 0,
      consumption: 0,
    }

    const ColorRadio = ({ value }) => (
      <Radio value={value} className={`hidden-radio w-[80px] h-[50px] rounded-[12px] hover:opacity-100 ${this.state.theme == value ? 'opacity-100 border-[3px] border-primary-599' : 'opacity-50'} ${themeClass[value]}`} />
    )
    return (
      <>

        {
          MobilePlatform ?
            <FloatButton
              className='block lg:hidden right-[5px] bottom-[20px]'
              type='primary'
              onClick={() => this.openCreateModal()}
              icon={<PlusOutlined />} />
            :
            <div className='flex w-full justify-end'>
              <Button
                type='primary'
                onClick={() => this.openCreateModal()}
                className='lg:block hidden btn-primary w-[150px] h-[45px] mr-[20px] rounded-[12px] shadow-2xl'>
                创建
              </Button>
            </div>
        }

        <Modal
          title="创建会员"
          zIndex={200}
          style={{
            top: MobilePlatform ? 20 : 100,
          }}
          open={isModalOpen}
          footer={null}
          onCancel={() => this.closeCreateModal()}>

          <Form
            layout="vertical"
            name="create_member"
            initialValues={initialValues}
            onFinish={(values) => this.createMember(values)}
          >
            <input type="hidden" name="authenticity_token" value={csrf_token} />
            <Item
              name='store_name'
              label='门店名称'
              rules={[
                {
                  required: true,
                  message: '请输入门店名称'
                }
              ]}
            >
              <Input className='common-input' size='large' placeholder="门店名称" />
            </Item>
            <Item
              name='card_number'
              label='会员卡号'
              rules={[
                {
                  required: true,
                  message: '请输入会员卡号！'
                }
              ]}
            >
              <Input className='common-input' size='large' placeholder="会员卡号" />
            </Item>

            <Row gutter={20}>
              <Col span={12}>
                <Item
                  name="balance"
                  label="充值金额"
                >
                  <InputNumber prefix="￥" className='w-full' size='large' />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  name="consumption"
                  label="本次消费金额"
                >
                  <InputNumber prefix="￥" className='w-full' size='large' />
                </Item>
              </Col>
            </Row>

            <Item
              name="birthday"
              label="会员生日"
              help={userInfo.birthday ? null : '如果该会员有生日活动，补充生日后我们会在当天发送提醒'}
            >
              <DatePicker className='common-input w-full' size='large' format={dateFormat} locale={locale} />
            </Item>

            <Item
              name="theme"
              label="卡面"
            >
              <Radio.Group className='flex justify-start gap-[10px]' onChange={(e) => { this.selectTheme(e) }}>
                <ColorRadio value='dark' />
                <ColorRadio value='primary' />
              </Radio.Group>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="btn-primary rounded-[12px] float-right w-[150px]">
                确定
              </Button>
            </Item>
          </Form>
        </Modal>
      </>
    );
  }
}
