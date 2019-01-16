import dispatcher from "../Dispatcher";
import axios from 'axios';
import * as Constants from "../utils/constants";


// function that receives the required params to call the yelp api
export function dispatchGetInfo(name, lat, lng) {
  // call yelp api
  axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
      params: {
        term: name,
        latitude: lat,
        longitude: lng
      },
      headers: {
        Authorization: 'Bearer ' + 'i16a6V32crV2RbB2BHMrRvJ-5Vda_qneFBnZnJ8Vj9lorika9vB_DJRK_Fe' +
          'SAkNAfglNlacGh5Y1Rvnl712VwJRqc52HKuGSAjpu29TQW1h3jcZp7_ukspunoBM6XHYx'
      }
    })
    .then(function(response) {
      var markerInfo = response.data.businesses[0];
// on successs, if received business is available send it to the store
      if (markerInfo) {
        dispatcher.dispatch({
          type: Constants.MAP_MARKER_ACTIONS.GET_INFO,
          value: markerInfo
        })
      } else { // on successs, if received business is not available return an error msg to the user

        dispatcher.dispatch({
          type: Constants.MAP_MARKER_ACTIONS.DISPLAY_ERROR,
          value: "SOMETHING WENT WRONG, PLEASE CHECK YOUR CONNECTION"
        })
      }



    })
    .catch(function(error) {
      console.log(error);
// on http request error, display an error msg to the user

      dispatcher.dispatch({
        type: Constants.MAP_MARKER_ACTIONS.DISPLAY_ERROR,
        value: "SOMETHING WENT WRONG, PLEASE CHECK YOUR CONNECTION"
      })
    });




}

// sends search change param to the store
export function dispatchSearchChange(param) {
  // call yelp api
  dispatcher.dispatch({
    type: Constants.MAP_MARKER_ACTIONS.ON_SEARCH_CHANGE,
    value: param
  })




}
// sends item list selection to the store

export function dispatchListSelection(param) {
  // call yelp api
  dispatcher.dispatch({
    type: Constants.MAP_MARKER_ACTIONS.ON_LIST_SELECTION,
    value: param
  })




}
