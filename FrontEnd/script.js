async function getProjects() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const projects = await reponse.json();

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    const sectionProjects = document.querySelector(".gallery");

    const viewProject = document.createElement("figure");
    const imageProject = document.createElement("img");

    const captionProject = document.createElement("figcaption");

    imageProject.src = project.imageUrl;
    captionProject.innerText = project.title;

    sectionProjects.appendChild(viewProject);
    viewProject.appendChild(imageProject);
    viewProject.appendChild(captionProject);
  }
}
getProjects();

// ===== Buttons filters  ===== //

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

const btnsFilters = document.querySelectorAll("button");
for (let i = 0; i < btnsFilters.length; i++) {
  const btn = btnsFilters[i];
  btn.addEventListener("click", (e) => {
    if (e.target === btnObjects) {
      console.log("objets");
    } else if (e.target === btnApparts) {
      console.log("Appartements");
    } else if (e.target === btnHotels) {
      console.log("hotels & restaurants");
    } else {
      console.log("all");
    }
  });
}
