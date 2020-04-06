import React, { Component } from 'react';
import { ServiceTemplate } from '../models/ServiceTemplate';
import {
  Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Theme, withStyles, WithStyles
} from '@material-ui/core';
import GrainIcon from '@material-ui/icons/Grain';
import Section from './Section';

const styles = (theme: Theme) => ({});

interface ComponentProps {
  serviceTemplates: ServiceTemplate[];
}

type Props = ComponentProps & WithStyles<typeof styles>;

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
        </ListItem>
        {index < serviceTemplates.length - 1 &&
        <Divider/>
        }
      </React.Fragment>
    ));
    return (
      <Section title="Models">
        <List>
          {elements.length > 0 ? elements : "No TOSCA Light compliant models available."}
        </List>
      </Section>
    );
  }
}

export default withStyles(styles)(ServiceTemplateList);
