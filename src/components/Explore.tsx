import * as React from 'react';
import {
	Button,
	Select,
	Input,
} from 'semantic-ui-react';

interface ExploreProps {
}

interface ExploreState {
  type: string;
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
		};
		this.selectTypeOfSearch = this.selectTypeOfSearch.bind(this);
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

  render () {
    return(
			<div className="search-wrapper">
				<div className="search-wrapper--search">
					<Input
						type="text"
						placeholder="Search..."
						action={true}
						size="huge"
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
						>
							Search
						</Button>
					</Input>
				</div>
			</div>
    );
  }
}
