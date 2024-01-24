import React from "react";
import {
    Badge,
    Media,
    Table,
} from "reactstrap";

const GameListTables = ({ game_data }) => {
    return (
        <>
            <Table className="align-items-center" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Result Time</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col" />
                    </tr>
                </thead>
                {
                    game_data?.map((item) => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <Media className="align-items-center">

                                            <Media>
                                                <span className="mb-0 text-sm">{item?.name}</span>
                                            </Media>
                                        </Media>
                                    </th>
                                    <td>{item?.resultTime}</td>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {item?.startTime}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge color="green" className="badge-dot mr-4">
                                            {item?.endTime}
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

export default GameListTables;
