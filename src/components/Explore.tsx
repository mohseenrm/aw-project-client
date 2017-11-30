import * as React from 'react';
import axios from 'axios';

import {
	Button,
	Select,
	Header,
	Input,
	Segment,
	Statistic,
} from 'semantic-ui-react';

interface ExploreProps {
  token: string;
}

interface ExploreState {
  type: string;
  search: string;
  searchData?: any;
}

const options = [
  { key: 'all', text: 'All', value: 'all' },
  { key: 'tags', text: 'Tags', value: 'tags' },
];

export default class Explore extends React.Component < ExploreProps, ExploreState > {
  constructor (props: any) {
		/* tslint:disable */
		super(props);
		this.state = {
			type: 'all',
			search: ''
		};
		this.selectTypeOfSearch = this.selectTypeOfSearch.bind(this);
		this.sendSearchRequest = this.sendSearchRequest.bind(this);
		this.handleChange = this.handleChange.bind(this);
		/* tslint:enable */
  }

  selectTypeOfSearch (data: any, element: any) {
    this.setState(
			Object.assign(
				{},
				this.state,
				{ type: element.value },
			),
		);
  }

  sendSearchRequest () {
    const { type, search } = this.state;
    let api;
    if (type === 'tag') {
      api = 'http://ec2-18-221-144-47.us-east-2.compute.amazonaws.com/cardservice/tagsearch/?search=' + search;
    }
    else { api = 'http://ec2-18-221-144-47.us-east-2.compute.amazonaws.com/cardservice/rawsearch/?search=' + search; }

    return axios({
      method: 'get',
      url: api,
      responseType: 'json',
      headers: {
        'X-Authorization-Token': this.props.token,
      },
    }).then((response: any) => {
      const searchData = response.data.responseData.result || null;

      return this.setState(
				Object.assign(
					{},
					this.state,
					{ searchData },
				),
			);
    })
    .catch((error: any) => console.log(error));
  }

  handleChange (e: any, state: any) {
    const { name, value } = e.target;
    this.setState(
			Object.assign(
				{},
				this.state,
				{ [name]: value },
			),
		);
  }

  render () {
    if (this.state.searchData) {
      return(
				<div className="search-wrapper">
					<div className="search-wrapper--search">
						<Input
							type="text"
							placeholder="Search..."
							action={true}
							size="huge"
							name="search"
							onChange={this.handleChange}
						>
							<input />
							<Select
								compact={true}
								options={options}
								onChange={this.selectTypeOfSearch}
								defaultValue="all"
								size="huge"
							/>
							<Button
								color="blue"
								primary={true}
								type="submit"
								size="huge"
								onClick={this.sendSearchRequest}
							>
								Search
							</Button>
						</Input>
					</div>
					<div className="search-wrapper--results">
							{
								this.state.searchData.map((data: any) =>
									<Segment>
										<Statistic floated="right">
											<Statistic.Value>{parseFloat(data.score).toFixed(2)}</Statistic.Value>
											<Statistic.Label>Score</Statistic.Label>
										</Statistic>
										<Header
											as="h2"
											content={data.title || `${data.content.slice(0, 20)}...`}
										/>
										{data.content}
									</Segment>,
								)
							}
					</div>
				</div>
      );
    } else {
      return(
				<div className="search-wrapper">
					<div className="search-wrapper--search">
						<Input
							type="text"
							placeholder="Search..."
							action={true}
							size="huge"
							name="search"
							onChange={this.handleChange}
						>
							<input />
							<Select
								compact={true}
								options={options}
								onChange={this.selectTypeOfSearch}
								defaultValue="all"
								size="huge"
							/>
							<Button
								color="blue"
								primary={true}
								type="submit"
								size="huge"
								onClick={this.sendSearchRequest}

							>
								Search
							</Button>
						</Input>
					</div>
				</div>
      );
    }
  }
}
