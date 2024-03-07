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
                        <th scope="col">Price</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        <th scope="col" />
                    </tr>
                </thead>
                {
                    game_data?.map((item) => {
                        let formatDate = moment(item?.date).format('l');
                        let data = item?.data

                        data.map((_item) => console.log('_item _item', _item?.games[0]?.name))
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <Media className="align-items-center">
                                            <Media>
                                                <span className="mb-0 text-sm">{data.map((_item) => _item?.games[0]?.name)}</span>
                                            </Media>
                                        </Media>
                                    </th>
                                    <td>
                                        {data.map((_item) => _item?.gameNumber?.number)}
                                    </td>
                                    <td>
                                        {data.map((_item) => _item?.gameNumber?.price)}
                                    </td>

                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {formatDate}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {data.map((_item) => _item?.status)}
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
