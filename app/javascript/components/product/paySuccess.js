import React from 'react';
import { Button, Result } from 'antd';

export default class List extends React.Component {
  render() {
    return (
      <Result
        status="success"
        title="购买成功"
        extra={[
          <Button
            type='primary'
            href='/members'
            className='btn-primary m-auto w-[120px] h-[45px] rounded-[8px] shadow-2xl'>
            去创建
          </Button>,
        ]}
      />
    );
  }
}
