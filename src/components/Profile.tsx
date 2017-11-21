import * as React from 'react';
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  Modal,
} from 'semantic-ui-react';

interface ProfileProps {
  username: string;
  token: string;
}

export default class Profile extends React.Component < ProfileProps, any > {
  constructor (props: any) {
    super(props);
    this.state = { clicked:false };
    this.handleClick = this.handleClick.bind(this);
  }

  // onclick function of card
  handleClick () {
    // this pattern is used to copy keys from previous state and update new ones
    this.setState(
      Object.assign(
        {},
        this.state,
        { clicked: !this.state.clicked },
      ),
    );
  }

  render () {
    return(
			<div className="main-wrapper--cards">
        {/* Card */}
				<Card.Group basic={true} size="small" itemsPerRow="three">
          <Card
            fluid={true}
            href="#"
            onClick={this.handleClick}
          >
            <Card.Content>
              <Card.Header>
                Steve Sanders
              </Card.Header>
              <Card.Meta>
                Friends of Elliot
              </Card.Meta>
              <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra={true}>
              <div className="ui three buttons">
                <Button
                  size="tiny"
                  color="blue"
                  icon="thumbs up"
                  label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
                />
                <Button
                  size="tiny"
                  color="orange"
                  icon="thumbs down"
                  label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
                />
                <Button
                  size="tiny"
                  color="red"
                  icon="heart"
                  label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
                />
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
        {/* Modal */}
        <Modal open={this.state.clicked} >
          <Modal.Header>Profile Picture</Modal.Header>
          <Modal.Content
            image={true}
            scrolling={true}
          >
            <Image
              size="medium"
              src="/assets/images/wireframe/image.png"
              wrapped={true}
            />
            <Modal.Description>
              <Header>Modal Header</Header>
              <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              primary={true}
              onClick={this.handleClick}
            >
              Proceed <Icon name="chevron right" />
            </Button>
          </Modal.Actions>
        </Modal>
			</div>
    );
  }
}
