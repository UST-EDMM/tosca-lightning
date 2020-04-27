import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MessageContent from './MessageContent';
import { Message } from '../models/Message';
import { clearMessageAction } from '../store/actions/page';

interface StoreProps {
  message?: Message,
  clearMessage(): void,
}

type Props = StoreProps;

class MessageContainer extends Component<Props> {

  public render() {
    const { message } = this.props;
    return (
      <MessageContent open={message !== null} message={message} onClose={this.handleClose}/>
    );
  }

  private handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.clearMessage();
  };
}

const mapStateToProps = (state: any) => ({
  message: state.page.message,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearMessage: clearMessageAction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
