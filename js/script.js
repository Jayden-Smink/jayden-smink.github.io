const projects = [
    {
        title: "Portfolio Website",
        description: "Mijn persoonlijke portfolio waarin ik mijn projecten en ontwikkeling laat zien.",
        image: "/img/portfolio-project.png",
        alt: "Screenshot van mijn portfolio website",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "#"
    },
    {
        title: "Smart Environment Dashboard",
        description: "Een dashboard voor het bekijken van actuele en historische sensorgegevens.",
        image: "/img/dashboard.png",
        alt: "Screenshot van het Smart Environment Dashboard",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "#"
    },
    {
        title: "Campus EventDesk",
        description: "Een databasesysteem voor het beheren van activiteiten, deelnemers en aanmeldingen.",
        image: "/img/eventdesk.png",
        alt: "Screenshot van Campus EventDesk",
        technologies: ["SQL", "UML"],
        link: "#"
    }
];

function renderProjects(projectList) {
    const projectsSection = document.querySelector(".projects");
    const template = document.querySelector("#project-template");

    if (!projectsSection || !template) {
        return;
    }

    const existingCards = projectsSection.querySelectorAll(".project-card");

    existingCards.forEach((card) => {
        card.remove();
    });

    projectList.forEach((project) => {
        const projectCard = template.content.cloneNode(true);

        const image = projectCard.querySelector(".project-image");
        const title = projectCard.querySelector(".project-title");
        const description = projectCard.querySelector(".project-description");
        const technologies = projectCard.querySelector(".project-technologies");
        const link = projectCard.querySelector(".project-link");

        image.src = project.image;
        image.alt = project.alt;

        title.textContent = project.title;
        description.textContent = project.description;

        link.href = project.link;

        project.technologies.forEach((technology) => {
            const technologyItem = document.createElement("li");

            technologyItem.textContent = technology;

            technologies.appendChild(technologyItem);
        });

        projectsSection.appendChild(projectCard);
    });
}

function filterProjects(filter) {
    if (filter === "Alle") {
        renderProjects(projects);
        return;
    }

    const filteredProjects = projects.filter((project) => {
        return project.technologies.includes(filter);
    });

    renderProjects(filteredProjects);
}

function setActiveFilter(selectedButton) {
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach((button) => {
        button.classList.remove("active-filter");
    });

    selectedButton.classList.add("active-filter");
}

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterProjects(filter);
            setActiveFilter(button);
        });
    });
}

function initializeProjectsPage() {
    const projectsSection = document.querySelector(".projects");

    if (!projectsSection) {
        return;
    }

    renderProjects(projects);
    setupProjectFilters();
}

initializeProjectsPage();