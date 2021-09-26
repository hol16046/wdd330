document.getElementById("button").addEventListener('click', event => {
    calculate();
});

function calculate () {
    var input = document.getElementById("input").value;
    var output = document.getElementById("result");
    output.innerHTML = input;
}