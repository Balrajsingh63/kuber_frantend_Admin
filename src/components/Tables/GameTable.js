import moment from "moment";
import React from "react";
import {
    Badge,
    Media,
    Table,
} from "reactstrap";

const GameTables = ({ game_data }) => {

    return (
        <>
            <Table className="align-items-center" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Game Number</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        <th scope="col" />
                    </tr>
                </thead>
                {
                    game_data?.map((item) => {
                        let number = item?.gameNumber
                        let formatDate = moment(item?.date).format('l');
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <Media className="align-items-center">

                                            <Media>
                                                <span className="mb-0 text-sm">{item?.userId?.name}</span>
                                            </Media>
                                        </Media>
                                    </th>
                                    <td>
                                        {
                                            number.map((item) => item?.number + " ")
                                        }
                                    </td>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {formatDate}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {"Active"}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge color="green" className="badge-dot mr-4">
                                            {"Good"}
                                        </Badge>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </>
    );
};

export default GameTables;
