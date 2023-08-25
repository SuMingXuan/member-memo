import React from 'react';
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;


export default class LeftSider extends React.Component {
  render() {
    const items = [
      {
        key: 'dashboard',
        icon: <PieChartOutlined />,
        label: <a data-turbo-frame="main_frame" data-turbo-action="replace" href='/'>看板</a>,
      },
      {
        key: 'member',
        icon: <UserOutlined />,
        label: <a data-turbo-frame="main_frame" data-turbo-action="replace" href='/'>会员</a>
      },
      {
        key: 'coupons',
        icon: <UserOutlined />,
        label: '优惠券'
      },
      {
        key: 'points',
        icon: <UserOutlined />,
        label: '积分'
      },
      {
        key: 'member_order',
        icon: <UserOutlined />,
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
    ];


    return (
      <Layout className='h-[calc(100vh-50px)] bg-primary'>
        <Sider theme='light'>
          <div className="demo-logo-vertical" />
          <Menu defaultSelectedKeys={'dashboard'} mode="inline" items={items} />
        </Sider>
      </Layout>
    );
  }
}
