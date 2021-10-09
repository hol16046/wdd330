const squares = document.getElementsByClassName('square');

var index = 0;

document.querySelectorAll('.square').forEach(item => {
    item.addEventListener('click', event => {
            if(index % 2 == 0) {
                item.innerHTML = "X";
            }
            else {
                item.innerHTML = "O";

            }
            index++;
        }
    )
});

function reset() {
    document.querySelectorAll('.square').forEach(item => {
        item.innerHTML = "";
    })
};