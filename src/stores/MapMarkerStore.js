import dispatcher from "../Dispatcher";
import {
  EventEmitter
} from "events";
import * as Constants from "../utils/constants";



class MapMarkerStore extends EventEmitter {



  constructor() {
    super();
    this.markerInfo = {};
    this.errorMsg = "";
    this.searchParam = "";
    this.idSelected = "";

  }

// handles dispatches actions with their respective params from MapMarkerActions
  handleActions(action) {
    switch (action.type) {
      case Constants.MAP_MARKER_ACTIONS.GET_INFO:
        {

          this.markerInfo = action.value;
          this.emit(Constants.EVENT_TYPE.GET_INFO);

          break;
        }
        case Constants.MAP_MARKER_ACTIONS.ERROR_MSG:
          {

            this.errorMsg = action.value;
            this.emit(Constants.EVENT_TYPE.ERROR_MSG);

            break;
          }
          case Constants.MAP_MARKER_ACTIONS.ON_SEARCH_CHANGE:
            {

              this.searchParam = action.value;
              this.emit(Constants.EVENT_TYPE.ON_SEARCH_CHANGE);

              break;
            }
            case Constants.MAP_MARKER_ACTIONS.ON_LIST_SELECTION:
              {

                this.idSelected = action.value;
                this.emit(Constants.EVENT_TYPE.ON_LIST_SELECTION);

                break;
              }
      default:
        {}
    }
  }

  getInfo() {
    return this.markerInfo;
  }

  getIdSelected() {
    return this.idSelected;
  }

  getErrorMsg() {
    return this.errorMsg;
  }

  getSearchParam() {
    return this.searchParam;
  }
}

const mapMarkerStore = new MapMarkerStore();
dispatcher.register(mapMarkerStore.handleActions.bind(mapMarkerStore));
export default mapMarkerStore;
