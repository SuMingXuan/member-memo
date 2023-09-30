import React from 'react';
import {
  CopyTwoTone

} from '@ant-design/icons';
import { Button, Card } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class List extends React.Component {
  state = {
    selectedProductId: null,
    price: 0,
  }

  submitPayment = (paymentMethod) => {
    const { selectedProductId } = this.state
    fetch(`/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf_token,
      },
      body: JSON.stringify({
        product_uuid: selectedProductId,
        payment_method: paymentMethod
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          window.location.href = res.pay_url
        } else {
          App.message.error(res.message);
        }
      });
  }
  render() {
    const { invitation_url, products, user, alipay_icon, wxpay_icon } = this.props
    const { selectedProductId } = this.state
    console.log(selectedProductId)
    return (
      <div className='relative'>
        <div>
          <h2 className='text-center my-[20px] lg:my-[40px] text-2xl lg:text-[32px]'>购买卡位</h2>
          {
            user.members_count > user.max_members_count &&
            <p className='text-sm lg:text-base text-red-FF4 mb-[20px] lg:mb-[40px] text-center'>当前不能再创建会员卡了，请及时购买。</p>
          }
        </div>
        <div className='flex flex-col lg:flex-row gap-[20px] lg:items-center lg:justify-between'>
          <CopyToClipboard
            text={invitation_url}
            onCopy={() => App.message.success('复制成功')}>
            <Card onClick={() => { this.setState({ selectedProductId: 'free' }) }} className={`${selectedProductId == 'free' && 'selected-product'} lg:w-[300px] text-center cursor-pointer transition-shadow ease-in-out hover:border-primary-599`} title={
              <span className='text-2xl'>免费</span>
            }>
              <div>

                <div className='hover:text-primary-599 flex items-center cursor-pointer gap-[15px] text-start'>
                  {invitation_url}
                </div>
              </div>
              <div className='text-start mt-[15px]'>
                每成功邀请一位新用户即可获得一张额外的卡位
              </div>
            </Card>
          </CopyToClipboard>

          {
            products.map((product) => (
              <Card key={product.uuid} onClick={() => { this.setState({ selectedProductId: product.uuid, price: product.price }) }} className={`${selectedProductId == product.uuid && 'selected-product'} lg:w-[300px] lg:h-[200px] text-center cursor-pointer hover:shadow transition-shadow ease-in-out hover:border-primary-599`} title={
                <span className='text-2xl'>¥ {product.price}</span>
              }>
                <div className='text-center text-xl'>
                  {product.count} 张
                </div>
              </Card>
            ))
          }


        </div>
        {
          selectedProductId && selectedProductId != "free" && <div className='bg-[#fbfbfb] flex flex-col lg:flex-row justify-end gap-[15px] lg:gap-[30px] mt-[20px] lg:mt-[80px] sticky bottom-[20px] lg:bottom-0 items-start lg:items-center'>
            <div className='text-right'>
              总计：
              <span className='text-base lg:text-[32px] text-primary-599 mr-[20px]'>
                {this.state.price}
              </span>
            </div>
            <div className='flex flex-row gap-[30px] justify-between lg:justify-end w-full lg:w-[unset]'>
              <div>

                <Button
                  onClick={() => { this.submitPayment("ali") }}
                  size="large"
                  className='hover:border-2 w-[120px] h-[45px] rounded-[8px] shadow border-primary-599 text-primary-599 flex items-center justify-center gap-[5px]'>
                  <img className='w-[15px]' src={alipay_icon} />
                  支付宝
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => { this.submitPayment("wechat") }}
                  size="large"
                  className='hover:border-2 w-[120px] h-[45px] rounded-[8px] shadow border-green-47C text-green-47C flex items-center justify-center gap-[5px]'>
                  <img className='w-[15px]' src={wxpay_icon} />
                  微信
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
