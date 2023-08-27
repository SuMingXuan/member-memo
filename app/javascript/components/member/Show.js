import React from 'react';

import { Button, FloatButton, Modal, Form, Input, DatePicker, InputNumber, Col, Row, Radio } from 'antd';

export default class Create extends React.Component {

  render() {
    const { member } = this.props
    return (
      <>
        {
          member.uuid
        }
      </>
    );
  }
}
