import React from 'react';
import { Modal, Form, InputNumber, Button } from 'antd';
const { Item } = Form
export default class Recharge extends React.Component {

  render() {
    const { openCharge, member, closeRechargeModal, onSubmit } = this.props
    return (
      <>
        <Modal
          title={`${member.store_name} 充值`}
          zIndex={300}
          style={{
            top: MobilePlatform ? 20 : 100,
          }}
          open={openCharge}
          footer={null}
          onCancel={() => closeRechargeModal()}>

          <Form
            layout="vertical"
            name="create_member"
            onFinish={(values) => onSubmit(values)}
          >

            <Item
              name="amount"
              label="金额"
              rules={[
                ({ getFieldValue }) => ({
                  validator: (_, value) => {
                    const pointsAmount = getFieldValue('points_amount');
                    if (!value && !pointsAmount) {
                      const message = member.points_count > 0 ? '金额和积分至少需要填写一个' : '需要填写金额'
                      return Promise.reject(message);
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                prefix="￥"
                className='w-full'
                size='large'
              />
            </Item>
            {
              member.points_count > 0 &&
              <Item
                name="points_amount"
                label="积分"
                rules={[
                  ({ getFieldValue }) => ({
                    validator: (_, value) => {
                      const amount = getFieldValue('amount');
                      if (!value && !amount) {
                        return Promise.reject('金额和积分至少需要填写一个');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  className='w-full'
                  size='large'
                />
              </Item>
            }

            <Item>
              <Button onClick={() => closeRechargeModal()} type="primary" htmlType="submit" className="btn-primary rounded-[12px] float-right w-[150px]">
                确定
              </Button>
            </Item>
          </Form>
        </Modal>
      </>
    )
  }
}