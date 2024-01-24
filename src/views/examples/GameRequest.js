import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { get } from "../../services/services";
import { ApiURL } from "../../services/apiConstants";
import GameTables from "../../components/Tables/GameTable";

const GameRequest = () => {
  const [gameData, setGameData] = useState([])

  const getUser_List = () => {
    get(ApiURL.game_request_List).then((res) => {
      if (res && res?.status === true) {
        setGameData(res?.data)
      }
    })
  }
  useEffect(() => {
    getUser_List()
  }, [])


  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Game Request</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <GameTables game_data={gameData} />
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default GameRequest;
