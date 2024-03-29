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
                <thead className="thead-danger">
                    <tr className="table-danger">
                        <th scope="col">Name</th>
                        <th scope="col">Game Number</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                {
                    game_data?.map((item) => {
                        let formatDate = moment(item?.date).format('l');
                        let data = item?.data

                        data.map((_item) => console.log('_item _item', _item?.games[0]?.name))
                        return (
                            <tbody>
                                <tr className="table-success">
                                    <th scope="row">
                                        <Media className="align-items-center">
                                            <Media>
                                                <span className="mb-0 text-sm">{data.map((_item) =>
                                                    <tr><td>{_item?.games[0]?.name}</td></tr>
                                                )

                                                }</span>
                                            </Media>
                                        </Media>
                                    </th>

                                    <td>
                                        {data.map((_item) => <tr><td>{_item?.gameNumber?.number}</td></tr>)}
                                    </td>
                                    <td>
                                        {data.map((_item) => <tr><td>{_item?.gameNumber?.price}</td></tr>)}
                                    </td>

                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {formatDate}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {data.map((_item) => <tr><td>{_item?.status}</td></tr>)}
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
