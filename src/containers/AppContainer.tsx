import * as React from 'react';
import { App } from '../components/App';

import { connect } from 'react-redux';

export class AppContainer extends React.Component < any, any > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render () {
    return(
			<App message={this.props.message} />
    );
  }
}

const mapStateToProps = (state: any) => ({
  message: state.title,
});

export default connect(
	mapStateToProps,
)(AppContainer);
