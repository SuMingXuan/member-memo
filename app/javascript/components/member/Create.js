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
  createMember = () => {

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
      birthday: dayjs(userInfo.birthday, dateFormat),
      theme: theme
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
                className='lg:block hidden btn-primary w-[200px] h-[60px] mr-[20px] rounded-[12px] shadow-2xl'>
                创建
              </Button>
            </div>
        }

        <Modal title="创建会员" open={isModalOpen} onCancel={() => this.closeCreateModal()}>
          <Form
            layout="vertical"
            name="create_member"
            initialValues={initialValues}
            onFinish={() => this.createMember()}
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
                  <InputNumber prefix="￥" className='w-full' size='large' defaultValue={0} />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  name="consumption"
                  label="本次消费金额"
                >
                  <InputNumber prefix="￥" className='w-full' size='large' defaultValue={0} />
                </Item>
              </Col>
            </Row>

            <Item
              name="birthday"
              label="生日"
              help='如果补充生日，我们会在当天发送提醒'
            >
              <DatePicker className='common-input w-full' size='large' format={dateFormat} locale={locale} />
            </Item>

            <Item
              name="theme"
              label="卡面"
            >
              <Radio.Group className='flex justify-start gap-[10px]' defaultValue={theme} onChange={(e) => { this.selectTheme(e) }}>
                <ColorRadio value='dark' />
                <ColorRadio value='primary' />
              </Radio.Group>
            </Item>

          </Form>
        </Modal>
      </>
    );
  }
}
