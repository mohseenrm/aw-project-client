import axios from 'axios';
import * as React from 'react';

import {
	Button,
	Card,
	Rating,
} from 'semantic-ui-react';
import { CardProps } from 'semantic-ui-react/dist/commonjs/views/Card/Card';

interface CardsProps {
  data: [any];
  token: string;
  openCard: Function;
}

interface CardsState {
  data?: [any];
}

export default class Cards extends React.Component < CardsProps, CardsState > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (props: CardProps) {
    this.setState(
			Object.assign(
				{},
				this.state,
				{ data: props.data },
			),
		);
  }

  handleClick (index: number, self: any, e: any) {
    const className = e.target.className || '';
    if (className.includes('content')) {
			// relevant to card clicks
      this.props.openCard(index);
    }
  }

  upVoteHandler (index: number, self: any, e: any) {
    const className = e.target.className || '';
    if (className.includes('up icon') || className.includes('icon button')) {
			/* tslint:disable */
			let newState = self.state;
			newState.data[index].upvotes = '' + (parseInt(newState.data[index].upvotes) + 1);
			newState.data[index].last_modified = '' + new Date();

			self.setState(
				Object.assign(
					{},
					self.state,
					newState,
				),
			);

			return axios({
				method: 'post',
				url: 'http://ec2-34-214-219-216.us-west-2.compute.amazonaws.com/cardservice/upvote/',
				responseType: 'json',
				data: { id: newState.data[index].id },
				headers: { 'X-Authorization-Token': this.props.token },
			}).catch(error => console.warn(error));
		}
		/* tslint:enable */
  }

  downVoteHandler (index: number, self: any, e: any) {
    const className = e.target.className || '';
    if (className.includes('down icon') || className.includes('icon button')) {
			/* tslint:disable */
			const newState = self.state;
			newState.data[index].downvotes = '' + (parseInt(newState.data[index].downvotes) + 1);
			self.setState(
				Object.assign(
					{},
					self.state,
					newState,
				),
			);

			return axios({
				method: 'post',
				url: 'http://ec2-34-214-219-216.us-west-2.compute.amazonaws.com/cardservice/downvote/',
				responseType: 'json',
				data: { id: newState.data[index].id },
				headers: { 'X-Authorization-Token': this.props.token },
			}).catch(error => console.warn(error));
		}
		/* tslint:enable */
  }

  toggleFavorite (index: number, self: any, e: any, data: any) {
    const favorite = data.rating === 1;
    const newState = self.state;
    newState.data[index].favorite = favorite;

    self.setState(
			Object.assign(
				{},
				self.state,
				newState,
			),
		);

    return axios({
      method: 'post',
      url: 'http://ec2-34-214-219-216.us-west-2.compute.amazonaws.com/cardservice/favorite/',
      responseType: 'json',
      data: { id: newState.data[index].id },
      headers: { 'X-Authorization-Token': this.props.token },
    }).catch(error => console.warn(error));
  }

  render () {
		/* tslint:disable */
		const self = this;
    if (this.state.data) {
			return(
				<Card.Group
					basic={true}
					size="small"
					itemsPerRow="three"
					stackable={true}
				>
					{
						this.state.data.map((cardData, index) =>
							<Card
								fluid={true}
								href="#"
								key={index}
								raised={true}
								onClick={this.handleClick.bind(this, index, self)}
							>
								<Card.Content>
									<Card.Header>
										{cardData.title || `${cardData.content.slice(0, 23)}..`}
										<Rating
											icon="heart"
											defaultRating={cardData.favorite ? 1 : 0}
											maxRating={1}
											onRate={this.toggleFavorite.bind(this, index, self)}
										/>
									</Card.Header>
									<Card.Meta>
										{cardData.last_modified}
									</Card.Meta>
									<Card.Description>
										{cardData.content.slice(0, 140)}...
									</Card.Description>
								</Card.Content>
								<Card.Content extra={true}>
									<div className="ui three buttons">
										<Button
											size="tiny"
											color="blue"
											icon="thumbs up"
											label={{ basic: true, color: 'blue', pointing: 'left', content: cardData.upvotes }}
											onClick={this.upVoteHandler.bind(this, index, self)}
										/>
										<Button
											size="tiny"
											color="orange"
											icon="thumbs down"
											label={{ basic: true, color: 'orange', pointing: 'left', content: cardData.downvotes }}
											onClick={this.downVoteHandler.bind(this, index, self)}
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
				<Card.Group
					basic={true}
					size="small"
					itemsPerRow="three"
					stackable={true}
				>
					<Card
						fluid={true}
						href="#"
						raised={true}
					>
						<Card.Content>
							<Card.Header>
								Card Title
								<Rating
									icon="heart"
									defaultRating={1}
									maxRating={1}
								/>
							</Card.Header>
							<Card.Meta>
								2017-11-23 03:42:24
							</Card.Meta>
							<Card.Description>
								Lorem Ipsum
							</Card.Description>
						</Card.Content>
						<Card.Content extra={true}>
							<div className="ui three buttons">
								<Button
									size="tiny"
									color="blue"
									icon="thumbs up"
									label={{ basic: true, color: 'blue', pointing: 'left', content: '2' }}
								/>
								<Button
									size="tiny"
									color="orange"
									icon="thumbs down"
									label={{ basic: true, color: 'orange', pointing: 'left', content: '1' }}
								/>
							</div>
						</Card.Content>
					</Card>
				</Card.Group>
			);
		}
	}
	/* tslint:enable */
}
