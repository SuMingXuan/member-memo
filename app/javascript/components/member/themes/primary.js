import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import * as ThemeUtil from './theme_util'

const BaseInfo = ({ label, value }) => (
  <div className='flex flex-col'>
    <div className="font-[100]">
      {label}
    </div>
    <div className="font-[700] text-[34px]">
      {value}
    </div>
  </div>
)

export default class BaseCard extends React.Component {
  render() {
    const { member } = this.props
    return (
      <>
        <div className={`member-card bg-gradient-primary`}>
          <div className="setting-icon">
            <SettingOutlined className='cursor-pointer' />
          </div>
          <div className="store-name">
            {member.store_name}
          </div>
          <div className='flex justify-between'>
            <span className={`card-number-primary`}>{ThemeUtil.formatCardNumber(member.card_number)}</span>
            <span className='level font-[700] border-[2px]'>{member.level}</span>
          </div>
          <div className='flex justify-between'>
            {member.balance > 0 && <BaseInfo value={member.balance} label='余额' />}
            {member.points > 0 && <BaseInfo value={member.points} label='积分' />}
            {member.coupons_count > 0 && <BaseInfo value={member.coupons_count} label='优惠券' />}
          </div>
          <div className='absolute bottom-[10px] left-[20px]'>
            <Badge color={ThemeUtil.getColor(member.expires_at)} text={<span className='text-[12px] text-[#ffffff80]'>{ThemeUtil.formatExpiresAt(member.expires_at)}</span>} />
          </div>
        </div>
      </>
    );
  }
}
