import React from "react";

import {
    Table
} from "reactstrap";
import ProjectRow from "./projectRow";
import { getUserData } from "../../../utils/auth"

const user = getUserData();

function ProjectsSelector (props) {
    return (
        <Table>
            <thead>
                <th>Project Name</th>
                <th>Last Edited</th>
                <th></th>
            </thead>
            <tbody>
                {user.projects ?
                    Object.keys(user.projects).map(name => (
                        <ProjectRow name={name} data={user.projects[name]} />
                    ))
                : <p>No projects yet, create one below</p>}
            </tbody>
        </Table>
    );
}

export default ProjectsSelector;
