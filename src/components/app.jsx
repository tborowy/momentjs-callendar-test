import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Moment Calendar Tester" showMenuIconButton={false}/>
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
