import React, { Component } from 'react';
import { ServiceTemplate } from '../models/ServiceTemplate';
import {
  Avatar, Container, Divider, IconButton, LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemSecondaryAction,
  ListItemText, Tooltip, Typography
} from '@material-ui/core';
import GrainIcon from '@material-ui/icons/Grain';
import LaunchIcon from '@material-ui/icons/Launch';
import InputIcon from '@material-ui/icons/Input';
import Section from './Section';
import TransformationDialog from './TransformationDialog';
import { Plugin } from '../models/Plugin';

interface ComponentProps {
  serviceTemplates: ServiceTemplate[];
  plugins: Plugin[];
  isLoading: boolean;
}

interface State {
  dialogOpen: { [id: string]: boolean };
}

type Props = ComponentProps;

class ServiceTemplateList extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dialogOpen: {},
    };
  }

  public render() {
    const { serviceTemplates, plugins, isLoading } = this.props;
    const { dialogOpen } = this.state;
    const elements = serviceTemplates.map((st: ServiceTemplate, index: number) => (
      <React.Fragment key={st.id}>
        <TransformationDialog serviceTemplate={st} plugins={plugins} open={dialogOpen[st.id] ?? false}
                              onClose={() => this.handleDialogClose(st)}/>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={st.logoUrl} variant="rounded">
              <GrainIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={st.id} secondary={st.qName}/>
          <ListItemSecondaryAction>
            <Tooltip title="Edit TOSCA Light model">
              <IconButton component={Link} href={st.topologyModelerUrl} target="_blank">
                <LaunchIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Transform TOSCA Light model">
              <IconButton onClick={() => this.handleDialogOpen(st)}>
                <InputIcon/>
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        {index < serviceTemplates.length - 1 &&
        <Divider/>}
      </React.Fragment>
    ));
    return (
      <Section title="Models">
        {isLoading && <LinearProgress color="secondary"/>}
        <List>
          {elements.length > 0 ? elements :
            <Container><Typography>No TOSCA Light compliant models available.</Typography></Container>}
        </List>
      </Section>
    );
  }

  private handleDialogOpen = (st: ServiceTemplate) => {
    const dialogOpen = { ...this.state.dialogOpen, [st.id]: true };
    this.setState({ dialogOpen });
  };

  private handleDialogClose = (st: ServiceTemplate) => {
    const dialogOpen = { ...this.state.dialogOpen, [st.id]: false };
    this.setState({ dialogOpen });
  };
}

export default ServiceTemplateList;
