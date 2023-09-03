
import React from 'react';
import { Badge, Divider } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { TimeFormat } from '../../utils/custom_format'

export default class Charge extends React.Component {

  render() {
    const groups = this.props.groups

    const typeMap = {
      'ConsumptionMemberOrder': {
        name: '消费',
        operation: '-',
        color: '#FF4857',
      },
      'RechargeMemberOrder': {
        name: '充值',
        operation: '',
        color: '#47C93A',
      },
      'ForceExpenseMemberOrder': {
        name: '冲正',
        operation: '-',
        color: '#a7a7a7',
      },
      'ForceIncomeMemberOrder': {
        name: '冲正',
        operation: '',
        color: '#a7a7a7',
      },
    }

    return <>
      {
        Object.keys(groups).map((createdDate, dateIndex) => (
          <>
            <div className='flex justify-start items-start'>
              <div className='flex justify-center items-center relative'>
                <span className='w-[100px] absolute lg:static left-[25px] text-base text-gray-777/50'>{dayjs(createdDate).format(TimeFormat.default)}</span>
                <ClockCircleOutlined className='text-primary-599' />
              </div>
              <div className='flex flex-col w-[88%] lg:w-[400px] my-[20px] px-[25px] shadow translate-x-[20px] rounded-[6px]'>

                {
                  groups[createdDate].map((order, orderIndex) => (
                    <>
                      <div className={` relative py-[20px] before:w-0 before:border-l-[2px] before:border-[${typeMap[order.type].color}] before:absolute before:top-[-6px] before:lg:top-[-2px] before:left-[-54px] ${orderIndex + 1 < groups[createdDate].length ? 'before:h-full' : 'before:h-[calc(100%+28px)]'} ${orderIndex + 1 < groups[createdDate].length && 'border-b'}`}>
                        <div className={`mb-[5px] flex items-center justify-between`}>
                          <div className={`text-xl text-[${typeMap[order.type].color}]`}>
                            {typeMap[order.type].name}
                          </div>
                          <div className='flex justify-end opacity-80 text-sm'>
                            {dayjs(order.created_at).format(TimeFormat.hours)}
                          </div>

                        </div>
                        <div className={`text-[${typeMap[order.type].color}] flex justify-between`}>

                          {
                            order.amount > 0 && <div>
                              <div>金额&nbsp;&nbsp;&nbsp;{typeMap[order.type].operation}{order.amount}</div>
                              {
                                order.savings_amount > 0 && <div className='text-sm text-gray-777'>
                                  节省&nbsp;&nbsp;&nbsp;{order.savings_amount}
                                </div>
                              }
                            </div>
                          }
                          {
                            order.points_amount > 0 && <div>积分&nbsp;&nbsp;&nbsp;{typeMap[order.type].operation}{order.points_amount}</div>
                          }
                        </div>

                      </div>
                    </>
                  ))
                }
              </div>
            </div>
          </>
        ))
      }

    </>
  }
}