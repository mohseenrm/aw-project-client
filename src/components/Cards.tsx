import * as React from 'react';
import {
  Button,
  Card,
} from 'semantic-ui-react';

interface CardProps {
  message: string;
}

export default class Cards extends React.Component < CardProps, any > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render () {
    return(
			<div className="main-wrapper--cards">
				<Card.Group basic={true} size="small" itemsPerRow="three">
          <Card fluid={true}>
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
			</div>
    );
  }
}
