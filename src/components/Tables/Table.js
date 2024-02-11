import { ErrorToast } from "Helper/Toast";
import { SuccessToast } from "Helper/Toast";
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
import { ApiURL } from "services/apiConstants";
import { deleteApi } from "services/services";

const Tables = ({ user_data, toggleModal, setVisible, visible, setName, setPhone, setUserId, getUserList, setStatus }) => {
    toggleModal = (item) => {
        setUserId(item?._id)
        setName(item?.name)
        setPhone(item?.mobile)
        setStatus(item?.status)
        setVisible(!visible);
    };

    const handleDelete = (item) => {
        deleteApi(ApiURL.user_delete + "/" + item._id).then((res) => {
            console.log({ res });
            if (res && res?.status == true) {
                SuccessToast(res?.message)
                getUserList()
            } else {
                ErrorToast(res?.message)
            }
        })
    }
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
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className="btn-icon-only text-light"
                                                href="#pablo"
                                                role="button"
                                                size="sm"
                                                color=""
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className="fas fa-ellipsis-v" style={{ fontSize: "20px" }} />
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => handleDelete(item)}
                                                >
                                                    Delete
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => toggleModal(item)}
                                                >
                                                    Edit
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
