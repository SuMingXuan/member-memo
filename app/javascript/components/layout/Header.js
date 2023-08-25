import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';


export default class Header extends React.Component {
  render() {
    const { phone } = this.props
    const items = [
      {
        label: <span className='text-gray'>{phone}</span>,
        icon: <UserOutlined />,
        children: [
          {
            key: 'userInfo',
            label: '个人信息',
          },
          {
            key: 'signOut',
            label: <a data-turbo-method="delete" href="/users/sign_out">退出登录</a>,
          },
        ],
      }
    ];

    return (
      <Menu className='justify-end h-[50px] items-center' mode="horizontal" items={items} />
    );
  }
}
