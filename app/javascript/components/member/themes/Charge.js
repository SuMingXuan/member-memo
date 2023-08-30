import React from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';

export default class Charge extends React.Component {
  state = {
    configMode: this.props.configMode,
    openCharge: false,
    openConsumption: false,
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
    const Mask = ({ member }) => <>
      <div className="absolute flex justify-around items-center top-0 left-0 translate-x-0 translate-y-0 z-[20] w-full h-full bg-[#3d3d3dd3]">
        <Button ghost danger size='large' className='w-[120px] text-white' onClick={(e) => { this.openChargeModal(e) }}>消费</Button>
        <Button ghost type='primary' size='large' className='w-[120px] text-white' onClick={(e) => { this.openConsumptionModal(e) }}>充值</Button>
      </div>
    </>
    const { member, configMode } = this.props
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
        configMode && <Mask member={member} />
      }

    </>
  }
}