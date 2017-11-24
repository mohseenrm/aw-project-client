import * as React from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Dimmer,
  Header,
  Icon,
  Image,
  Loader,
  Modal,
} from 'semantic-ui-react';

import Cards from './Cards';

interface ProfileProps {
  username: string;
  token: string;
}

interface ProfileState {
  allCardData?: [any];
  cardData?: [any];
  clicked: boolean;
  loading: boolean;
}

export default class Profile extends React.Component < ProfileProps, ProfileState > {
  constructor (props: any) {
    super(props);

    this.state = {
      clicked: false,
      loading: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.loadProfileData = this.loadProfileData.bind(this);
    this.loadMoreCards = this.loadMoreCards.bind(this);
    this.openCard = this.openCard.bind(this);
  }

  // onclick function of card
  handleClick () {
    /* this pattern is used to copy keys from previous state and update new ones */
    this.setState(
      Object.assign(
        {},
        this.state,
        { clicked: !this.state.clicked },
      ),
    );
  }

  componentDidMount () {
    return axios({
      method: 'get',
      url: 'http://ec2-18-221-144-47.us-east-2.compute.amazonaws.com/cardservice/getallcards/',
      responseType: 'json',
      headers: {
        'X-Authorization-Token': this.props.token,
      },
    }).then(response => this.loadProfileData(response.data.responseData.result || []))
    .catch(error => console.warn(error));
  }

  loadProfileData (data: [any]) {
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          allCardData: data,
          cardData: data.slice(0, 5),
          loading: false,
        },
      ),
    );
  }

  openCard (index: number) {
    console.log(index);
    this.setState(
      Object.assign(
        {},
        this.state,
        { clicked: true },
      ),
    );
  }

  loadMoreCards () {
    const max = this.state.allCardData.length;
    const current = this.state.cardData.length;
    const newLimit = current + 5 <= max ? current + 5 : max;
    this.setState(
      Object.assign(
        {},
        this.state,
        { cardData: this.state.allCardData.slice(0, newLimit) },
      ),
    );
  }

  render () {
    const { clicked, cardData, loading } = this.state;
    return(
			<div className="profile-wrapper--cards">
        {/* Loader */}
        <Dimmer active={loading}>
          <Loader size="big">Hold tight! Fetching your cards...</Loader>
        </Dimmer>
        {/* Cards */}
        <Cards
          data={cardData}
          token={this.props.token}
          openCard={this.openCard}
        />
        <Button
          color="blue"
          fluid={true}
          onClick={this.loadMoreCards}
        >
          Load more
        </Button>
        {/* Modal */}
        <Modal open={clicked} >
          <Modal.Header>Profile Picture</Modal.Header>
          <Modal.Content
            image={true}
            scrolling={true}
          >
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
