import React from 'react';
import { TimeFormat } from '../../utils/custom_format';
export default class Primary extends React.Component {
  render() {
    <>
      <Modal
        title="消费"
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
            <DatePicker className='common-input w-full' size='large' format={TimeFormat.default} locale={locale} />
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
  }
}