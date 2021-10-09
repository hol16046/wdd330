var index = 0;

document.querySelectorAll('.square').forEach(item => {
    item.addEventListener('touchend', event => {
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

// const container=document.getElementById("container");
// let player_one_turn = true;
// container.addEventListener('click', event => {
//     if(player_one_turn == true) {
//         event.target.innerHTML = "X";
//         player_one_turn = false;
//     } else {
//         event.target.innerHTML = "O";
//         player_one_turn = true;
//     }
// })

function reset() {
    document.querySelectorAll('.square').forEach(item => {
        item.innerHTML = "";
    })
}

