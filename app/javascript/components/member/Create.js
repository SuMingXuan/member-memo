import React from 'react';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { TimeFormat } from '../../utils/custom_format'
import * as CalculateUtil from '../../utils/calculate_util.js'

import { PlusOutlined } from '@ant-design/icons';
import { Button, FloatButton, Modal, Form, Input, DatePicker, InputNumber, Col, Row, Radio } from 'antd';
const { Item } = Form

export default class Create extends React.Component {
  state = {
    isModalOpen: false,
    theme: 'dark',
    discount: 10,
    showSavingsDetail: false,
    consumptionAmount: 0,
    rechargeAmount: 0,
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
          visit(res.location);
        } else {
          App.message.error(res.message);
        }
      });

  }
  openCreateModal = () => {
    // const { userInfo } = this.props
    // if (userInfo.max_members_count < userInfo.members_count) {
    //   visit('/products')
    // } else {
      this.setState({ isModalOpen: true })
    // }
  }

  closeCreateModal = () => {
    this.setState({ isModalOpen: false })
  }

  onDiscountChange = (value) => {
    if (value > 0) {
      this.setState({ showSavingsDetail: true, discount: value })
    }
  }

  selectTheme = (e) => {
    this.setState({ theme: e.target.value })
  }
  render() {
    const { isModalOpen, theme, discount, showSavingsDetail, consumptionAmount, rechargeAmount } = this.state
    const { userInfo, themesList } = this.props
    const initialValues = {
      card_number: userInfo.phone || userInfo.name,
      birthday: userInfo.birthday && dayjs(userInfo.birthday, TimeFormat.default),
      theme: theme,
      balance: 0,
      consumption: 0,
      discount: 10,
    }

    const ColorRadio = ({ value }) => (
      <Radio value={value} className={`hidden-radio w-[80px] h-[50px] rounded-[12px] hover:opacity-100 ${this.state.theme == value ? 'opacity-100 border-[3px] border-primary-599' : 'opacity-50'} bg-gradient-${value}`} />
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
                className='lg:block fixed hidden right-[60px] bottom-[10%] btn-primary w-[120px] h-[45px] rounded-[8px] shadow-2xl z-[100]'>
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

            <Row gutter={24}>
              <Col span={8}>
                <Item
                  name="balance"
                  label="充值金额"
                  help={
                    showSavingsDetail && `剩余：¥ ${rechargeAmount - consumptionAmount}`
                  }
                >
                  <InputNumber min={0} prefix="￥" className='w-full' size='large' onChange={(value) => this.setState({ rechargeAmount: value })} />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  name="consumption"
                  label="本次消费"

                  help={
                    showSavingsDetail && `折扣前：¥ ${CalculateUtil.OriginalAmount(consumptionAmount, discount)}`
                  }
                >
                  <InputNumber min={0} prefix="￥" className='w-full' size='large' onChange={(value) => { this.setState({ consumptionAmount: value }) }} />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  name="discount"
                  label="折扣"
                  help={
                    showSavingsDetail && `节省：¥ ${CalculateUtil.SavingsAmount(consumptionAmount, discount)}`
                  }
                >
                  <InputNumber suffix="折" placeholder='0-10之间' max={10} min={0} onChange={(value) => this.onDiscountChange(value)} className='w-full' size='large' />
                </Item>
              </Col>
            </Row>

            {/* <Item
              name="birthday"
              label="生日"
            >
              <DatePicker placeholder='' className='common-input w-full' size='large' format={TimeFormat.default} locale={locale} />
            </Item> */}

            <Item
              name="theme"
              label="卡面"
            >
              <Radio.Group className='flex justify-start gap-[10px]' onChange={(e) => { this.selectTheme(e) }}>
                {
                  themesList.map((theme) => <ColorRadio value={theme} />)
                }
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
