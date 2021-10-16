// Dynamic Table of Contents
const links = [
    {
        label:'Week 1',
        url: 'week01'
    },
    {
        label:'Week 2',
        url: 'week02'
    },
    {
        label:'Week 3',
        url: 'week03'
    },
    {
        label:'Week 4',
        url: 'week04'
    },
    {
        label:'Week 5',
        url: 'week05'
    }
];

links.forEach(tableOfContents);
function tableOfContents(link) {
    document.getElementById('toc').innerHTML += "<li>" + "<a href='" + link.url + "'>" + link.label + "</li>";
}

// Get current year for copyright information.
let d = new Date()
var year = d.getFullYear();
document.getElementById("copyrightdate").textContent = year;

// Get last modified date of current document.

var lastmod = document.lastModified;
document.getElementById("modifieddate").textContent = lastmod;

// Page Visit Count (LocalStorage)
if (localStorage) {
    let visits = localStorage.getItem('visits');
    if (visits == null) {
        visits = 1;
    }
    if (visits == 1) {
        document.getElementById('visitCount').innerHTML = "This is your first visit to this page.";
    } else {
        document.getElementById('visitCount').innerHTML = `You have visited this page ${visits} times.`;
    }
    localStorage.setItem('visits', Number(visits) + 1);
}