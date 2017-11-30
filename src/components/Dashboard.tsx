import * as React from 'react';
import {
  Button,
  Header,
  Form,
  Input,
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
  value : string;
}
export default class Dashboard extends React.Component < DashboardProps,
DashboardState > {
  constructor (props : any) {
    super(props);

    this.state = {
      bio: 'Edit',
      value: 'undergrad',
    };

    this.editBio = this.editBio.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e : any, data : any) {
    this.setState(
      Object.assign(
        {},
        this.state,
        data,
      ),
    );
  }

  editTags (e: any, data: any) {
    console.log(e);
    console.log(data);
  }

  editBio (data: any) {
    this.setState(
      Object.assign(
        {},
        this.state,
        data,
      ),
    );
  }

  render () {
    const { bio, value } = this.state;

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
