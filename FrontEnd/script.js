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

      const sectionFilters = document.querySelector(".btn-filters");

      const btnAll = document.createElement("button");
      const btnObjects = document.createElement("button");
      const btnApparts = document.createElement("button");
      const btnHotels = document.createElement("button");

      btnAll.innerText = "Tous";
      btnObjects.innerText = "Objets";
      btnApparts.innerText = "Appartements";
      btnHotels.innerText = "Hôtels & restaurants";

      sectionFilters.appendChild(btnAll);
      sectionFilters.appendChild(btnObjects);
      sectionFilters.appendChild(btnApparts);
      sectionFilters.appendChild(btnHotels);
// ========== FILTERS FUNCTIONS ========== //

  const btnsFilters = document.querySelectorAll("button");
  for (let i = 0; i < btnsFilters.length; i++) {
    const btn = btnsFilters[i];
      btn.addEventListener("click", (e) => {
          if (e.target === btnObjects) {
        const objectsFilter = projects.filter(function (project) {
          return project.category.name === "Objets";
        });
        document.querySelector(".gallery").innerHTML = "";
        generateCards(objectsFilter);
      } else if (e.target === btnApparts) {
        const appartsFilter = projects.filter(function (project) {
          return project.category.name === "Appartements";
        });
        document.querySelector(".gallery").innerHTML = "";
        generateCards(appartsFilter);
      } else if (e.target === btnHotels) {
        const hotelsFilter = projects.filter(function (project) {
          return project.category.name === "Hotels & restaurants";
        });
        document.querySelector(".gallery").innerHTML = "";
        generateCards(hotelsFilter);
          } else {
        document.querySelector(".gallery").innerHTML = "";
        generateCards(projects);
      }
    });
  }
generateCards(projects);
