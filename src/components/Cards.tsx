import axios from 'axios';
import * as React from 'react';

import {
	Button,
	Card,
} from 'semantic-ui-react';

interface CardsProps {
  data: [any];
}

interface CardsState {
}

export default class Cards extends React.Component < CardsProps, CardsState > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  handleClick (index: number, e: any) {
    console.log(index);
  }

  render () {
    if (this.props.data) {
      return(
				<Card.Group
					basic={true}
					size="small"
					itemsPerRow="three"
					stackable={true}
				>
					{
						this.props.data.map((cardData, index) =>
							<Card
								fluid={true}
								href="#"
								key={index}
								raised={true}
								onClick={this.handleClick.bind(this, index)}
							>
								<Card.Content>
									<Card.Header>
										{cardData.title}
									</Card.Header>
									<Card.Meta>
										{cardData.last_modified}
									</Card.Meta>
									<Card.Description>
										{cardData.content}
									</Card.Description>
								</Card.Content>
								<Card.Content extra={true}>
									<div className="ui three buttons">
										<Button
											size="tiny"
											color="blue"
											icon="thumbs up"
											label={{ basic: true, color: 'blue', pointing: 'left', content: cardData.upvotes }}
										/>
										<Button
											size="tiny"
											color="orange"
											icon="thumbs down"
											label={{ basic: true, color: 'orange', pointing: 'left', content: cardData.downvotes }}
										/>
										<Button
											size="tiny"
											color="red"
											icon="heart"
											label={{ basic: true, color: 'red', pointing: 'left', content: cardData.upvotes }}
										/>
									</div>
								</Card.Content>
							</Card>,
						)
					}
				</Card.Group>
      );
    } else {
      return(
				<Card
					fluid={true}
					href="#"
					raised={true}
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
								label={{ basic: true, color: 'blue', pointing: 'left', content: '1' }}
							/>
							<Button
								size="tiny"
								color="orange"
								icon="thumbs down"
								label={{ basic: true, color: 'orange', pointing: 'left', content: '1' }}
							/>
							<Button
								size="tiny"
								color="red"
								icon="heart"
								label={{ basic: true, color: 'red', pointing: 'left', content: '1' }}
							/>
						</div>
					</Card.Content>
				</Card>
      );
    }
  }
}
