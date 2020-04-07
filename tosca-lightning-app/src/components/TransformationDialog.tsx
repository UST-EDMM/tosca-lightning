import React, { Component } from 'react';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel,
  FormLabel, Radio, RadioGroup, Theme, WithStyles, withStyles
} from '@material-ui/core';
import { ServiceTemplate } from '../models/ServiceTemplate';
import { Plugin } from '../models/Plugin';
import { backendService } from '../service/backend';
import { TransformResponse } from '../models/TransformResponse';

const styles = (theme: Theme) => ({
  group: {
    marginTop: theme.spacing(2),
  },
  item: {
    width: '33%',
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

interface ComponentProps {
  open: boolean;
  serviceTemplate: ServiceTemplate;
  plugins: Plugin[];
  onClose(): void;
}

interface State {
  isLoading: boolean;
  transformationResponse?: TransformResponse;
  value: string;
}

type Props = ComponentProps & WithStyles<typeof styles>;

class TransformationDialog extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      value: '',
    }
  }

  public render() {
    const { plugins, classes, open, onClose } = this.props;
    const { isLoading, value, transformationResponse } = this.state;
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
                  disabled={isLoading || value === ''} onClick={this.handleTransformation}>
            Transform
            {isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
          </Button>
          {transformationResponse &&
          <Button color="secondary" href={transformationResponse?.downloadUrl} target="_blank">
            Download
          </Button>}
        </DialogActions>
      </Dialog>
    );
  }

  private handleTransformation = async () => {
    const { serviceTemplate } = this.props;
    const { value } = this.state;
    this.setState({ isLoading: true });
    const response = await backendService.transformServiceTemplate(value, serviceTemplate);
    if (response && response.downloadUrl) {
      this.setState({ transformationResponse: response })
    }
    this.setState({ isLoading: false });
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    this.setState({ value, transformationResponse: undefined });
  };
}

export default withStyles(styles)(TransformationDialog);
