import React, { useRef, useState } from 'react';
import { TwoDotIcon, ThreeDotIcon } from '../../utils/custom_icon'
import { Popover } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
const WechatFloatWindow = () => {
  const content = () => <>
    <div className='flex items-center'> 点击右上角<span className='font-bold mx-[2px] mr-[8px]'>菜单</span> <ThreeDotIcon className="text-[30px]" /> </div>
    <div className='flex items-center'> 在点击左下角<span className='font-bold mx-[2px]'>浮窗</span> <TwoDotIcon className="text-[30px]" /> </div>
    <div className='flex items-center text-sm text-gray-a7a'>加入浮窗后下次即可直接在微信左上角的<span className='font-bold mx-[2px]'>浮窗</span>中打开</div>
  </>
  return (
    <>
      <Popover content={content} placement="bottomRight">
        <StarTwoTone className='ml-[10px] mr-[-10px]' />
      </Popover>
    </>
  );
};
export default WechatFloatWindow;