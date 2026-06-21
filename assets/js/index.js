let todayInSpace = document.querySelector("#today-in-space");
let launches = document.querySelector("#launches-grid");
let top2 = document.querySelector(".top");
let section = document.querySelectorAll("section");
let planetsgrid = document.querySelector("#planets-grid");
let planetDetailname = document.querySelector("#planet-detail-name");
let planetComparisonTbody = document.querySelector("#planet-comparison-tbody");
let sec = document.querySelector(".sec");
let gridPlan = document.querySelector(".grid-plan");
let nav = document.querySelectorAll("nav a");

for (let i = 0; i < nav.length; i++) {
  nav[i].addEventListener("click", function (e) {
    for (let s = 0; s < nav.length; s++) {
      nav[s].classList.remove("bg-blue-500/10");
    }
    e.currentTarget.classList.add("bg-blue-500/10");
    for (let a = 0; a < section.length; a++) {
      section[a].classList.add("hidden");

      if (e.currentTarget.getAttribute("data-section") === section[i].id) {
        section[i].classList.remove("hidden");
      }
    }
  });
}

async function data() {
  try {
    let response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=By2zbbMtICwtP3rpTmRhBa73ykFAn1Oc5scRHruN",
    );
    var alldata = await response.json();
    display(alldata);
  } catch (error) {
    console.log(error);
  }
}
data();

function display(alldata) {
  todayInSpace.innerHTML = `
  
          <div class="max-w-7xl  mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div class="sec-date">
            <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
              Today in Space
            </h2>
            <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
              Astronomy Picture of the Day - ${alldata.date}
            </p>
          </div>
          <div class="flex items-center space-x-2 md:space-x-3">
            <label for="apod-date-input" class="date-input-wrapper">
              <input type="date" id="apod-date-input" class="custom-date-input" value="${alldata.date}" max=""
                min="1995-06-16" />
              <span class="text-sm">${alldata.date}</span>
            </label>
            <button id="load-date-btn"
              class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2">
              <i class="fas fa-search"></i>
              <span class="hidden sm:inline">Load</span>
            </button>
            <button id="today-apod-btn"
              class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm">
              Today
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div class="xl:col-span-2">
            <div id="apod-image-container"
              class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center">
              <div id="apod-loading" class="text-center hidden">
                <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
                <p class="text-slate-400">Loading today's image...</p>
              </div>
              <img id="apod-image" class="w-full h-full object-cover" src="${alldata.url}"
                alt="Astronomy Picture of the Day" />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="absolute bottom-6 left-6 right-6">
                  <button
                    class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors">
                    <i class="fas fa-expand mr-2"></i>View Full Resolution
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-4 md:space-y-6">
            <div class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6">
              <h3 id="apod-title" class="text-lg md:text-2xl font-semibold mb-3 md:mb-4">
                ${alldata.title}
              </h3>
              <div class="flex items-center space-x-4 mb-4 text-sm text-slate-400">
                <span id="apod-date-detail"><i class="far fa-calendar mr-2"></i>${alldata.date}</span>
              </div>
              <p id="apod-explanation" class="text-slate-300 leading-relaxed mb-4">
                        ${alldata.explanation}              </p>
              <div id="apod-copyright" class="text-xs text-slate-400 italic mb-4">
                &copy; copyright: ${alldata.copyright}
              </div>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-3 flex items-center">
                <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                Image Details
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-400">Date</span>
                  <span id="apod-date-info" class="font-medium">${alldata.date}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Media Type</span>
                  <span id="apod-media-type" class="font-medium">${alldata.media_type}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Source</span>
                  <span class="font-medium">NASA APOD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  
  `;
}
async function dataTwo() {
  try {
    let response = await fetch(
      "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10",
    );

    var bigdata = await response.json();
    Getdata(bigdata);
  } catch (error) {
    console.log(error);
  }
}
dataTwo();
function Getdata(bigdata) {
  top2.innerHTML = `
                  <div class="flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <span
                      class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                      <i class="fas fa-star"></i>
                      Featured Launch
                    </span>
                    <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                      ${bigdata.results[0].status.abbrev}
                    </span>
                  </div>
                  <h3 class="text-3xl font-bold mb-3 leading-tight">
                    ${bigdata.results[0].name}
                  </h3>
                  <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-building"></i>
                      <span>${bigdata.results[0].launch_service_provider.name}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i class="fas fa-rocket"></i>
                      <span>${bigdata.results[0].name.slice(0, 8)}</span>
                    </div>
                  </div>
                  <div
                    class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
                    <i class="fas fa-clock text-2xl text-blue-400"></i>
                    <div>
                      <p class="text-2xl font-bold text-blue-400">2</p>
                      <p class="text-xs text-slate-400">Days Until Launch</p>
                    </div>
                  </div>
                  <div class="grid xl:grid-cols-2 gap-4 mb-6">
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-calendar"></i>
                        Launch Date
                      </p>
                      <p class="font-semibold">${bigdata.results[0].window_start}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-clock"></i>
                        Launch Time
                      </p>
                      <p class="font-semibold">${bigdata.results[0].window_start.slice(11, 16)} AM UTC </p>
                    </div>
                    <div class="bg-slate-900/50 w-full rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-map-marker-alt"></i>
                        Location
                      </p>
                      <p class="font-semibold text-sm">${bigdata.results[0].pad.location.name}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-globe"></i>
                        Country
                      </p>
                      <p class="font-semibold">${bigdata.results[0].pad.country.name}</p>
                    </div>
                  </div>
                  <p class="text-slate-300 leading-relaxed mb-6">
                  ${bigdata.results[0].mission.description}
                  </p>
                </div>
                <div class="flex flex-col md:flex-row gap-3">
                  <button
                    class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                    <i class="fas fa-info-circle"></i>
                    View Full Details
                  </button>
                  <div class="icons self-end md:self-center">
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <i class="fas fa-bell"></i>
                    </button>
                  </div>
                </div>
              </div>
            <img class="h-full rounded-3xl" src="${bigdata.results[0].image.image_url}" alt="photo">
    `;

  var box = " ";
  for (let i = 1; i < bigdata.results.length; i++) {
    box += `
              <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden">
             <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${bigdata.results[i].image.image_url}" alt="">
              
              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                  Go
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="mb-3">
                <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  ${bigdata.results[i].name}
                </h4>
                <p class="text-sm text-slate-400 flex items-center gap-2">
                  <i class="fas fa-building text-xs"></i>
                  ${bigdata.results[i].launch_service_provider.name}
                </p>
              </div>
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-calendar text-slate-500 w-4"></i>
                  <span class="text-slate-300">${bigdata.results[i].net.slice(0, 10)}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-clock text-slate-500 w-4"></i>
                  <span class="text-slate-300">${bigdata.results[i].net.slice(11, 16)} AM UTC</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-rocket text-slate-500 w-4"></i>
                  <span class="text-slate-300">${bigdata.results[i].rocket.configuration.name}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                  <span class="text-slate-300 line-clamp-1">${bigdata.results[i].pad.location.name}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button
                  class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                  Details
                </button>
                <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <i class="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>

    
    
    `;
  }
  launches.innerHTML = box;
}

