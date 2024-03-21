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
