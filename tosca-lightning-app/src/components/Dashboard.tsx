import React, { Component } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Theme, WithStyles, withStyles } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import Section from './Section';
import { ServiceTemplate } from '../models/ServiceTemplate';

const styles = (theme: Theme) => ({});

interface ComponentProps {
  serviceTemplates: ServiceTemplate[];
}

type Props = ComponentProps & WithStyles<typeof styles>;

class Dashboard extends Component<Props> {

  public render() {
    const { serviceTemplates } = this.props;
    const elements = serviceTemplates.map((st: ServiceTemplate, index: number) => (
      <ListItem key={st.id}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={st.id} secondary={st.qName}/>
      </ListItem>
    ));

    return (
      <Section title="TOSCA Light Models">
        <List dense={true}>
          {elements.length > 0
            ? elements
            : "Empty list"}
        </List>
      </Section>
    );
  }
}

export default withStyles(styles)(Dashboard);
