import * as React from 'react';
import axios from 'axios';

import {
  Button,
  Card,
  Dimmer,
  Header,
  Icon,
  Loader,
  Modal,
} from 'semantic-ui-react';

import {
  RIEInput,
  RIETextArea,
} from 'riek';

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
  selectedIndex: number;
}

export default class Profile extends React.Component < ProfileProps, ProfileState > {
  constructor (props: any) {
    super(props);

    this.state = {
      clicked: false,
      loading: true,
      selectedIndex: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.loadMoreCards = this.loadMoreCards.bind(this);
    this.loadProfileData = this.loadProfileData.bind(this);
    this.onCardChange = this.onCardChange.bind(this);
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
          cardData: data.slice(0, 6),
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
        {
          clicked: true,
          selectedIndex: index,
        },
      ),
    );
  }

  loadMoreCards () {
    const max = this.state.allCardData.length;
    const current = this.state.cardData.length;
    const newLimit = current + 6 <= max ? current + 6 : max;
    this.setState(
      Object.assign(
        {},
        this.state,
        { cardData: this.state.allCardData.slice(0, newLimit) },
      ),
    );
  }

  onCardChange (data: any) {
    const { cardData, selectedIndex } = this.state;

    const newCard = Object.assign(
      {},
      cardData[selectedIndex],
      data,
    );

    /* update card into temp state */
    /* tslint:disable */
    let newCardList = cardData;
    let newAllCardList = this.state.allCardData;
    /* tslint:enable */
    newCardList[selectedIndex] = newCard;
    newAllCardList[selectedIndex] = newCard;

    this.setState(
      Object.assign(
        {},
        this.state,
        {
          allCardData: newAllCardList,
          cardData: newCardList,
        },
      ),
    );

    return axios({
      method: 'post',
      url: 'http://ec2-18-221-144-47.us-east-2.compute.amazonaws.com/cardservice/updatecard/',
      responseType: 'json',
      headers: {
        'X-Authorization-Token': this.props.token,
      },
      data: newCard,
    }).then(response => console.log(response))
    .catch(error => console.warn(error));
  }

  render () {
    const { clicked, cardData, loading, selectedIndex } = this.state;
    if (cardData) {
      return(
        <div className="profile-wrapper--cards">
          {/* Loader */}
          <Dimmer active={loading}>
            <Loader size="big">Hold tight! Fetching your cards...</Loader>
          </Dimmer>
          {/* Personal Cards */}
          <Cards
            data={cardData}
            token={this.props.token}
            openCard={this.openCard}
          />
          <div className="profile-wrapper--button">
            <Button
              color="blue"
              fluid={true}
              onClick={this.loadMoreCards}
            >
              Load more
            </Button>
          </div>
          {/* Modal */}
          <Modal open={clicked} >
            <Modal.Header>
              <RIEInput
                change={this.onCardChange}
                propName="title"
                value={cardData[selectedIndex].title || `${cardData[selectedIndex].content.slice(0, 25)}..` || 'Sample title'}
              />
            </Modal.Header>
            <Modal.Content
              image={true}
              scrolling={true}
            >
              <RIETextArea
                change={this.onCardChange}
                cols="100"
                propName="content"
                rows="10"
                value={cardData[selectedIndex].content || 'Sample content'}
              />
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={this.handleClick}
                primary={true}
              >
                Proceed <Icon name="chevron right" />
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      );
    } else {
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
          <div className="profile-wrapper--button">
            <Button
              color="blue"
              fluid={true}
              onClick={this.loadMoreCards}
            >
              Load more
            </Button>
          </div>
          {/* Modal */}
          <Modal open={clicked} >
            <Modal.Header>
              'Sample Title'
            </Modal.Header>
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
}
