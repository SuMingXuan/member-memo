import React from 'react';
import {
  UserOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  AppstoreOutlined,
  AccountBookOutlined
} from '@ant-design/icons';
import { Layout, Menu, Divider, FloatButton, Modal, Card } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const { Sider } = Layout;

export default class LeftSider extends React.Component {
  state = {
    openCustomService: false
  }
  render() {
    const { activeKey, logo, custom_qr_code } = this.props
    const { openCustomService } = this.state
    const items = [
      {
        key: 'members',
        icon: <CreditCardOutlined />,
        label: <a href='/members'>卡管理</a>,
      },
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <a href='/profile'>个人信息</a>,
      },
      {
        key: 'product',
        icon: <AccountBookOutlined />,
        label: <a href='/products'>购买卡位</a>,
      },
      {
        key: 'customer',
        icon: <CustomerServiceOutlined />,
        label: <a onClick={() => { this.setState({ openCustomService: true }) }}>联系我们</a>,
      },
    ];

    return (
      <nav className='sticky top-0 left-0 bg-white shadow z-[999]'>

        {
          MobilePlatform ?
            <>
              < FloatButton.Group
                trigger="click"
                type="primary"
                className='z-[999]'
                style={{ right: 5, bottom: 80 }}
                icon={< AppstoreOutlined />}
              >
                <FloatButton type={activeKey == "members" ? "primary" : 'default'} className="shadow-2xl border-primary-599" href='/members' icon={<CreditCardOutlined />} />
                <FloatButton type={activeKey == "profile" ? "primary" : 'default'} className="shadow-2xl border-primary-599" href='/profile' icon={<UserOutlined />} />
                <FloatButton type={activeKey == "products" ? "primary" : 'default'} className="shadow-2xl border-primary-599" href='/products' icon={<AccountBookOutlined />} />
                <FloatButton type={activeKey == "customer" ? "primary" : 'default'} className="shadow-2xl border-primary-599" onClick={() => { this.setState({ openCustomService: true }) }} icon={<CustomerServiceOutlined />} />
              </FloatButton.Group >
            </>
            :
            <Layout className='hidden lg:flex h-[100vh]'>
              <Sider theme='light'>
                <div className="demo-logo-vertical flex justify-center p-[20px]">
                  <img src={logo} className='rounded-[12px] w-[200px]'></img>
                </div>
                <Divider className='mt-0' />
                <Menu className='border-e-0' defaultSelectedKeys={[activeKey]} defaultOpenKeys={['card']} mode="inline" items={items} />
              </Sider>
            </Layout>
        }
        <Modal centered open={openCustomService} footer={null} onCancel={() => { this.setState({ openCustomService: false }) }}>
          <div className='flex items-center lg:flex-row flex-col gap-[25px] py-[50px]'>
            <div className='border rounded-[12px] p-[5px] lg:p-[20px]'>
              <img src={custom_qr_code} className='w-[120px]' />
            </div>

            <div className='lg:text-xl flex flex-col gap-[15px]'>
              <div className='text-center lg:text-start'>
                电话：<a href='tel:13608077730'>13608077730</a>
              </div>
              <div>
                <CopyToClipboard
                  text="SSS13608077730"
                  onCopy={() => App.message.success('复制成功')}>
                  <div className='text-center lg:text-start'>
                    微信：13608077730
                  </div>
                </CopyToClipboard>
              </div>
              <div className='opacity-80 text-center text-base lg:text-start'>
                如果使用中有任何问题请随时联系我们。
              </div>
            </div>
          </div>
        </Modal>
      </nav>

    );
  }
}
