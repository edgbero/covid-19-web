import * as React from "react";
import { useStoreState, useStoreDispatch, useStoreActions } from "easy-peasy";
import { Card, Table } from "react-bootstrap";
import Jumbo from "../Jumbotron";
import styled from "styled-components";

const StyledCard = styled(Card)`
  text-align: center;
  padding: 0px 20px;
  min-height: 375px;
`;

const Title = styled.h1`
  text-align: center;
  font-family: monospace;
  font-weight: 1000;
  font-size: ${(props) => props.fontSize};
  margin: 30px 0px;
  color: ${(props) => props.color};

  @media (max-width: 480px) {
    font-size: ${(props) => props.fontResp};
  }
`;

const Info = styled.li`
  margin: 0 5px;
  display: block;
  padding: 10px;
  color: ${(props) => props.color};
  width: 33.3%;
  font-weight: bold;

  border-bottom: ${(props) => props.color} solid ${(props) => props.border};

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const Flex = styled.ul`
  text-align: center;
  display: flex;
  padding: 0;
`;

const ListSource = styled.p`
  text-transform: uppercase;
  cursor: pointer;
  display: block;
  margin: 0 5px;
  padding: 10px;
  width: 33.3%;
  font-weight: bold;
  border-radius: 3px;
  background: #333;
  color: #fff;

  &:visited,
  &:hover,
  &:active {
    background: #444;
  }
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const WrapperTable = styled.div`
  max-height: 300px;
  overflow-y: scroll;
  margin-bottom: 25px;
  ::-webkit-scrollbar {
    width: 1em;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

const StyledTable = styled(Table)`
  font-size: 12px;
  margin-top: 20px
  position: relative;
  @media (max-width: 480px) {
    font-size: 8px;
  }

  thead tr th {
    width: 16.667%;
    top: 0;
    position: sticky;
    background: #fff;
    color: #333;
    box-shadow: inset 1px 1px #000, 0 1px #000;
  }

  td {
    box-shadow: inset 1px -1px #000;
  }

}

`;

const ChooseSource = ({ data, loading }): React.Node => {
  const { getLatestCovid } = useStoreActions(({ LatestCovid }) => LatestCovid);
  const { getLocations } = useStoreActions(({ Location }) => Location);

  const getData = (source) => {
    getLatestCovid(source);
    getLocations(source);
  };

  return (
    <Flex>
      {data &&
        data.sources &&
        data.sources.map((source) => (
          <ListSource key={source} onClick={() => getData(source)}>
            {source}
          </ListSource>
        ))}
    </Flex>
  );
};

const DataCovid = ({ data, loading }): React.Node => {
  return (
    <React.Fragment>
      <Flex>
        <Info color="blue" border="1px">
          Terkonfirmasi
        </Info>
        <Info color="red" border="1px">
          Meninggal
        </Info>
        <Info color="green" border="1px">
          Sembuh
        </Info>
      </Flex>
      {loading === false && data !== null && (
        <Flex>
          <Info color="blue" border="0px">
            {data.latest.confirmed}
          </Info>
          <Info color="red" border="0px">
            {data.latest.deaths}
          </Info>
          <Info color="green" border="0px">
            {data.latest.recovered}
          </Info>
        </Flex>
      )}
      {loading === true && (
        <Title fontSize="20px">Loading...</Title>
      )}
    </React.Fragment>
  );
};

const WorldTable = ({ data, loading }): React.Node => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  if (loading === false && data !== null) {
    return (
      <WrapperTable>
        <StyledTable size="sm" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Location</th>
              <th>Provinsi</th>
              <th>Terkonfirmasi</th>
              <th>Meninggal</th>
              <th>Sembuh</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((location) => (
              <tr key={location.id}>
                <th className="text-warning">{location.country}</th>
                <th>{location.province ? location.province : "-"}</th>
                <th className="text-primary">{location.latest.confirmed}</th>
                <th className="text-danger">{location.latest.deaths}</th>
                <th className="text-success">{location.latest.recovered}</th>
                <th>
                  {new Date(location.last_updated).toLocaleDateString(
                    "en-GB",
                    options
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </WrapperTable>
    );
  }

  return <Title fontSize="20px">Loading...</Title>;
};

const Home = (): React.Node => {
  const dispatch = useStoreDispatch();
  const {
    LatestCovid: latestState,
    Source: sourceState,
    Location: locationState,
  } = useStoreState((state) => state);

  React.useEffect(() => {
    dispatch.Source.getSource();
    dispatch.LatestCovid.getLatestCovid("jhu");
    dispatch.Location.getLocations("jhu");
  }, [dispatch.Source, dispatch.Location, dispatch.LatestCovid]);

  return (
    <React.Fragment>
      <Jumbo />
      {sourceState.initialState.loading === true && <Title>Loading...</Title>}
      {sourceState.initialState.loading === false && (
        <React.Fragment>
          <StyledCard>
            <StyledCard.Body>
              <Title fontSize="2.75rem" fontResp="2rem" color="#70baac">
                UPDATE CORONA VIRUS TERKINI
              </Title>
              <Title fontSize="1.5rem" fontResp="1.25rem" color="#557871">
                PILIH SUMBER DATA
              </Title>
              <ChooseSource
                data={sourceState.initialState.result}
                loading={sourceState.initialState.loading}
              />
              <DataCovid
                data={latestState.initialState.result}
                loading={latestState.initialState.loading}
              />
            </StyledCard.Body>
          </StyledCard>

          <Title fontSize="3.75rem" fontResp="3rem" color="#70baac">
            TABEL DUNIA
          </Title>
          <WorldTable
            data={locationState.initialState.result}
            loading={locationState.initialState.loading}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
