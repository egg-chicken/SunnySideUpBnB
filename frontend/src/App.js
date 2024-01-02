import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetails from "./components/Spots/spot-details.js";
import CreateSpotForm from "./components/Spots/create-spot.js";
import ManageSpots from "./components/Spots/manage-spots.js";
import UpdateSpotForm from "./components/Spots/update-spot.js";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/spots/current'>
          <ManageSpots />
        </Route>
        <Route path='/spots/new'>
          <CreateSpotForm />
        </Route>
        <Route path='/spots/:id/edit'>
          <UpdateSpotForm />
        </Route>
        <Route exact path='/spots/:id'>
          <SpotDetails />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
