import * as React from "react";
import { useStoreState, useStoreDispatch, useStoreActions } from "easy-peasy";
import Jumbo from "./Jumbotron";
import styled from "styled-components";

const WrapperInfo = styled.div`
  text-align: center;
  padding: 0px 20px;
`;

const Title = styled.h1`
  font-family: monospace;
  font-size: ${(props) => props.fontSize};
  margin: 30px 0px;
  color: #ffac28;

  @media (max-width: 480px) {
    font-size: 1.25rem;
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

const ChooseSource = ({ data, loading }): React.Node => {
  const { getLatestCovid } = useStoreActions(({ LatestCovid }) => LatestCovid);

  const setSource = (source) => {
    getLatestCovid(source);
  };

  if (loading === false) {
    return (
      <Flex>
        {data &&
          data.sources &&
          data.sources.map((source) => (
            <ListSource key={source} onClick={() => getLatestCovid(source)}>
              {source}
            </ListSource>
          ))}
      </Flex>
    );
  }
  return "Loading...";
};

const DataCovid = ({ data, loading }): React.Node => {
  if (loading === false && data !== null) {
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
      </React.Fragment>
    );
  }
  return null
};

const Home = (): React.Node => {
  const dispatch = useStoreDispatch();
  const { LatestCovid: latestState, Source: sourceState } = useStoreState((state) => state);

  React.useEffect(() => {
    dispatch.Source.getSource();
  }, [dispatch.Source]);

  return (
    <React.Fragment>
      <Jumbo />
      <WrapperInfo>
        <Title fontSize="2.75rem">UPDATE CORONA VIRUS TERKINI</Title>
        <Title fontSize="1.5rem">PILIH SUMBER DATA</Title>
        <ChooseSource data={sourceState.initialState.result} loading={sourceState.initialState.loading} />
        <DataCovid data={latestState.initialState.result} loading={latestState.initialState.loading} />
      </WrapperInfo>
    </React.Fragment>
  );
};

export default Home;
