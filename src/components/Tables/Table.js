import React from "react";
import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Table,
} from "reactstrap";

const Tables = ({ user_data }) => {
    return (
        <>
            <Table className="align-items-center" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">mobile</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        <th scope="col" />
                    </tr>
                </thead>
                {
                    user_data?.map((item) => {

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
                                    <td>{item?.mobile}</td>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            {item?.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge color="green" className="badge-dot mr-4">
                                            {"Good"}
                                        </Badge>
                                    </td>
                                    <td className="text-right">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className="btn-icon-only text-light"
                                                href="#pablo"
                                                role="button"
                                                size="sm"
                                                color=""
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className="fas fa-ellipsis-v" />
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Users
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Number
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
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

export default Tables;
