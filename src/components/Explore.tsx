import * as React from 'react';
import {
	Button,
	Select,
	Input,
} from 'semantic-ui-react';

interface ExploreProps {
}

interface ExploreState {
}

const options = [
  { key: 'all', text: 'All', value: 'all' },
  { key: 'tags', text: 'Tags', value: 'tags' },
];

export default class Explore extends React.Component < ExploreProps, ExploreState > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render () {
    return(
			<div>
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
						defaultValue="all"
						size="huge"
					/>
					<Button
						type="submit"
						size="huge"
					>
						Search
					</Button>
				</Input>
			</div>
    );
  }
}
