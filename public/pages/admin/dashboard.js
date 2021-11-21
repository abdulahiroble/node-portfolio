(async () => {
    let response = await fetch("/projects");
    let projects = await response.json();

    const projectsWrapperDiv = document.getElementById("projects-wrapper");

    projects.map(project => {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = `
        <div class="flex justify-between">

            <div>
                <div class="text-lg">Project name: ${escapeHTML(project.name)}</div>
                <div class="text-lg my-3">Category: ${escapeHTML(project.category)}</div>
                <div class="text-lg">Technology: ${escapeHTML(project.tech)}</div>
            </div>


            <div class="ml-10">
                <button
                class="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                "
                onclick="updateFunction()">
                    update
                </button>   
                
                <button
                class="
                bg-red-500
                hover:bg-red-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                "
                onclick="deleteFunction()">
                    delete
                </button>   
            </div>
        
        </div>

        <br/><br/>
    `;

        projectsWrapperDiv.appendChild(projectDiv);

    });


})();
