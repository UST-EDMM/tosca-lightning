import React, { Component } from 'react';
import { Paper, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  gutterTop: {
    marginTop: theme.spacing(3),
  },
  gutterBottom: {
    marginBottom: theme.spacing(3),
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    textTransform: 'uppercase' as const,
  },
});

interface ComponentProps {
  title?: string;
  gutterTop?: boolean;
  gutterBottom?: boolean;
}

type Props = ComponentProps & WithStyles<typeof styles>;

class Section extends Component<Props> {

  public static defaultProps: ComponentProps = {
    gutterTop: true,
  };

  public render() {
    const { children, title, gutterTop, gutterBottom, classes } = this.props;

    const rootClassNames = [classes.root];
    if (gutterTop) {
      rootClassNames.push(classes.gutterTop);
    }
    if (gutterBottom) {
      rootClassNames.push(classes.gutterBottom);
    }

    return (
      <Paper className={rootClassNames.join(' ')}>
        {title && <Typography className={classes.title}>{title}</Typography>}
        <div>
          {children}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Section);
