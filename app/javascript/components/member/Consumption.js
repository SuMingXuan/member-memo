import React from 'react';
import { Modal, Form, InputNumber, Button } from 'antd';
const { Item } = Form
export default class Consumption extends React.Component {
  state = {
    savingsAmount: 0,
    originalAmount: 0,
    showSavingsDetail: false,
  }

  calcSavingsAmount = (amount) => {
    const { discount } = this.props.member
    const originalAmount = (amount / (discount / 10.0)).toFixed(2)
    const savingsAmount = (originalAmount - amount).toFixed(2)
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
                label="最终消费金额"
              >
                <InputNumber onChange={(value) => this.calcSavingsAmount(value)} max={member.balance} prefix="￥" className='w-full' size='large' />
              </Item>
            }
            {
              member.points_count > 0 &&
              <Item
                name="points_amount"
                label="最终消费积分"
              >
                <InputNumber max={member.points_count} className='w-full' size='large' />
              </Item>
            }

            {
              showSavingsDetail && <>
                <div className="flex justify-between mb-[20px]">
                  <div className="text-gray-a7a">预计折扣前金额：{originalAmount}</div>
                  <div className="text-gray-a7a">预计节约：{savingsAmount}</div>
                </div>
              </>
            }

            <Item>
              <Button type="primary" htmlType="submit" className="btn-primary rounded-[12px] float-right w-[150px]">
                确定
              </Button>
            </Item>
          </Form>
        </Modal>
      </>
    )
  }
}