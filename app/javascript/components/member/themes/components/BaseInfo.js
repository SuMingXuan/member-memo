import React from 'react';

export default class BaseInfo extends React.Component {
  render() {
    const { label, value } = this.props
    return (
      <div className='flex flex-col'>
        <div className="font-[100]">
          {label}
        </div>

        <div className="font-[700] text-[34px] drop-shadow-md">
          {value}
        </div>
      </div>
    )
  }
}