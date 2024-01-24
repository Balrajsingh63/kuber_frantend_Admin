import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { get } from "../../services/services";
import { ApiURL } from "../../services/apiConstants";
import GameListTables from "components/Tables/GameListTable";


const GameRequestList = () => {
  const [gameData, setGameData] = useState([])

  const getUser_List = () => {
    get(ApiURL.game_List).then((res) => {
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
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Game List</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <GameListTables game_data={gameData} />
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default GameRequestList;
