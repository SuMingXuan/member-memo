import React from 'react';
import dayjs from 'dayjs';
import { TimeFormat } from '../../utils/custom_format'
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Descriptions, Input, DatePicker, InputNumber, Tooltip } from 'antd';
import CustomTimeLine from './CustomTimeLine'
import { EyeInvisibleTwoTone, EyeTwoTone } from '@ant-design/icons';


import {
  EditTwoTone,
  QuestionCircleTwoTone
} from '@ant-design/icons';
export default class Show extends React.Component {
  state = {
    editField: null,
    member: this.props.member,
  }

  editFieldHandle = (field) => {
    this.setState({ editField: field })
  }

  onSubmit = (e, name) => {
    const value = e.target.value
    const member = this.state.member

    const values = {}
    values[name] = value
    if (name == 'balance' || name == 'points_count') {
      values.force_income_or_expense = true
    }
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


  toggleMember = (hidden) => {
    const member = this.state.member
    const values = {
      hidden: hidden
    }
    fetch(`/members/${member.uuid}/toggle_display`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf_token,
      },
      body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          member["deleted_at"] = res.deleted_at
          this.setState({ member: member })
          if (res.deleted_at) {
            App.message.success("已移动到不常用。");
          } else {
            App.message.success("已移动到常用列表。");
          }
        } else {
          App.message.error(res.message);
        }
      });
  }

  render() {
    const { member } = this.state
    const { member_orders_group } = this.props
    const ShowValue = ({ value, name }) => <>
      <div className='h-[42px] flex items-center cursor-pointer' onClick={() => this.editFieldHandle(name)} >
        {
          value || <EditTwoTone />
        }
      </div>
    </>

    const ShowOrEditDatePicker = ({ name, value, placeholder }) => <>
      <div className='w-[180px] lg:w-[200px]'>
        {this.state.editField == name ?
          <DatePicker className='w-[180px]' size='large' placeholder={placeholder} defaultValue={value && dayjs(value, TimeFormat.default)} autoFocus onBlur={(e) => { this.onSubmit(e, name) }} locale={locale} />
          :
          <ShowValue value={value} name={name} />
        }
      </div>
    </>

    const ShowOrEditInput = ({ name, value }) => <>
      <div className='w-[180px] lg:w-[200px]'>
        {this.state.editField == name ?
          <Input className='lg:w-[200px] rounded-[8px]' size='large' defaultValue={value} autoFocus onPressEnter={(e) => { this.onSubmit(e, name) }} onBlur={(e) => { this.onSubmit(e, name) }} />
          :
          <ShowValue value={value} name={name} />
        }
      </div>
    </>

    const ShowOrEditAreaInput = ({ name, value, placeholder }) => <>
      <div className='w-[80%] lg:w-[80%] rounded-[8px]'>
        {this.state.editField == name ?
          <Input.TextArea placeholder={placeholder} className='w-[80%] lg:w-[80%] rounded-[8px]' size='large' defaultValue={value} autoFocus onPressEnter={(e) => { this.onSubmit(e, name) }} onBlur={(e) => { this.onSubmit(e, name) }} />
          :
          <ShowValue value={value} name={name} />
        }
      </div>
    </>

    const ShowOrEditAmountInput = ({ name, value, max, min, placeholder }) => <>
      <div className='w-[180px] lg:w-[200px] rounded-[8px]'>
        {this.state.editField == name ?
          <InputNumber className='w-[180px]' max={max} min={min} placeholder={placeholder} size='large' defaultValue={value} autoFocus onPressEnter={(e) => { this.onSubmit(e, name) }} onBlur={(e) => { this.onSubmit(e, name) }} />
          :
          <ShowValue value={value} name={name} />
        }
      </div>
    </>
    const BaseLabel = ({ name, label }) => <div className='w-[80px] lg:w-[100px] cursor-pointer' onClick={() => { this.setState({ editField: name }) }}>{label}</div>
    const items = [
      {
        key: 'card_number',
        span: 1,
        label: <BaseLabel name='card_number' label='会员卡号' />,
        children: <ShowOrEditInput name='card_number' value={member.card_number} />,
      },
      // {
      //   key: 'store_name',
      //   span: 1,
      //   label: <BaseLabel name='store_name' label='门店名称' />,
      //   children: <ShowOrEditInput name='store_name' value={member.store_name} />,
      // },
      {
        key: 'balance',
        span: 1,
        label: <BaseLabel name='balance' label={
          <div className='flex gap-[5px] items-center'>
            余额
            <Tooltip placement="right" title="如果余额出现了偏差可以在这里强制修正余额">
              <QuestionCircleTwoTone />
            </Tooltip>
          </div>} />,
        children: <ShowOrEditAmountInput name='balance' value={member.balance} />,
      },
      {
        key: 'points_count',
        span: 1,
        label: <BaseLabel name='points_count' label={
          <div className='flex gap-[5px] items-center'>
            积分
            <Tooltip placement="right" title="如果积分出现了偏差可以在这里强制修正积分。如果在这里的积分不为 0，则该会员卡会开启积分系统。">
              <QuestionCircleTwoTone />
            </Tooltip>
          </div>} />,
        children: <ShowOrEditAmountInput name='points_count' value={member.points_count} />,
      },
      {
        key: 'discount',
        span: 1,
        label: <BaseLabel name='discount' label='折扣' />,
        children: <ShowOrEditAmountInput name='discount' max={10.0} min={0.01} placeholder="0 - 10的折扣" value={member.discount} />,
      },
      {
        key: 'total_savings_amount',
        span: 1,
        label: '总共节省',
        children: <div className='h-[42px] flex items-center text-green-47C'>
          {
            member.total_savings_amount
          }
        </div>,
      },
      {
        key: 'level',
        span: 1,
        label: <BaseLabel name='level' label='会员等级' />,
        children: <ShowOrEditInput name='level' value={member.level} />,
      },
      {
        key: 'expires_at',
        span: 1,
        label: <BaseLabel name='expires_at' label='过期时间' />,
        children: <ShowOrEditDatePicker placeholder="不填则永久有效" name='expires_at' value={member.expires_at} />,
      },
      {
        key: 'birthday',
        span: 1,
        label: <BaseLabel name='birthday' label='生日' />,
        children: <ShowOrEditDatePicker name='birthday' value={member.birthday} />,
      },
      {
        key: 'store_address',
        span: 1,
        label: <BaseLabel name='store_address' label='门店地址' />,
        children: <ShowOrEditInput name='store_address' value={member.store_address} />,
      },
      {
        key: 'activity_rules',
        span: 1,
        label: <BaseLabel name='activity_rules' label='备注' />,
        children: <ShowOrEditAreaInput placeholder="可以备注一些额外的活动规则" name='activity_rules' value={member.activity_rules} />,
      },
    ];
    return (
      <>
        <div className='flex flex-col lg:flex-row'>
          <div className="lg:h-[calc(100vh-64px)] lg:max-h-[calc(100vh-64px)] lg:overflow-scroll lg:p-[50px] lg:border-r mb-[30px] lg:mb-0">
            <Descriptions size="small" column={1} title={
              <h2 className='text-center mt-[20px] lg:mt-0 relative'>
                {member.store_name}
                {
                  member.deleted_at ?
                    <EyeTwoTone
                      onClick={() => { this.toggleMember(false) }}
                      size='large'
                      className='absolute right-0 cursor-pointer' /> :
                    <EyeInvisibleTwoTone
                      onClick={() => { this.toggleMember(true) }}
                      size='large'
                      className='absolute right-0 cursor-pointer'
                      twoToneColor='#FF4857' />
                }

              </h2>
            } bordered items={items} />
          </div>
          <div className="lg:h-[calc(100vh-64px)] lg:max-h-[calc(100vh-64px)] lg:overflow-scroll lg:px-[50px] lg:py-[50px] lg:flex-1">
            <CustomTimeLine groups={member_orders_group} />
          </div>
        </div>
      </>
    );
  }
}
