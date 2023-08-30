import React from 'react';
import dayjs from 'dayjs';

import { Badge, Descriptions, Input, DatePicker, InputNumber } from 'antd';

import {
  EditOutlined,
} from '@ant-design/icons';
export default class Show extends React.Component {
  state = {
    editField: null,
    member: this.props.member
  }

  editFieldHandle = (field) => {
    this.setState({ editField: field })
  }

  onSubmit = (e, name) => {
    const value = e.target.value
    const member = this.state.member

    const values = {}
    values[name] = value
    fetch(`/members/${member.uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf_token,
      },
      body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          member[name] = value
          this.setState({ editField: null })
          this.setState({ member: member })
        } else {
          App.message.error(res.message);
        }
      });
  }

  render() {
    const { member } = this.state

    const ShowValue = ({ value, name }) => <>
      <div className='h-[42px] flex items-center cursor-pointer' onClick={() => this.editFieldHandle(name)} >
        {
          value || <EditOutlined />
        }
      </div>
    </>

    const ShowOrEditDatePicker = ({ name, value }) => <>
      <div className='w-[180px] lg:w-[200px]'>
        {this.state.editField == name ?
          <DatePicker className='w-[180px]' size='large' defaultValue={value && dayjs(value, dateFormat)} autoFocus onBlur={(e) => { this.onSubmit(e, name) }} />
          :
          <ShowValue value={value} name={name} />
        }
      </div>
    </>

    const ShowOrEditInput = ({ name, value }) => <>
      <div className='w-[180px] lg:w-[200px]'>
        {this.state.editField == name ?
          <Input className='lg:w-[200px]' size='large' defaultValue={value} autoFocus onPressEnter={(e) => { this.onSubmit(e, name) }} onBlur={(e) => { this.onSubmit(e, name) }} />
          :
          <ShowValue value={value} name={name} />
        }
      </div>
    </>

    const ShowOrEditBalanceInput = ({ name, value }) => <>
      <div className='w-[180px] lg:w-[200px]'>
        {this.state.editField == name ?
          <InputNumber className='w-[180px]' size='large' defaultValue={value} autoFocus onPressEnter={(e) => { this.onSubmit(e, name) }} onBlur={(e) => { this.onSubmit(e, name) }} />
          :
          <ShowValue value={value} name={name} />
        }
      </div>
    </>
    const BaseLabel = ({ name, label }) => <div className='w-[80px] lg:w-[100px] cursor-pointer' onClick={() => { this.setState({ editField: name }) }}>{label}</div>
    const items = [
      {
        key: 'card_number',
        span: 2,
        label: <BaseLabel name='card_number' label='会员卡号' />,
        children: <ShowOrEditInput name='card_number' value={member.card_number}></ShowOrEditInput>,
      },
      {
        key: 'store_name',
        span: 2,
        label: <BaseLabel name='store_name' label='门店名称' />,
        children: <ShowOrEditInput name='store_name' value={member.store_name}></ShowOrEditInput>,
      },
      {
        key: 'balance',
        span: 2,
        label: <BaseLabel name='balance' label='余额' />,
        children: <ShowOrEditBalanceInput name='balance' value={member.balance}></ShowOrEditBalanceInput>,
      },
      {
        key: 'level',
        span: 2,
        label: <BaseLabel name='level' label='会员等级' />,
        children: <ShowOrEditInput name='level' value={member.level}></ShowOrEditInput>,
      },
      {
        key: 'expires_at',
        span: 2,
        label: <BaseLabel name='expires_at' label='过期时间' />,
        children: <ShowOrEditDatePicker name='expires_at' value={member.expires_at}></ShowOrEditDatePicker>,
      },
      {
        key: 'birthday',
        span: 2,
        label: <BaseLabel name='birthday' label='生日' />,
        children: <ShowOrEditDatePicker name='birthday' value={member.birthday}></ShowOrEditDatePicker>,
      },
      {
        key: 'store_address',
        span: 2,
        label: <BaseLabel name='store_address' label='门店地址' />,
        children: <ShowOrEditInput name='store_address' value={member.store_address}></ShowOrEditInput>,
      },
      {
        key: 'activity_rules',
        span: 2,
        label: <BaseLabel name='activity_rules' label='活动说明' />,
        children: <ShowOrEditInput name='activity_rules' value={member.activity_rules}></ShowOrEditInput>,
      },
    ];
    return (
      <>
        <Descriptions column={MobilePlatform ? 2 : 4} title={<h2 className='text-center'>{member.store_name}</h2>} bordered items={items} />
      </>
    );
  }
}