async function DataThree() {
  try {
    let response = await fetch(
      "https://solar-system-opendata-proxy.vercel.app/api/planets",
    );
    var alldata = await response.json();
    planets(alldata);
  } catch (error) {
    console.log(error);
  }
}
DataThree();
function planets(alldata) {
  var box = "";

  for (let i = 0; i < alldata.bodies.length; i++) {
    box += `
              <div
            class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group" data-index=${i}
            data-planet-id="mercury" style="--planet-color: #eab308" onmouseover="this.style.borderColor='#05040180'"
            onmouseout="this.style.borderColor='#334155'">
            <div class="relative mb-3 h-24 flex items-center justify-center">
              <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                src="${alldata.bodies[i].image}" />
            </div>
            <h4 class="font-semibold text-center text-sm">${alldata.bodies[i].englishName}</h4>
            <p class="text-xs text-slate-400 text-center">0.39 AU</p>
          </div>

    
    
    `;
  }
  planetsgrid.innerHTML = box;

  let planetcard = document.querySelectorAll(".planet-card");
  planetcard.forEach((element) => {
    element.addEventListener("click", function (e) {
      let index = this.getAttribute("data-index");

      // if (alldata.bodies[index].moons === null) {
      //   console.log(alldata.bodies[index].moons.length);
      // }

      sec.innerHTML = `
          <div
            class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
            <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
              <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                <img id="planet-detail-image" class="w-full h-full object-contain" src="${alldata.bodies[index].image}"
                  alt="earth planet detailed realistic render with clouds and continents" />
              </div>
              <div class="flex-1 sec">
                <div class="flex items-center justify-between mb-3 md:mb-4">
                  <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                    ${alldata.bodies[index].englishName}
                  </h3>
                  <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <i class="far fa-heart"></i>
                  </button>
                </div>
                <p id="planet-detail-description"
                  class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  ${alldata.bodies[index].description}
                </p>
              </div>
            </div>
            <div class="grid grid-plan grid-cols-2 gap-2 md:gap-4 mt-4">
              <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-ruler text-xs"></i>
                  <span class="text-xs">Semimajor Axis</span>
                </p>
                <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                  ${alldata.bodies[index].semimajorAxis}M km
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-circle"></i>
                  Mean Radius
                </p>
                <p id="planet-radius" class="text-lg font-semibold">
                   ${alldata.bodies[index].meanRadius.toFixed(2)}M km
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-weight"></i>
                  Mass
                </p>
                <p id="planet-mass" class="text-lg font-semibold">
                  ${alldata.bodies[index].mass.massValue} × 10^${alldata.bodies[index].mass.massExponent} kg
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-compress"></i>
                  Density
                </p>
                <p id="planet-density" class="text-lg font-semibold">
                  ${alldata.bodies[index].density} g/cm³
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-sync-alt"></i>
                  Orbital Period
                </p>
                <p id="planet-orbital-period" class="text-lg font-semibold">
                  ${alldata.bodies[index].sideralOrbit} days
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-redo"></i>
                  Rotation Period
                </p>
                <p id="planet-rotation" class="text-lg font-semibold">
                  ${alldata.bodies[index].sideralRotation} days
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-moon"></i>
                  Moons
                </p>
                <p id="planet-moons" class="text-lg font-semibold">${alldata.bodies[index].moons ? alldata.bodies[index].moons.length : "0"}
                 </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-arrows-alt-v"></i>
                  Gravity
                </p>
                <p id="planet-gravity" class="text-lg font-semibold">
                  ${alldata.bodies[index].gravity} m/s²
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-6">
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                Discovery Info
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Discovered By</span>
                  <span id="planet-discoverer" class="font-semibold text-right">${alldata.bodies[index].discoveredBy ? alldata.bodies[index].discoveredBy : "Known since antiquity"}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Discovery Date</span>
                  <span id="planet-discovery-date" class="font-semibold">${alldata.bodies[index].discoveryDate ? alldata.bodies[index].discoveryDate : "Ancient times"}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Body Type</span>
                  <span id="planet-body-type" class="font-semibold">${alldata.bodies[index].bodyType} </span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-400">Volume</span>
                  <span id="planet-volume" class="font-semibold">${alldata.bodies[index].vol.volValue} 10^${alldata.bodies[index].vol.volExponent} kg</span>  
                </div>
              </div>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                Quick Facts
              </h4>
              <ul id="planet-facts" class="space-y-3 text-sm">
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">${alldata.bodies[index].mass.massValue} × 10^${alldata.bodies[index].mass.massExponent} kg</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Surface gravity: ${alldata.bodies[index].gravity}  m/s²</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Density: ${alldata.bodies[index].density} g/cm³</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Axial tilt: ${alldata.bodies[index].axialTilt} °</span>
                </li>
              </ul>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-satellite text-blue-400 mr-2"></i>
                Orbital Characteristics
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Perihelion</span>
                  <span id="planet-perihelion" class="font-semibold">${alldata.bodies[index].perihelion} km</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Aphelion</span>
                  <span id="planet-aphelion" class="font-semibold">${alldata.bodies[index].aphelion} km</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Eccentricity</span>
                  <span id="planet-eccentricity" class="font-semibold">${alldata.bodies[index].eccentricity} km</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Inclination</span>
                  <span id="planet-inclination" class="font-semibold">${alldata.bodies[index].inclination}°</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Axial Tilt</span>
                  <span id="planet-axial-tilt" class="font-semibold">${alldata.bodies[index].axialTilt}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Avg Temperature</span>
                  <span id="planet-temp" class="font-semibold">${alldata.bodies[index].avgTemp}°C</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-400">Escape Velocity</span>
                  <span id="planet-escape" class="font-semibold">${alldata.bodies[index].escape} km/s</span>
                </div>
              </div>
            </div>
            <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              <i class="fas fa-book mr-2"></i>Learn More
            </button>
          </div>
      `;
    });
  });
  for (let i = 0; i < alldata.bodies.length; i++) {
    planetComparisonTbody.innerHTML += `
                      <tr class="hover:bg-slate-800/30 transition-colors">
                    <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
                      <div class="flex items-center space-x-2 md:space-x-3">
                        <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color: #f97316">
                        </div>
                        <span class="font-semibold text-sm md:text-base whitespace-nowrap">${alldata.bodies[i].englishName}</span>
                      </div>
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                ${(alldata.bodies[i].semimajorAxis / 149597870.7).toFixed(2)} AU
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${alldata.bodies[i].meanRadius * 2}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${(
                        (alldata.bodies[i].mass.massValue *
                          10 ** alldata.bodies[i].mass.massExponent) /
                        (5.9722 * 10 ** 24)
                      ).toFixed(3)}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                ${(alldata.bodies[i].sideralOrbit / 365.25).toFixed(1)} years
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${alldata.bodies[i].moons ? alldata.bodies[i].moons.length : 0}

                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span class="px-2 py-1 rounded text-xs bg-orange-500/50 text-orange-200">${alldata.bodies[i].type}</span>
                    </td>
                  </tr>

    
    `;
  }
}
