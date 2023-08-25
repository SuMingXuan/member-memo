import React from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


export default class LeftSider extends React.Component {
  state = {
    collapsed: false
  }
  getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  render() {
    const { collapsed } = this.state
    const items = [
      {
        key: 'dashboard',
        icon: <PieChartOutlined />,
        label: <a data-turbo-track="replace" href='/'>看板</a>
      },
      {
        key: 'member',
        icon: <UserOutlined />,
        label: '会员'
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
