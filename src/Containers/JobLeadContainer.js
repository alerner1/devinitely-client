import React from 'react';

class JobLeadContainer extends React.Component {
  render() {
    return(<p>{this.props.match.params.jobLeadId}</p>)
  }
}

export default JobLeadContainer;