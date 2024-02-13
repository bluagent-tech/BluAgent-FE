import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
//import { routerReducer, routerMiddleware } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
//import { createLogger } from 'redux-logger';
import * as UserLog from './UserLog';
import * as AccountSettings from './AccountSettings';
import * as DQF from './DQF';
import * as Drivers from './Drivers';
import * as Maintenance from './Maintenance';
import * as Trucks from './Trucks';
import * as DriverNotifications from './DriverNotifications';
import * as Trailers from './Trailers';
import * as DrugAndAlcoholTesting from './DrugAndAlcoholTesting';
import * as ClearingHouse from './ClearingHouse';
import * as Widget06 from './Widget06';
import * as WidgetAlcohol from './WidgetAlcohol';
import * as WorkOrder from './WorkOrder';
import * as Accidents from './AccidentsStore';
import * as Companies from './companyStore';
import * as CollectionSites from './CompanyProfileStore';
import * as Devices from './DevicesStore';

export const history = createBrowserHistory();

export default function configureStore(history) {
  const reducers = {
    userLog: UserLog.reducer,
    accountSettings: AccountSettings.reducer,
    dqf: DQF.reducer,
    drivers: Drivers.reducer,
    maintenance: Maintenance.reducer,
    trucks: Trucks.reducer,
    notifications: DriverNotifications.reducer,
    trailers: Trailers.reducer,
    drugAndAlcoholTesting: DrugAndAlcoholTesting.reducer,
    clearinghouse: ClearingHouse.reducer,
    widget06: Widget06.reducer,
    widgetAlcohol: WidgetAlcohol.reducer,
    workOrders: WorkOrder.reducer,
    companies: Companies.reducer,
    collectionsites: CollectionSites.reducer,
    devices: Devices.reducer
  };

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (
    isDevelopment &&
    typeof window !== 'undefined' &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const createRootReducer = (history) =>
    combineReducers({
      router: connectRouter(history),
      ...reducers,
      Accidents,
      DriverNotifications,
      Widget06,
      WidgetAlcohol,
      Companies,
      CollectionSites,
      Drivers,
      DrugAndAlcoholTesting,
      ClearingHouse,
      Devices
    });

  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(thunk, routerMiddleware(history)), ...enhancers)
  );
  return store;
}
