// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Tables from "components/Tables/Table";
import { useEffect, useState } from "react";
import { get } from "../../services/services";
import { ApiURL } from "../../services/apiConstants";

const UserManagement = () => {
  const [userData, setUserData] = useState([])

  const getUser_List = () => {
    get(ApiURL.user_List).then((res) => {
      if (res && res?.status === true) {
        setUserData(res?.data)
      }
    })
  }
  useEffect(() => {
    getUser_List()
  }, [])


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">User Management</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <Tables user_data={userData} />
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserManagement;
