import React from 'react';
import { Modal, Form, InputNumber, Button } from 'antd';
const { Item } = Form
import * as CalculateUtil from '../../utils/calculate_util.js'
export default class Consumption extends React.Component {
  state = {
    savingsAmount: 0,
    originalAmount: 0,
    showSavingsDetail: false,
  }

  calcSavingsAmount = (amount) => {
    const { discount } = this.props.member
    const originalAmount = CalculateUtil.OriginalAmount(amount, discount)
    const savingsAmount = CalculateUtil.SavingsAmount(amount, discount)
    this.setState({ savingsAmount, originalAmount, showSavingsDetail: true })
  }

  render() {
    const { openConsumption, member, closeConsumptionModal, onSubmit } = this.props
    const { savingsAmount, originalAmount, showSavingsDetail } = this.state
    return (
      <>
        <Modal
          title={`${member.store_name} 消费`}
          zIndex={300}
          style={{
            top: MobilePlatform ? 20 : 100,
          }}
          open={openConsumption}
          footer={null}
          onCancel={() => closeConsumptionModal()}>

          <Form
            layout="vertical"
            name="create_member"
            onFinish={(values) => onSubmit(values)}
          >
            <input type="hidden" name="authenticity_token" value={csrf_token} />

            {
              member.balance > 0 &&
              <Item
                name="amount"
                label="本次消费金额"
              >
                <InputNumber onChange={(value) => this.calcSavingsAmount(value)} max={member.balance} min={0} prefix="￥" className='w-full' size='large' />
              </Item>
            }
            {
              member.points_count > 0 &&
              <Item
                name="points_amount"
                label="本次消费积分"
              >
                <InputNumber placeholder='没有则不填' max={member.points_count} min={0} className='w-full' size='large' />
              </Item>
            }

            {
              showSavingsDetail && <>
                <div className="flex justify-between mb-[20px]">
                  <div className="text-gray-a7a">折扣前：{originalAmount}</div>
                  <div className="text-gray-a7a">节省：{savingsAmount}</div>
                </div>
              </>
            }

            <Item>
              <Button type="primary" htmlType="submit" className="btn-primary rounded-[12px] float-right w-[120px]">
                确定
              </Button>
            </Item>
          </Form>
        </Modal>
      </>
    )
  }
}