import React, { Component } from 'react';
import { AppBar, Button, Container, Theme, Toolbar, Typography, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
  button: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

type Props = WithStyles<typeof styles>;

class DashboardPage extends Component<Props> {

  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              TOSCA Lightning
            </Typography>
            <Button color="inherit" className={classes.button}>Login</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth='lg'>
          Test
        </Container>
      </React.Fragment>);
  }
}

export default withStyles(styles)(DashboardPage);
