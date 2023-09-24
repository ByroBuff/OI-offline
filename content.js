function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
      var a = document.createElement("a"),
          url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
      }, 0);
  }
}

function addDownloadButton() {
  var button = document.createElement("button");
  button.textContent = "Save results to html";
  // add download-btn class
  button.classList.add("download-btn");
  
  // add html to page
  htmlToInsert = `
  <style>
    .download-btn {
      font-family: var(--secondary-font);
      background-color: #6917d040;
      color: #6917d0;
      border: none;
      padding: 20px;
      font-size: 30px;
      cursor: pointer;
      transition: 0.3s;
    }

    .download-btn:hover {
      background-color: #6917d0;
      color: #fff;
      transition: 0.3s;
    }
      
  </style>
  `
  document.body.insertAdjacentHTML('beforeend', htmlToInsert);

  button.addEventListener("click", function () {
      var before = `
      <link rel="stylesheet" href="https://osint.industries/assets/css/vendor/preloader.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/font-family.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/font-awesome.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/menu-engine.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/menu-grid.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/bootstrap.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/swiper.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/dynamic-slider.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/bricklayer.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/lightbox.min.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/vendor/aos.min.css" />
      
      <link rel="stylesheet" href="https://osint.industries//assets/css/theme.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/core.css" />
      <link rel="stylesheet" href="https://osint.industries//assets/css/main.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin />
      <link href="/assets/fontawesome/css/all.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css">
      <link rel="stylesheet" href="https://osint.industries/assets/css/map.css" />
      
      <style>
        body {
          background-color: #1b1a1f;
        }
      
        .container {
          position: absolute;
          transform: translate(-50%);
          left: 50%;
          top: 10%;
        }

        .warning {
          color: #dc3545 !important;
          text-align: center !important;
          text-transform: uppercase !important;
        }

        h4 {
          text-align: center !important;
        }
      </style>

      
      <body class="body">
          <div class="container">
          <h4 class="title gray-40 section-title-2 text-style-7 warning">WARNING: results may not be up to date</h4>
      `;

      var title = document.querySelector("#main > section:nth-child(2) > div > div > div > div.basic-intro.mb-5.text-center > h4")
      var content = document.querySelector("#main > section:nth-child(2) > div > div > div > div.row.g-4");

      var after = `
      </div>
      </body>
      `;

      content = content.innerHTML;
      // remove the "Save results to html" button
      content = content.replace(/<button class="download-btn">Save results to html<\/button>/g, "");

      download(before + title.outerHTML + "</br></br>" + content + after, title.textContent.replace("Results for ", "") + ".html", "text/html");
  });

  // Append at end of querySelector("#main > section:nth-child(2) > div > div > div > div.row.g-4")
  var content = document.querySelector("#main > section:nth-child(2) > div > div > div > div.row.g-4");
  content.appendChild(button);

}

console.log("done!")
// Call the function to add the download button when the page is loaded
addDownloadButton();
