(async () => {
    let response = await fetch("/projects");
    let projects = await response.json();

    const projectsWrapperDiv = document.getElementById("projects-wrapper");

    projects.map(project => {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = `

        <div class="flex justify-between">
            <div>
                Project name: ${escapeHTML(project.name)}
                <p>Category: ${escapeHTML(project.category)}</p>
                <p>Technology: ${escapeHTML(project.tech)}</p>
            </div>
        
        </div>

        <br/><br/>
    `;

        projectsWrapperDiv.appendChild(projectDiv);

    });


})();
