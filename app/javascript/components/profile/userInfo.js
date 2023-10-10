import React from 'react';
import dayjs from 'dayjs';
import { EditTwoTone, CopyTwoTone, QuestionCircleTwoTone } from '@ant-design/icons';
import { Row, Col, Card, DatePicker, Statistic, Tooltip, Input } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { TimeFormat } from '../../utils/custom_format'
import { SeedIcon } from '../../utils/custom_icon'


export default class UserInfo extends React.Component {
  state = {
    editField: null,
    user: this.props.user,
  }
  onSubmit = (event, name) => {
    const user = this.state.user
    const value = event.target.value

    const values = {}
    values[name] = value
    fetch(`/profile`, {
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
          user[name] = value
          this.setState({ editField: null, user: user })
        } else {
          App.message.error(res.message);
        }
      });
  }

  render() {
    const { user, invitation_url, bi_infos, invited_users_count } = this.props
    const ShowOrEditDatePicker = ({ name, value, placeholder }) => <>
      <div>
        {
          this.state.editField == name ?
            <DatePicker className='w-[180px]' placeholder={placeholder} defaultValue={value && dayjs(value, TimeFormat.default)} autoFocus onBlur={(event) => { this.onSubmit(event, name) }} locale={locale} />
            :
            <span onClick={() => { this.setState({ editField: 'birthday' }) }}>
              {value || <span className='opacity-30'>待补充</span>}
            </span>
        }
      </div>
    </>

    const ShowOrEditInput = ({ name, value }) => <>
      <div className=''>
        {this.state.editField == name ?
          <Input className='rounded-[8px]' size='large' defaultValue={value} autoFocus onPressEnter={(e) => { this.onSubmit(e, name) }} onBlur={(e) => { this.onSubmit(e, name) }} />
          :
          <ShowValue value={value} name={name} />
        }
      </div>
    </>

    const ShowValue = ({ value, name }) => <>
      <div className='h-[42px] flex items-center cursor-pointer' onClick={() => this.setState({ editField: name })} >
        {
          value || <EditTwoTone />
        }
      </div>
    </>

    return (
      <div className='flex gap-[25px] flex-wrap'>

        <Card
          className='shadow-xl w-full lg:w-[unset]'
          title={
            <>
              <span>用户信息</span>
              {
                user.seed && <Tooltip placement="bottom" title="会员笔记为早期的种子用户提供更好的服务">
                <SeedIcon className="ml-2 cursor-pointer" />
              </Tooltip>
              }
              
            </>
          }
        >
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Statistic formatter={(value) =>
                <>
                  <div className='flex items-center gap-[20px] cursor-pointer'>

                    <ShowOrEditInput name="name" value={value} />
                    <EditTwoTone onClick={() => { this.setState({ editField: 'name' }) }} />
                  </div>
                </>
              } title="姓名" value={user.name} />

            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Statistic formatter={(value) => <span>{value}</span>} title="电话" value={user.phone} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Statistic formatter={(value) =>
                <>
                  <div className='flex items-center gap-[20px] cursor-pointer'>

                    <ShowOrEditDatePicker name="birthday" value={value} />
                    <EditTwoTone onClick={() => { this.setState({ editField: 'birthday' }) }} />
                  </div>
                </>
              } title="生日" value={user.birthday} />

            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Statistic title="持卡数量" value={user.members_count} />
            </Col>
            {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Statistic title="持卡上限" value={user.max_members_count} />
            </Col> */}
          </Row>
        </Card>
        <Card
          className='shadow-xl w-full lg:w-[unset]'
          title="邀请信息"
          style={{ height: '300px' }}
        >
          <Statistic title="总共邀请人数" value={invited_users_count} />
          <Statistic
            formatter={
              (value) => <div className='text-base'>
                <CopyToClipboard
                  text={invitation_url}
                  onCopy={() => App.message.success('复制成功')}>
                  <div className='hover:text-primary-599 flex items-center cursor-pointer gap-[15px]'>
                    {invitation_url}
                    <CopyTwoTone />
                  </div>
                </CopyToClipboard>
              </div>
            }
            title={
              <div className='flex'>
                邀请链接
                {/* <Tooltip placement="right" title="每成功邀请一位新用户，永久赠送一张持卡数量。">
                  <QuestionCircleTwoTone className='ml-[5px] flex items-center' />
                </Tooltip> */}
              </div>
            }
            value={user.invitation_url} />

        </Card>
        {/* {
          bi_infos.most_frequent_members_of_consumption.stores.length > 0 &&

          <Card
            className='shadow-xl w-full lg:w-[unset]'
            title="最常消费"
          >

            <Statistic
              title={
                <>
                  在
                  {
                    bi_infos.most_frequent_members_of_consumption.stores.map((store) => (
                      <span className='font-bold mx-1'>{store.name}</span>
                    ))
                  }
                  总共消费
                </>
              }
              value={`${bi_infos.most_frequent_members_of_consumption.max_frequent} 次`}
              precision={2} />
          </Card>
        } */}
        <Card
          className='shadow-xl w-full lg:w-[unset]'
          title="总览"
        >
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Statistic title="总余额" value={bi_infos.total_balance} precision={2} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Statistic title="总共消费" valueStyle={{ color: '#FF4857' }} value={bi_infos.total_consumption_amount} precision={2} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Statistic title="总共充值" valueStyle={{ color: '#47C93A' }} value={bi_infos.total_recharge_amount} precision={2} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Statistic title="总共节省" valueStyle={{ color: '#FFBA01' }} value={bi_infos.total_savings_amount} precision={2} />
            </Col>
          </Row>
        </Card>
        {
          bi_infos.most_consumption_store_name_of_member && bi_infos.most_recharge_store_name_member && bi_infos.best_deal_member_savings_amount &&
          <Card
            className='shadow-xl w-full lg:w-[unset]'
            title="最多消费 & 充值 & 节省"
          >
            <Row>
              {
                bi_infos.most_consumption_amount_of_member &&
                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                  <Statistic
                    valueStyle={{ color: '#FF4857' }}
                    title={
                      <>
                        在
                        <span className='font-bold mx-1'>{bi_infos.most_consumption_store_name_of_member}</span>
                        总共消费了
                      </>
                    }
                    value={bi_infos.most_consumption_amount_of_member}
                    precision={2} />
                </Col>
              }
              {
                bi_infos.most_recharge_amount_member &&
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Statistic
                    valueStyle={{ color: '#47C93A' }}
                    title={
                      <>
                        在
                        <span className='font-bold mx-1'>{bi_infos.most_recharge_store_name_member}</span>
                        总共充值了
                      </>
                    }
                    value={bi_infos.most_recharge_amount_member}
                    precision={2} />
                </Col>
              }
              {
                bi_infos.best_deal_member_savings_amount &&
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Statistic
                    valueStyle={{ color: '#FFBA01' }}
                    title={
                      <>
                        在
                        <span className='font-bold mx-1'>{bi_infos.best_deal_member_store_name}</span>
                        总共节省了
                      </>
                    }
                    value={bi_infos.best_deal_member_savings_amount}
                    precision={2} />
                </Col>
              }
            </Row>
          </Card>
        }
        {
          bi_infos.single_most_consumption_amount && bi_infos.single_most_recharge_amount &&
          <Card
            className='shadow-xl w-full lg:w-[unset]'
            title="高光时刻"
          >
            {
              bi_infos.single_most_consumption_amount &&
              <Statistic
                valueStyle={{ color: '#FF4857' }}
                title={
                  <>
                    <span className='mr-1'>
                      {dayjs(bi_infos.single_most_consumption_at).format(TimeFormat.long)}
                    </span>
                    一次性在
                    <span className='font-bold mx-1'>{bi_infos.single_most_consumption_member_store_name}</span>
                    消费了
                  </>
                }
                value={bi_infos.single_most_consumption_amount}
                precision={2} />
            }
            {
              bi_infos.single_most_recharge_amount &&
              <Statistic
                valueStyle={{ color: '#47C93A' }}
                title={
                  <>
                    <span className='mr-1'>
                      {dayjs(bi_infos.single_most_recharge_at).format(TimeFormat.long)}
                    </span>
                    一次性在
                    <span className='font-bold mx-1'>{bi_infos.single_most_recharge_member_store_name}</span>
                    充值了
                  </>
                }
                value={bi_infos.single_most_recharge_amount}
                precision={2} />
            }

          </Card>
        }

      </div>
    );
  }
}
