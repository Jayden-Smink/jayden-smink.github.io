const projects = [
    {
        title: "Portfolio Website",
        description: "Mijn persoonlijke portfolio waarin ik mijn projecten en ontwikkeling laat zien.",
        image: "/img/portfolio-project.png",
        alt: "Screenshot van mijn portfolio website",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/Jayden-Smink/jayden-smink.github.io"
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

function toggleBlogPost(button) {
    const contentId = button.getAttribute("aria-controls");
    const content = document.getElementById(contentId);

    if (!content) {
        return;
    }

    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    content.hidden = isOpen;

    if (isOpen) {
        button.textContent = "Lees meer";
    } else {
        button.textContent = "Lees minder";
    }
}

function setupBlogPosts() {
    const blogButtons = document.querySelectorAll(".blog-toggle");

    blogButtons.forEach((button) => {
        button.addEventListener("click", () => {
            toggleBlogPost(button);
        });
    });
}

function setupContactForm() {
    const form = document.querySelector("#contact-form");

    if (!form) {
        return;
    }

    const velden = [
        {
            id: "naam",
            boodschap: "Vul minimaal 2 tekens in."
        },
        {
            id: "email",
            boodschap: "Vul een geldig e-mailadres in."
        },
        {
            id: "bericht",
            boodschap: "Schrijf minimaal 10 tekens."
        }
    ];

    function valideerVeld(veld) {
        const input = document.querySelector(`#${veld.id}`);
        const foutmelding = document.querySelector(`#${veld.id}-error`);

        if (!input || !foutmelding) {
            return false;
        }

        const geldig = input.checkValidity();

        input.setAttribute("aria-invalid", String(!geldig));
        foutmelding.textContent = geldig ? "" : veld.boodschap;

        return geldig;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const resultaten = velden.map((veld) => {
            return valideerVeld(veld);
        });

        const alleGeldig = resultaten.every(Boolean);
        const status = document.querySelector("#form-status");

        if (!status) {
            return;
        }

        if (!alleGeldig) {
            status.textContent = "Er zijn nog fouten in het formulier.";
            return;
        }

        status.textContent = "Formulier succesvol ingevuld!";
        form.reset();

        velden.forEach((veld) => {
            const input = document.querySelector(`#${veld.id}`);
            const foutmelding = document.querySelector(`#${veld.id}-error`);

            if (input) {
                input.setAttribute("aria-invalid", "false");
            }

            if (foutmelding) {
                foutmelding.textContent = "";
            }
        });
    });
}

const weatherApiKey = "de5da7d85896d614764c960586e98549";

async function loadWeather() {
    const weatherData = document.querySelector("#weather-data");
    const weatherStatus = document.querySelector("#weather-status");

    if (!weatherData || !weatherStatus) {
        return;
    }

    weatherData.textContent = "";
    weatherStatus.textContent = "Weergegevens laden...";

    try {
        const response = await fetch(
            `https://api.weatherstack.com/current?access_key=${weatherApiKey}&query=The%20Hague&units=m`
        );

        if (!response.ok) {
            throw new Error("De API kon niet worden bereikt.");
        }

        const data = await response.json();

        console.log(data);

        if (data.error) {
            throw new Error(data.error.info);
        }

        showWeather(data);
        weatherStatus.textContent = "";
    } catch (error) {
        weatherStatus.textContent = "Het weer kon niet worden geladen.";
        console.error("Weatherstack fout:", error);
    }
}

function showWeather(data) {
    const weatherData = document.querySelector("#weather-data");

    if (!weatherData) {
        return;
    }

    weatherData.textContent = "";

    const temperature = document.createElement("p");
    temperature.textContent = `${data.current.temperature} °C`;

    const description = document.createElement("p");
    description.textContent = data.current.weather_descriptions[0];

    const humidity = document.createElement("p");
    humidity.textContent = `Luchtvochtigheid: ${data.current.humidity}%`;

    const wind = document.createElement("p");
    wind.textContent = `Windsnelheid: ${data.current.wind_speed} km/u`;

    weatherData.append(
        temperature,
        description,
        humidity,
        wind
    );
}

initializeProjectsPage();
setupBlogPosts();
setupContactForm();
loadWeather();