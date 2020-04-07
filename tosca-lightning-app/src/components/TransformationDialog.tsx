import React, { Component } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio,
  RadioGroup, Theme, WithStyles, withStyles
} from '@material-ui/core';
import { ServiceTemplate } from '../models/ServiceTemplate';
import { Plugin } from '../models/Plugin';

const styles = (theme: Theme) => ({
  group: {
    marginTop: theme.spacing(2),
  },
  item: {
    width: '33%',
  }
});

interface ComponentProps {
  open: boolean;
  serviceTemplate: ServiceTemplate;
  plugins: Plugin[];
  onClose(): void;
  onTransformation(target: String, serviceTemplate: ServiceTemplate): void;
}

interface State {
  value: string;
}

type Props = ComponentProps & WithStyles<typeof styles>;

class TransformationDialog extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  public render() {
    const { serviceTemplate, plugins, classes, open, onClose, onTransformation } = this.props;
    const { value } = this.state;
    const elements = plugins.map((plugin: Plugin, index: number) => (
      <React.Fragment key={index}>
        <Box className={classes.item}>
          <FormControlLabel value={plugin.id} control={<Radio/>} label={plugin.name}/>
        </Box>
      </React.Fragment>
    ));

    return (
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={onClose} disableBackdropClick>
        <DialogTitle>Transform TOSCA Light Model</DialogTitle>
        <DialogContent dividers>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Target Deployment Technology</FormLabel>
            <RadioGroup name="target" value={value} onChange={this.handleChange} className={classes.group}>
              <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
                {elements}
              </Box>
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained"
                  onClick={onClose}>
            Close
          </Button>
          <Button color="secondary" variant="contained"
                  disabled={value === ''} onClick={() => onTransformation(value, serviceTemplate)}>
            Transform
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    this.setState({ value });
  };
}

export default withStyles(styles)(TransformationDialog);
