import React from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import Recharge from './Recharge';
import Consumption from './Consumption';

export default class Charge extends React.Component {
  state = {
    configMode: this.props.configMode,
    openCharge: false,
    openConsumption: false,
  }

  submitRecharge = (values) => {
    const { member } = this.props
    fetch(`/members/${member.uuid}/recharge`, {
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
          visit('/');
        } else {
          App.message.error(res.message);
        }
      });
  }

  submitConsumption = (values) => {
    const { member } = this.props
    fetch(`/members/${member.uuid}/consumption`, {
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
          visit('/');
        } else {
          App.message.error(res.message);
        }
      });
  }

  closeRechargeModal = () => {
    this.setState({ openCharge: false })
  }

  closeConsumptionModal = () => {
    this.setState({ openConsumption: false })
  }


  openChargeModal = (e) => {
    e.stopPropagation()
    this.setState({ openCharge: true })
  }
  openConsumptionModal = (e) => {
    e.stopPropagation()
    this.setState({ openConsumption: true })
  }
  render() {
    const Mask = () => <>
      <div className="absolute flex justify-around items-center top-0 left-0 translate-x-0 translate-y-0 z-[20] w-full h-full bg-[#3d3d3dd3]">
        <Button ghost danger size='large' className='w-[120px] border-[2px] text-white' onClick={(e) => { this.openConsumptionModal(e) }}>消费</Button>
        <Button ghost type='primary' size='large' className='text-primary-599 border-primary-599 w-[120px] border-[2px] text-white' onClick={(e) => { this.openChargeModal(e) }}>充值</Button>
      </div>
    </>
    const { member, configMode } = this.props
    const { openCharge, openConsumption } = this.state
    return <>
      <div className="setting-icon z-[40]">
        {
          configMode ? <CloseCircleOutlined onClick={() => { this.props.toggleConfigMode() }} className='cursor-pointer' /> :
            <a className='cursor-pointer' onClick={(e) => { e.stopPropagation(); visit(`/members/${member.uuid}`) }}>
              <SettingOutlined />
            </a>
        }
      </div>

      {
        configMode && <Mask />
      }
      <Recharge
        member={member}
        openCharge={openCharge}
        onSubmit={(values) => this.submitRecharge(values)}
        closeRechargeModal={() => this.closeRechargeModal()} />
      <Consumption
        member={member}
        openConsumption={openConsumption}
        onSubmit={(values) => this.submitConsumption(values)}
        closeConsumptionModal={() => this.closeConsumptionModal()} />
    </>
  }
}