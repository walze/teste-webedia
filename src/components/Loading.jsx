import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Loading extends React.Component {


  render() {
    return (
      <div className="loading" hidden={this.props.hidden}>
        <FontAwesomeIcon icon='sync-alt' />
      </div>
    )
  }

}