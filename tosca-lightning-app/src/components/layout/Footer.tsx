import React, { Component } from 'react';
import { Button, createStyles, Grid, Hidden, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  '@global': {
    html: {
      position: 'relative',
      minHeight: '100%',
    },
    body: {
      marginBottom: '100px', // Margin bottom by footer height
    },
  },
  footer: {
    borderTop: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '55px', // Set the fixed height of the footer here
  },
  container: {
    padding: '5px',
    paddingTop: '8px',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
});

type Props = WithStyles<typeof styles>;

class Footer extends Component<Props> {

  public render() {
    const { classes } = this.props;
    return (
      <Hidden xsDown>
        <div className={classes.footer}>
          <Grid container className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" align="left" color="textSecondary" component="p"
                          style={{ lineHeight: '40px' }}>
                Build with <span role="img" aria-label="love">❤️</span> by the University of Stuttgart
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" component="div">
                <Button href="https://github.com/UST-EDMM/tosca-lightning" target="_blank">GitHub</Button>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Hidden>
    );
  }
}

export default withStyles(styles)(Footer);
