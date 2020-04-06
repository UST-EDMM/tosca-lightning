import React, { Component } from 'react';
import { AppBar, IconButton, Link, Theme, Toolbar, Typography, withStyles, WithStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Config } from '../models/Config';

const styles = (theme: Theme) => ({
  button: {
    marginRight: theme.spacing(2),
  },
  title: {
    paddingTop: theme.spacing(1),
    flexGrow: 1,
  },
});

interface ComponentProps {
  config?: Config;
}

type Props = ComponentProps & WithStyles<typeof styles>;

class MainNavigation extends Component<Props> {

  public render() {
    const { classes, config } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src="/logo.png" alt="TOSCA Lightning"/>
          </Typography>
          {config && <IconButton color="inherit" className={classes.button}
                                 component={Link} href={config.wineryUrl} target="_blank">
            <AddIcon/>
          </IconButton>}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(MainNavigation);
