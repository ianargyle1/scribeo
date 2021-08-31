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
                    user.projects.map(project => (
                        <ProjectRow data={{ name: project.name, date: project.time._seconds }} />
                    ))
                : <p>No projects yet, create one below</p>}
            </tbody>
        </Table>
    );
}

export default ProjectsSelector;
