import moment from "moment";
import React from "react";
import {
    Badge,
    Media,
    Table,
} from "reactstrap";

const WithdrawalListTable = ({ game_data }) => {
    return (
        <>
            <Table className="align-items-center" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Upi</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col" />
                    </tr>
                </thead>
                {
                    game_data?.map((item) => {
                        console.log("item=====", item)
                        let formatDate = moment(item?.date).format('l');
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <Media className="align-items-center">
                                            <Media>
                                                <span className="mb-0 text-sm">{item?.upi}</span>
                                            </Media>
                                        </Media>
                                    </th>
                                    <td>{item?.amount}</td>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {formatDate}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge color="green" className="badge-dot mr-4">
                                            {item?.status}
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

export default WithdrawalListTable;
