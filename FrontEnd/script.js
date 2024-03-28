const response = await fetch("http://localhost:5678/api/works");
const projects = await response.json();
// ========== CREATION FILTERS BUTTONS & FILTERS FUNCTION ========== //

const generateBtnsFilter = async () => {
  const res = await fetch("http://localhost:5678/api/categories");
  const categories = await res.json();

  const sectionFilters = document.querySelector(".btn-filters");
  
  const btnFilter = document.createElement("button");
  btnFilter.className = "filter";
  btnFilter.dataset.id = 0;
  btnFilter.innerText = "Tous";
  sectionFilters.appendChild(btnFilter);
  
  for (let i = 0; i < categories.length; i++) {
    const filter = categories[i];
    const btnFilter = document.createElement("button");
    btnFilter.className = "filter";
    btnFilter.dataset.id = filter.id;
    btnFilter.innerText = filter.name;

    sectionFilters.appendChild(btnFilter);
  }  

  const btnsFilter = document.querySelectorAll("button");
  let id;
  for (let i = 0; i < btnsFilter.length; i++) {
    const btn = btnsFilter[i];
 
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const filteredProjects = projects.filter(function (project) {
          return project.categoryId == id;
      });

      switch (id) {
        case "1":
          document.querySelector(".gallery").innerHTML = "";
          generateCards(filteredProjects);
          break;
        case "2":
          document.querySelector(".gallery").innerHTML = "";
          generateCards(filteredProjects);
          break
        case "3":
          document.querySelector(".gallery").innerHTML = "";
          generateCards(filteredProjects);
          break
        default:
          document.querySelector(".gallery").innerHTML = "";
          generateCards(projects);
      }
})  }
}

// ========== GENERATION CARDS PROJECTS ========== //

const generateCards= (projects) => {
        if (!projects || !projects.length) {
          console.log("Aucun projet à afficher.");
          return;
        }
        for (let i = 0; i < projects.length; i++) {
          const project = projects[i];
              const sectionProjects = document.querySelector(".gallery");
               
              const viewProject = document.createElement("figure");

              const imageZoom = document.createElement("div");
              const imageProject = document.createElement("img");
              const captionProject = document.createElement("figcaption");

              imageZoom.classList.add("zoom");
              imageProject.src = project.imageUrl;
              captionProject.innerText = project.title;

              sectionProjects.appendChild(viewProject);
              viewProject.appendChild(imageZoom);
              imageZoom.appendChild(imageProject);
          viewProject.appendChild(captionProject);
          
    }
}

generateBtnsFilter();
generateCards(projects);


// ========== Edition mode  ========== //

