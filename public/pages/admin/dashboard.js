// import express from "express";
// const router = express.Router();
// import { connection } from "../../../database/connectMysqlDb.js";

(async () => {
    let response = await fetch("/projects");
    let projects = await response.json();

    const projectsWrapperDiv = document.getElementById("projects-wrapper");

    // const test = router.delete('/delete/:id', function (req, res) {
    //     const id = req.params.id;
    //     connection.query(`DELETE FROM projects WHERE id = ${id}`, function (error, results, fields) {
    //         if (error) throw err;
    //         res.send("project deleted");
    //     },

    //     )
    // })

    projects.map(project => {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = `
        <div class="flex justify-between">

            <div>
                <div class="text-lg">Project name: ${escapeHTML(project.name)}</div>
                <div class="text-lg my-3">Category: ${escapeHTML(project.category)}</div>
                <div class="text-lg">Technology: ${escapeHTML(project.tech)}</div>
            </div>


            <div class="ml-10 flex">

              <div>
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
              </div>
                
                

              <div class="ml-5">
                <form
                action="/delete/${project.id}"
                method="get">

                <button
                class="
                bg-red-500
                hover:bg-red-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                ">
                    delete
                </button> 



                </form>
              </div>
                
 
            </div>
        
        </div>

        <br/><br/>
    `;

        projectsWrapperDiv.appendChild(projectDiv);

    });


})();
