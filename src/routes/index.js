import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './../components/app';
import Start from './../components/start';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Start}/>
    </Route>
);
