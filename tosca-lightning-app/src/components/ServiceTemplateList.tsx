import React, { Component } from 'react';
import { ServiceTemplate } from '../models/ServiceTemplate';
import {
  Avatar, Container, Divider, IconButton, Link, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
  Typography
} from '@material-ui/core';
import GrainIcon from '@material-ui/icons/Grain';
import LaunchIcon from '@material-ui/icons/Launch';
import Section from './Section';

interface ComponentProps {
  serviceTemplates: ServiceTemplate[];
}

type Props = ComponentProps;

class ServiceTemplateList extends Component<Props> {

  public render() {
    const { serviceTemplates } = this.props;
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
          {elements.length > 0 ? elements :
            <Container><Typography>No TOSCA Light compliant models available.</Typography></Container>}
        </List>
      </Section>
    );
  }
}

export default ServiceTemplateList;
