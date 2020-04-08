import React, { Component } from 'react';
import { createStyles, IconButton, Snackbar, SnackbarContent, Theme, withStyles, WithStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { Message } from '../models/Message';

const styles: any = (theme: Theme) => createStyles({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: theme.palette.info.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  close: {
    padding: theme.spacing(2),
  },
});

interface ComponentProps {
  open: boolean;
  message?: Message;
  onClose(): void;
}

type Props = ComponentProps & WithStyles<typeof styles>

class MessageContent extends Component<Props> {

  private variantIcon: any = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  public render() {
    const { classes, open, message, onClose, ...other } = this.props;
    if (!message) {
      return null;
    }
    const Icon = this.variantIcon[message.variant];
    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={onClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}>
        <SnackbarContent
          className={classes[message.variant]}
          message={
            <span className={classes.message}>
                            <Icon className={`${classes.icon} ${classes.iconVariant}`}/>
              {message.text}
                        </span>}
          action={[
            <IconButton key="close" color="inherit" className={classes.close} onClick={onClose}>
              <CloseIcon className={classes.icon}/>
            </IconButton>,
          ]}
          {...other}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(MessageContent);
