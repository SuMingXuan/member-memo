import React from 'react';

export default class DiscountOrLevelLabel extends React.Component {
  render() {
    const BaseInfo = ({ label, value }) => (
      <div className='flex flex-col'>
        <div className="font-[100]">
          {label}
        </div>

        <div className="font-[700] text-[34px] drop-shadow-md">
          {value}
        </div>
      </div>
    )

    const DiscountLabel = ({ discount }) => <>

      <div className='discount font-[700] border-[2px] whitespace-nowrap'>
        <span>{discount < 10 ? `${discount} 折` : '无折扣'}</span>
      </div>
    </>

    const LevelLabel = ({ level }) => <>
      <div className='level font-[700] border-[2px] whitespace-nowrap'>{level}</div>
    </>

    const DiscountOrLevelLabel = ({ discount, level }) => <>
      {
        discount < 10 ?
          <DiscountLabel discount={discount} /> :
          level ? <LevelLabel level={level} /> : <DiscountLabel discount={discount} />
      }
    </>
    const { discount, level } = this.props
    return (
      <DiscountOrLevelLabel discount={discount} level={level} />
    )
  }
}