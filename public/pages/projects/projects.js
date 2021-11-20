(async () => {
    let response = await fetch("/projects");
    let projects = await response.json();

    const projectsWrapperDiv = document.getElementById("projects-wrapper");

    projects.map(project => {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = `
        <h3>Project name: ${escapeHTML(project.name)}</h3>
        <p>Category: ${escapeHTML(project.category)}</p>
        <p>Technology: ${escapeHTML(project.tech)}</p>
        <p>Id: ${escapeHTML(project.id)}</p>

        <br/><br/>
    `;

        projectsWrapperDiv.appendChild(projectDiv);

    });


})();
