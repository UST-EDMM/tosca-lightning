import React from 'react';
import { Fab, Theme, useScrollTrigger, WithStyles, withStyles, Zoom } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const styles = (theme: Theme) => ({
  root: {
    position: 'fixed' as 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

interface ComponentProps {
  selector: string;
}

type Props = ComponentProps & WithStyles<typeof styles>;

function ScrollToTop(props: Props) {

  const { classes, selector } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(selector);
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div className={classes.root} onClick={handleClick}>
        <Fab color="secondary" size="small">
          <KeyboardArrowUpIcon/>
        </Fab>
      </div>
    </Zoom>
  );
}

export default withStyles(styles)(ScrollToTop);
