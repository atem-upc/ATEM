// Function to show a subpage by ID and title
function showSubpage(subpageId, subpageTitle) {
    const mainPage = document.getElementById("mainPage");
    const subPage = document.getElementById("subPage");
    const subPageTitle = document.getElementById("subPageTitle");

    if (!mainPage || !subPage || !subPageTitle) {
        console.error("Required elements not found.");
        return;
    }

    // Hide all subpages
    subPage.querySelectorAll(".subpage").forEach(subpage => subpage.classList.add("hidden"));

    mainPage.classList.add("hidden");
    subPage.classList.remove("hidden");

    const subpage = document.getElementById(subpageId);
    if (!subpage) {
        console.error("Subpage element not found.");
        return;
    }

    subpage.classList.remove("hidden");

    // Set the subPageTitle
    subPageTitle.textContent = subpageTitle;

    // Update the URL hash to reflect the current subpage
    window.location.hash = subpageId;
}

// Event listener for hashchange
window.addEventListener("hashchange", function() {
    const hash = window.location.hash;
    if (hash) {
        const subpageId = hash.slice(1); // Remove the '#' character
        let subpageTitle = ""; // Initialize subpageTitle

        // Define subpage titles based on subpageId
        const subpageTitles = {
            // Add more subpage titles here as needed
            "ParticipationSubpage": "Participation - Entraide",
            "l1Subpage": "Archives L1",
            "l2Subpage": "Archives L2",
            "l3Subpage": "Archives L3",
            "m1TroncSubpage": "Archives M1 Tronc commun",
            "m1MICSubpage": "Archives M1 MIC",
            "m1MIDSSubpage": "Archives M1 MIDS",
            "m1MFASubpage": "Archives M1 MFA",
            "m2TroncSubpage": "Archives M2 Tronc Commun",
            "m2MICSubpage": "Archives M2 MIC",
            "m2MIDSSubpage": "Archives M2 MIDS",
            "m2MFASubpage": "Archives M2 MFA",
        };

        // Set the subpageTitle based on subpageId
        subpageTitle = subpageTitles[subpageId] || "";

        showSubpage(subpageId, subpageTitle); // Show the corresponding subpage with subpageTitle
    } else {
        returnToMainPage(); // Go back to the main page if there is no hash
    }
});

// Function to return to the main page
function returnToMainPage() {
    const mainPage = document.getElementById("mainPage");
    const subPage = document.getElementById("subPage");

    mainPage.classList.remove("hidden");
    subPage.classList.add("hidden");
    subPage.querySelectorAll(".subpage").forEach(subpage => subpage.classList.add("hidden"));

    history.pushState(null, document.title, window.location.href.split('#')[0]);
    return false;
}

// Function to get the current year
function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
}

// Function to get the current date in a formatted string
function getCurrentDate() {
    const currentDate = new Date();
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
}

// Function to update the clock element with the current time
function updateClock() {
    const clockElement = document.getElementById("clockPlaceholder");

    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        if (hours < 10) {
            hours = "0" + hours; // Add leading zero for single-digit hours
        }
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        clockElement.textContent = timeString;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// Function to download a ZIP file
function downloadZip(zipFileName, zipFilePath) {
    const link = document.createElement("a");
    link.href = zipFilePath;
    link.download = zipFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to generate subpage content based on year ranges and main path
function generateSubpageContent(subpageId, subpageTitle, yearRanges, mainPath) {
    let content = `<div id="${subpageId}" class="hidden subpage">\n<ul>\n`;

    yearRanges.forEach(yearRange => {
        const [startYear, endYear] = yearRange;
        const archiveTitle = `Archive ${subpageTitle} [${startYear}-${endYear}]`;
        const zipFilename = `Archive ${subpageTitle} [${startYear}-${endYear}].zip`;
        const downloadLink = `${mainPath}/${subpageTitle}/Archive%20${subpageTitle}%20%5B${startYear}-${endYear}%5D.zip`;

        content += `<li><a class="link archives-item" onclick="downloadZip('${zipFilename}', '${downloadLink}')">${archiveTitle}</a></li>\n`;
    });

    content += '</ul>\n</div>\n';
    return content;
}