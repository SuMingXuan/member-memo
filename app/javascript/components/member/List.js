import React from 'react';
import Dark from './themes/dark'
import Primary from './themes/primary'
export default class List extends React.Component {
  render() {
    const { members } = this.props
    return (
      <div className='grid lg:p-[20px] w-full lg:grid-cols-3 gap-[20px] lg:gap-[35px]'>
        {members.map(member => {
          if (member.theme === 'dark') {
            return <Dark member={member} key={member.card_number} />;
          } else {
            return <Primary member={member} key={member.card_number} />;
          }
        })}
      </div>
    );
  }
}
