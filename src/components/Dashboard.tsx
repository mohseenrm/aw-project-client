import * as React from 'react';
import {
  Button,
  Header,
  Form,
  Input,
  Message,
  Radio,
  Segment,
  Select,
} from 'semantic-ui-react';
import {
  RIEInput,
  RIETags,
} from 'riek';
interface DashboardProps {}
interface DashboardState {
  bio: string;
  showMessage: boolean;
  value : string;
}
export default class Dashboard extends React.Component < DashboardProps,
DashboardState > {
  constructor (props : any) {
    super(props);

    this.state = {
      bio: 'Edit',
      showMessage: false,
      value: 'undergrad',
    };

    this.editBio = this.editBio.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e : any, data : any) {
    console.log('called');
    /* tslint:disable */
    let newState = data;
    newState.showMessage = true;

    this.setState(
      Object.assign(
        {},
        this.state,
        newState,
      ),
    );

    return setTimeout(() => {
      newState.showMessage = false;
      return this.setState(
        Object.assign(
          {},
          this.state,
          newState,
        ),
      );
    }, 5000);
    /* tslint:disable */
  }

  editTags (e: any, data: any) {
    console.log(e);
    console.log(data);
  }

  editBio (data: any) {
    /* tslint:disable */
    let newState = data;
    newState.showMessage = true;

    this.setState(
      Object.assign(
        {},
        this.state,
        newState,
      ),
    );

    return setTimeout(() => {
      newState.showMessage = false;
      return this.setState(
        Object.assign(
          {},
          this.state,
          newState,
        ),
      );
    }, 5000);
    /* tslint:disable */
  }

  render () {
    const { bio, showMessage, value } = this.state;
    if (showMessage) {
      return (
        <div className="dashboard-wrapper">
          <Form>
          <Segment>
              <Header
                as="h2"
                icon="user"
                content="Bio"
              />
              <RIEInput
                value={bio}
                change={this.editBio}
                propName="bio"
              />
            </Segment>
            <Segment>
              <Header
                as="h2"
                icon="tags"
                content="Tags"
              />
              <RIETags
                className="dashboard-wrapper--tags"
                value={new Set([ 'Java', 'OOPS' ])}
                change={this.editTags}
                maxTags={10}
                minTags={2}
                propName="tags"
                placeholder="New"
              />
            </Segment>
            <Segment>
              <Header
                as="h2"
                icon="university"
                content="Education"
              />
              <Form.Field>
                <Radio
                  label="Undergraduate"
                  name="radioGroup"
                  value="undergrad"
                  checked={value === 'undergrad'}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Graduate"
                  name="radioGroup"
                  value="grad"
                  checked={value === 'grad'}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Phd"
                  name="radioGroup"
                  value="phd"
                  checked={value === 'phd'}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Segment>
          </Form>
          <Message color="green">
            <Message.Header>You are Profile has been updated!</Message.Header>
            <p>For feedback on our recommendation system please visit this <b><a href="https://goo.gl/forms/RRF68sxDK1UhbtPI2" target="_black">Link</a></b></p>
          </Message>
        </div>
      );
    } else {
      return (
        <div className="dashboard-wrapper">
          <Form>
          <Segment>
              <Header
                as="h2"
                icon="user"
                content="Bio"
              />
              <RIEInput
                value={bio}
                change={this.editBio}
                propName="bio"
              />
            </Segment>
            <Segment>
              <Header
                as="h2"
                icon="tags"
                content="Tags"
              />
              <RIETags
                className="dashboard-wrapper--tags"
                value={new Set([ 'Java', 'OOPS' ])}
                change={this.editTags}
                maxTags={10}
                minTags={2}
                propName="tags"
                placeholder="New"
              />
            </Segment>
            <Segment>
              <Header
                as="h2"
                icon="university"
                content="Education"
              />
              <Form.Field>
                <Radio
                  label="Undergraduate"
                  name="radioGroup"
                  value="undergrad"
                  checked={value === 'undergrad'}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Graduate"
                  name="radioGroup"
                  value="grad"
                  checked={value === 'grad'}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Phd"
                  name="radioGroup"
                  value="phd"
                  checked={value === 'phd'}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Segment>
          </Form>
        </div>
      );
    }
    
  }
}
