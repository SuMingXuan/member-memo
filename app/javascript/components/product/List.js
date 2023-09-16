import React from 'react';
import { Button, Card, Modal } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class List extends React.Component {
  state = {
    selectedProductId: null,
    price: 0,
    openDonation: false
  }
  render() {
    const { invitation_url, products, user, zfb_private_qrcode, wx_private_qrcode } = this.props
    const { selectedProductId, openDonation } = this.state
    return (
      <div className='relative'>
        <Modal title="其他捐赠方式" open={openDonation} footer={null} onCancel={() => { this.setState({ openDonation: false }) }}>

          <h2 className='text-center my-[20px] lg:my-[40px] text-xl lg:text-[27px]'>感谢你的捐助</h2>
          <p className='text-sm lg:text-base opacity-80 text-primary-599 mb-[10px] lg:mb-[20px] text-center'>
            我们会将捐助的所有钱都用于服务器的维护和开销以及系统的后续迭代。每一分钱都能让这个系统多运行 105.79 秒
          </p>
          <div className="flex flex-col items-center">
            <img src={zfb_private_qrcode} className='w-[250px] mb-[20px]' alt="" />
            <img src={wx_private_qrcode} className='w-[250px]' alt="" />
          </div>
        </Modal>
        <div>
          <h2 className='text-center my-[20px] lg:my-[40px] text-2xl lg:text-[32px]'>
            <span className='cursor-pointer' onClick={() => { this.setState({ openDonation: true }) }} >
              捐赠
            </span>
          </h2>
          <p className='text-sm lg:text-base text-primary-599 mb-[20px] lg:mb-[40px] text-center'>感谢你的支持，我们会更加努力改进微卡！</p>
          {/* {
            user.members_count > user.max_members_count &&
            <p className='text-sm lg:text-base text-red-FF4 mb-[20px] lg:mb-[40px] text-center'>当前不能再创建会员卡了，请及时购买。</p>
          } */}
        </div>
        <div className='flex flex-col lg:flex-row gap-[20px] lg:items-center lg:justify-center'>
          <Card onClick={() => { this.setState({ selectedProductId: 'free' }) }} className={`lg:w-[40%] lg:m-w-[400px] text-center cursor-pointer hover:shadow transition-shadow ease-in-out hover:border-primary-599`} title="邀请">
            <div>
              <CopyToClipboard
                text={invitation_url}
                onCopy={() => App.message.success('复制成功')}>
                <div className='hover:text-primary-599 flex items-center cursor-pointer gap-[15px] text-start'>
                  {invitation_url}
                </div>
              </CopyToClipboard>
            </div>
            <div className='text-start mt-[15px]'>
              每邀请一位用户都是对我们的一次鼓励
            </div>
          </Card>
          {/* {
            products.map((product) => (
              <Card onClick={() => { this.setState({ selectedProductId: product.id, price: product.price }) }} className={`${selectedProductId == product.id && 'selected-product'} lg:w-[300px] lg:h-[200px] text-center cursor-pointer hover:shadow transition-shadow ease-in-out hover:border-primary-599`} title={`¥ ${product.price}`}>
                <div className='text-center text-2xl'>
                  {product.count} 张
                </div>
              </Card>
            ))
          } */}


        </div>
        {/* {
          selectedProductId > 0 && <div className='bg-[#fbfbfb] flex flex-col lg:flex-row justify-end gap-[15px] lg:gap-[30px] mt-[20px] lg:mt-[80px] sticky bottom-[20px] lg:bottom-0 items-start lg:items-center'>
            <div className='text-right'>
              总计：
              <span className='text-base lg:text-[32px] text-primary-599 mr-[20px]'>
                {this.state.price}
              </span>
            </div>
            <div className='flex flex-row gap-[30px] justify-between lg:justify-end w-full lg:w-[unset]'>
              <div>

                <Button size="large" className='hover:border-2 w-[120px] h-[45px] rounded-[8px] shadow border-primary-599 text-primary-599 flex items-center justify-center gap-[5px]'>
                  <img className='w-[15px]' src={alipay_icon} />
                  支付宝
                </Button>
              </div>
              <div>
                <Button size="large" className='hover:border-2 w-[120px] h-[45px] rounded-[8px] shadow border-green-47C text-green-47C flex items-center justify-center gap-[5px]'>
                  <img className='w-[15px]' src={wxpay_icon} />
                  微信
                </Button>
              </div>
            </div>
          </div>
        } */}
      </div>
    );
  }
}
