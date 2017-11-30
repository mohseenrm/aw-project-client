import axios from 'axios';
import * as React from 'react';
import {
	Button,
	Feed as SematicFeed,
	Select,
	Icon,
	Input,
} from 'semantic-ui-react';

interface FeedProps {
  token: string;
}

interface FeedState {
  feedData?: any[];
}

export default class Feed extends React.Component < FeedProps, FeedState > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    const { token } = this.props;
    return axios({
      method: 'get',
      url: 'http://ec2-18-221-144-47.us-east-2.compute.amazonaws.com/cardservice/feed/',
      responseType: 'json',
      headers: {
        'X-Authorization-Token': token,
      },
    }).then(response => this.setState(Object.assign(
			{},
			this.state,
			{ feedData: response.data.responseData.result || null },
		)))
    .catch(error => console.warn(error));
  }

  getActionVerb (verb: string) {
    switch (verb) {
      case 'downvote':
        return 'downvoted';
      case 'upvote':
        return 'upvoted';
      default:
        return 'liked';
    }
  }

  getTimeDiff (time: string) {
    const actionTime: any = new Date(time);
    const currentTime: any = new Date();
    const days = Math.ceil(Math.abs(currentTime - actionTime) / (1000 * 3600 * 24));
    return days;
  }

  render () {
    const { feedData } = this.state;
    if (feedData) {
      return(
				<div className="feed-wrapper">
					<SematicFeed>
						{
							feedData.map((data: any) =>
								<SematicFeed.Event>
									<SematicFeed.Content>
										<SematicFeed.Summary>
											<SematicFeed.User>{data.owner}</SematicFeed.User> {this.getActionVerb(data.action)} card <SematicFeed.User>{data.title || `${data.content.slice(0, 20)}...`}</SematicFeed.User>
											<SematicFeed.Date>{this.getTimeDiff(data.last_modified)} Days Ago</SematicFeed.Date>
										</SematicFeed.Summary>
										<SematicFeed.Meta>
											<SematicFeed.Like>
												<Icon name="thumbs up" />
												{data.upvotes} Upvotes
											</SematicFeed.Like>
											<SematicFeed.Like>
												<Icon name="thumbs down" />
												{data.downvotes} Downvotes
											</SematicFeed.Like>
										</SematicFeed.Meta>
									</SematicFeed.Content>
								</SematicFeed.Event>,
							)
						}
					</SematicFeed>
				</div>
      );
    } else {
      return(
				<div className="feed-wrapper">
					<SematicFeed>
						<SematicFeed.Event>
							<SematicFeed.Content>
								<SematicFeed.Summary>
									<SematicFeed.User>Elliot Fu</SematicFeed.User> added you as a friend
									<SematicFeed.Date>1 Hour Ago</SematicFeed.Date>
								</SematicFeed.Summary>
								<SematicFeed.Meta>
									<SematicFeed.Like>
										<Icon name="like" />
										4 Upvotes
									</SematicFeed.Like>
									<SematicFeed.Like>
										<Icon name="like" />
										2 Downvotes
									</SematicFeed.Like>
								</SematicFeed.Meta>
							</SematicFeed.Content>
						</SematicFeed.Event>
					</SematicFeed>
				</div>
      );
    }
  }
}
