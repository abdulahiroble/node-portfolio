(async () => {
    let response = await fetch("/projects");
    let projects = await response.json();

    const projectsWrapperDiv = document.getElementById("projects-wrapper");

    projects.map(project => {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = `

        <div class="flex justify-between text-xl font-bold">
            <div>
                <div>Project name: ${escapeHTML(project.name)}</div>
                <div>Category: ${escapeHTML(project.category)}</div>
                <div>Technology: ${escapeHTML(project.tech)}</div>
                <div>Url: <a class="text-blue-800" target="_blank" href="${project.url}">${project.name}</a></div>
            </div>
        
        </div>

        <br/><br/>
    `;

        projectsWrapperDiv.appendChild(projectDiv);

    });


})();
