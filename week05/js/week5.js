// Get current year for copyright information.
let d = new Date()
var year = d.getFullYear();
document.getElementById("copyrightdate").textContent = year;

// Get last modified date of current document.

var lastmod = document.lastModified;
document.getElementById("modifieddate").textContent = lastmod;