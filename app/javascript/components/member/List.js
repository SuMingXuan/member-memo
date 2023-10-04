import React from 'react';
import Dark from './themes/dark'
import Primary from './themes/primary'
import Red from './themes/red'
import Blue from './themes/blue'
import { Button, Empty } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

export default class List extends React.Component {
  state = {
    members: this.props.members,
    totalPages: this.props.total_pages,
    currentPage: this.props.current_page
  }

  pageHandle = (e) => {
    const { members, currentPage } = this.state
    const nextPage = currentPage + 1
    fetch(`/members?page=${nextPage}.json`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({ currentPage: nextPage, members: members.concat(res.members) })
        } else {
          App.message.error(res.message);
        }
      });

  }

  render() {
    const { members, totalPages, currentPage } = this.state
    const { action } = this.props
    return (
      <>
        {
          members.length > 0 ?
            <div className='flex flex-wrap justify-center lg:justify-between lg:p-[20px] w-full gap-[20px] lg:gap-[35px]'>
              {members.map(member => {
                if (member.theme === 'dark') {
                  return <Dark member={member} key={member.uuid} />;
                } else if (member.theme === 'red') {
                  return <Red member={member} key={member.uuid} />;
                } else if (member.theme === 'blue') {
                  return <Blue member={member} key={member.uuid} />;
                } else {
                  return <Primary member={member} key={member.uuid} />;
                }
              })}
            </div>
            :
            <Empty description={
              <>
                <p className='opacity-40 mb-[20px]'>空空如也</p>
                {
                  action == 'index' && <p className='flex lg:hidden items-center justify-center text-primary-599'>点击右下侧 <PlusCircleTwoTone className='mx-[4px]' /> 记录你的第一张会员卡</p>
                }
              </>
            } className='text-gray mt-[20%]' />
        }
        {
          currentPage < totalPages && <div className='flex justify-center mt-[20px]'>
            <Button type='link' className={`text-primary-599 ${MobilePlatform ? 'text-[16px]' : 'text-[18px]'}`} onClick={(e) => { this.pageHandle(e) }}>下一页</Button>
          </div>
        }
      </>
    );
  }
}
