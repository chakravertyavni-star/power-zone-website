

const amenitiesData = [
    {
        id: "cardio",
        title: "Cardio Zone",
        description:
            "High-performance treadmills, bikes, and cross trainers designed for endurance and fat loss.",
        url: "templates-amenities/cardio.html"
    },
    {
        id: "strength",
        title: "Strength Training",
        description:
            "Power racks, free weights, and advanced machines built for serious strength development.",
        url: "templates-amenities/strength.html"
    },
    {
        id: "trainers",
        title: "Personal Training",
        description:
            "One-on-one coaching with certified trainers tailored to your fitness goals.",
        url: "templates-amenities/personal-trainer.html"
    },
    {
        id: "classes",
        title: "Group Classes",
        description:
            "Instructor-led HIIT, yoga, functional training, and strength circuits.",
        url: "templates-amenities/classes.html"
    },
    {
        id: "functional",
        title: "Functional Zone",
        description:
            "Agility, kettlebells, ropes, and mobility-focused functional training space.",
        url: "templates-amenities/functional.html"
    },

    {
        id: "mobility",
        title: "Stretch & Mobility",
        description:
            "Dedicated recovery space for stretching, foam rolling, and improving flexibility after workouts.",
        url: "templates-amenities/mobility.html"
    },

    {
        id: "locker",
        title: "Locker Rooms",
        description:
            "Spacious locker rooms with secure storage, showers, and modern facilities.",
        url: "templates-amenities/locker.html"
    },
    {
        id: "recovery",
        title: "Steam & Recovery",
        description:
            "Relax and recover with steam therapy designed to relieve muscle tension.",
        url: "templates-amenities/recovery.html"
    },

    {
        id: "nutrition",
        title: "Nutrition Support",
        description:
            "Personalized nutrition guidance to complement your training and recovery.",
        url: "templates-amenities/nutrition.html"

    },

];






document.addEventListener("click", function (e) {
    const link = e.target.closest("a[data-template]");
    if (!link) return;

    e.preventDefault();

    const templateId = link.dataset.template;

    const amenity = amenitiesData.find(
        item => item.id === templateId
    );

    if (!amenity) {
        console.warn("Amenity not found:", templateId);
        return;
    }

    // Redirect to template page
    window.location.href = amenity.url;
});
