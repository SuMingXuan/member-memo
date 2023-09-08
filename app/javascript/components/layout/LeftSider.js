import React from 'react';
import {
  UserOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Layout, Menu, Divider, FloatButton } from 'antd';
const { Sider } = Layout;

export default class LeftSider extends React.Component {
  render() {
    const { activeKey, logo } = this.props
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
        key: 'customer',
        icon: <CustomerServiceOutlined />,
        label: <a href='/'>疑问咨询</a>,
      },
    ];

    return (
      MobilePlatform ?
        <>
          <FloatButton.Group
            trigger="click"
            type="primary"
            style={{ right: 5, bottom: 80 }}
            icon={<AppstoreOutlined />}
          >
            <FloatButton className="shadow-2xl" type='primary' href='/members' icon={<CreditCardOutlined />} />
            <FloatButton className="shadow-2xl" type='primary' href='/profile' icon={<UserOutlined />} />
          </FloatButton.Group>
        </>
        :
        <Layout className='hidden lg:flex h-[100vh] sticky top-0 left-0 bg-white shadow'>
          <Sider theme='light'>
            <div className="demo-logo-vertical flex justify-center">
              <img src={logo} className='rounded-[12px] w-[200px]'></img>
            </div>
            <Divider />
            <Menu className='border-e-0' defaultSelectedKeys={[activeKey]} defaultOpenKeys={['card']} mode="inline" items={items} />
          </Sider>
        </Layout>

    );
  }
}
