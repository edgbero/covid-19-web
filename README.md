# CORONA VIRUS TRACKER

**Provides a simple frontend web display Coronavirus data. Includes numbers about confirmed cases, deaths and recovered. Support multiple data-sources.**

Currently 3 different data-sources are available to retrieve the data:
- jhu - Johns Hopkins University Center.
- csbs - Conference of State Bank Supervisors.
- nyt - The New York Times

World Table provide numbers about confirmed cases, deaths and recovered for each country and its province

# API
All endpoints come from [coronavirus-tracker-api.herokuapp.com/v2/](https://coronavirus-tracker-api.herokuapp.com/#/). 

# Application Flow
- **Responsive design for max-width: 480px (mobile-web)**
- The user will be presented with the selection of data sources. By default the data displayed is from 'jhu'
- The latest case data and World Table will be refreshed when the user choose one source

# Instalation / Running 
1. Make sure you have [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
2. git clone ```https://github.com/edgbero/covid-19-web.git```
3. cd ```coronavirus-tracker-api```
4. ```yarn start```
5. Visit your app at http://localhost:3000.

## This app uses:
- [flow](https://flow.org/en/docs/getting-started/) for checker
- [easy-peasy](https://easy-peasy.now.sh/) make it easy in redux
- [react-bootstrap](https://react-bootstrap.github.io/) for framework css
- [styled-component](https://styled-components.com/) for css management

## Running Test
1. ```yarn test```
2. To see the coverage, run ```yarn --coverage```. Open ```coverage > Icov-report > assets > index.html``` in the browser

All files are not yet perfectly covered :pray:

## Running Flow
1. ```yarn flow```

