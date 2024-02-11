import { ErrorToast } from "Helper/Toast";
import { SuccessToast } from "Helper/Toast";
import React from "react";
import {
    Badge,
    Media,
    Table,
    UncontrolledTooltip,
} from "reactstrap";
import { ApiURL } from "services/apiConstants";
import { deleteApi } from "services/services";

const GameListTables = ({ game_data, toggleModal, exampleModal, getGame_List, setExampleModal, setResultTime, setOpenTime, setCloseTime, setName, setGameId }) => {
    toggleModal = (item) => {
        setGameId(item?._id)
        setResultTime(item?.resultTime);
        setOpenTime(item?.startTime);
        setCloseTime(item?.endTime);
        setName(item?.name);
        setExampleModal(!exampleModal);
    };

    const handleDelete = (item) => {
        deleteApi(ApiURL.delete_Game + "/" + item._id).then((res) => {
            console.log({ res });
            if (res && res?.status == true) {
                SuccessToast(res?.message)
                getGame_List()
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
                        <th scope="col">Result Time</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Action</th>
                        <th scope="col" />
                    </tr>
                </thead>
                {
                    game_data?.map((item, i) => {
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
                                    <td>
                                        <Badge color="red" className="badge-dot mr-4">
                                            <i className="ni ni-fat-remove" data-placement="top" id="tooltip611234743" style={{ fontSize: "30px" }} onClick={() => handleDelete(item)}></i>
                                            <UncontrolledTooltip
                                                delay={0}
                                                placement="top"
                                                target="tooltip611234743"
                                            >
                                                Delete
                                            </UncontrolledTooltip>
                                        </Badge>
                                        <Badge color="green" className="badge-dot mr-4">
                                            <i className="ni ni-ruler-pencil" data-placement="top" id="tooltip611234744" style={{ fontSize: "15px" }} onClick={() => toggleModal(item)}></i>
                                            <UncontrolledTooltip
                                                delay={0}
                                                placement="top"
                                                target="tooltip611234744"
                                            >
                                                Edit
                                            </UncontrolledTooltip>
                                        </Badge>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table >
        </>
    );
};

export default GameListTables;
