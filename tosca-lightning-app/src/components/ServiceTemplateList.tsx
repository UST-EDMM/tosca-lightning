import React, { Component } from 'react';
import { ServiceTemplate } from '../models/ServiceTemplate';
import {
  Avatar, Divider, IconButton, Link, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Theme,
  Typography, withStyles, WithStyles
} from '@material-ui/core';
import GrainIcon from '@material-ui/icons/Grain';
import LaunchIcon from '@material-ui/icons/Launch';
import Section from './Section';
import { Config } from '../models/Config';

const styles = (theme: Theme) => ({});

interface ComponentProps {
  config: Config;
  serviceTemplates: ServiceTemplate[];
}

type Props = ComponentProps & WithStyles<typeof styles>;

class ServiceTemplateList extends Component<Props> {

  public render() {
    const { config, serviceTemplates } = this.props;
    const elements = serviceTemplates.map((st: ServiceTemplate, index: number) => (
      <React.Fragment key={st.id}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={st.logoUrl} variant="rounded">
              <GrainIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={st.id} secondary={st.qName}/>
          <ListItemSecondaryAction>
            <IconButton component={Link} href={st.topologyModelerUrl} target="_blank">
              <LaunchIcon/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {index < serviceTemplates.length - 1 &&
        <Divider/>
        }
      </React.Fragment>
    ));
    return (
      <Section title="Models">
        <List>
          {elements.length > 0 ? elements : <Typography>No TOSCA Light compliant models available.</Typography>}
        </List>
      </Section>
    );
  }
}

export default withStyles(styles)(ServiceTemplateList);
