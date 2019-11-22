import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Projects = ({ history, projects }) => {
   

    return (
        <Container>
            <h1> These are some dope projects yeehaw </h1>
            <ProjectContainer>
                {
                    projects.map(project => (
                        <ProjectCard>
                            <h3>{project.name}</h3>
                            <p><em>Description:</em> {project.description}</p>
                            <button onClick={() => history.push(`/projects/${project.id}`)}>View Project Actions</button>
                        </ProjectCard>
                    ))
                }
            </ProjectContainer>
        </Container>
    )
}

export default Projects

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProjectContainer = styled.div`
    width: 80%;
    padding: 20px;
    background: dodgerblue;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: flex-start;
`;

const ProjectCard = styled.div`
    background: pink;
    width: 200px;
    height: 250px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
`;