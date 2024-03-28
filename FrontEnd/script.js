const response = await fetch("http://localhost:5678/api/works");
const projects = await response.json();

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

// ========== CREATION FILTERS BUTTONS ========== //

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
  projectsFilter()
}

// ========== FILTERS FUNCTION ========== //

const projectsFilter = ()=>{
  const btnsFilter = document.querySelectorAll("button");

  btnsFilter.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      let filteredProjects;

      if (id === "0") {
        filteredProjects = projects;
      } else {
        filteredProjects = projects.filter(
          (project) => project.categoryId.toString() === id
        );
      }

      document.querySelector(".gallery").innerHTML = "";
      generateCards(filteredProjects);
    });
  });
}
generateBtnsFilter();
generateCards(projects);


// ========== Edition mode  ========== //

