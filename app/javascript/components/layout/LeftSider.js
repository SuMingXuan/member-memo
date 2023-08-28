import React from 'react';
import {
  PieChartOutlined,
  UserOutlined,
  CreditCardOutlined,
  TransactionOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Layout, Menu, Divider, FloatButton } from 'antd';
const { Sider } = Layout;

export default class LeftSider extends React.Component {
  render() {
    const { activeKey = 'dashboard', logo } = this.props
    const items = [
      {
        key: 'dashboard',
        icon: <PieChartOutlined />,
        label: <a data-turbo-frame="main_frame" data-turbo-action="replace" href='/'>看板</a>,
      },
      {
        key: 'card',
        icon: <CreditCardOutlined />,
        label: <a data-turbo-frame="main_frame" data-turbo-action="replace" href='/members'>卡管理</a>,
      },
      {
        key: 'member_order',
        icon: <TransactionOutlined />,
        label: '订单',
        children: [
          {
            key: 'consumption',
            label: '消费',
          },
          {
            key: 'recharge',
            label: '充值',
          },
        ]
      },
      {
        key: 'user',
        icon: <UserOutlined />,
        label: '个人信息',
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
            <FloatButton type='primary' data-turbo-frame='main_frame' data-turbo-action="replace" href='/' icon={<PieChartOutlined />} />
            <FloatButton type='primary' data-turbo-frame='main_frame' data-turbo-action="replace" href='/members' icon={<CreditCardOutlined />} />
            <FloatButton type='primary' icon={<TransactionOutlined />} />
            <FloatButton type='primary' icon={<UserOutlined />} />
          </FloatButton.Group>
        </>
        :
        <Layout className='hidden lg:flex h-[100vh] strick bg-white'>
          <Sider theme='light'>
            <div className="demo-logo-vertical flex justify-center">
              <img src={logo} className='rounded-[12px] my-[20px] w-[90px]'></img>
            </div>
            <Divider />
            <Menu defaultSelectedKeys={[activeKey]} defaultOpenKeys={['card']} mode="inline" items={items} />
          </Sider>
        </Layout>

    );
  }
}
