import React from 'react';
import { Switch  } from 'react-router-dom';
import ChoosePokemon from '../views/ChoosePokemon/ChoosePokemon.jsx';

import Home from '../views/Home/Home.jsx';
import NotFound from '../views/NotFound/NotFound';
import Route from './routes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/choose-pokemon" component={ChoosePokemon} />
    <Route component={NotFound} />
  </Switch>
);
export default Routes;
