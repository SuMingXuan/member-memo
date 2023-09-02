import React from 'react';
import Dark from './themes/dark'
import Primary from './themes/primary'
import { Button } from 'antd';

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
    return (
      <>
        <div className='grid lg:p-[20px] w-full lg:grid-cols-2 xl:grid-cols-3 gap-[20px] lg:gap-[35px]'>
          {members.map(member => {
            if (member.theme === 'dark') {
              return <Dark member={member} key={member.uuid} />;
            } else {
              return <Primary member={member} key={member.uuid} />;
            }
          })}
        </div>
        {
          currentPage < totalPages && <div className='flex justify-center mt-[20px]'>
            <Button type='link' className={`text-primary-599 ${MobilePlatform ? 'text-[16px]' : 'text-[18px]'}`} onClick={(e) => { this.pageHandle(e) }}>下一页</Button>
          </div>
        }
      </>
    );
  }
}
