window.addEventListener("DOMContentLoaded", e => {
    function check_winnder(player_moves){
        let winning_moves = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
                [1,4,7],
                [2,5,8],
                [3,6,9],
                [1,5,8],
                [3,5,7]
        ]
        winner = false;
        for(moves of winning_moves){
            for(let index=0; index<moves.length; index++){
                if(player_moves[index-1] == 0){
                    winner = false;
                    break;
                }
                if(index == 2){
                    winner = true;
                    break;
                }
            }
        }
        return winner;
    }
    let global_moves = [1,1,1,1,1,1,1,1,1];
    let x_moves = [0,0,0,0,0,0,0,0,0];
    let o_moves = [0,0,0,0,0,0,0,0,0];

    let turn = true; // x

    let buttons = document.querySelectorAll(".cell-img");
    buttons.forEach(button => {
        button.addEventListener("click", e => {
            let cell = e.target;
            let cell_id = Number(cell.dataset.pos);
            console.log(`You clicked on ${cell.id}`);
            if (global_moves[cell_id-1] == 1) {
                let x_is_winner = false;
                let o_is_winner = false;
                let image = document.querySelector(`#img-${cell_id}`);
                if (turn) {
                    cell.setAttribute("backgroundColor", "green");
                    image.setAttribute("src", "images/x.png");
                    x_moves[cell_id-1] = 1;
                    x_is_winner = check_winnder(x_moves);
                } else {
                    cell.setAttribute("backgroundColor", "green");
                    image.setAttribute("src", "images/o.png");
                    o_moves[cell_id-1] = 1;
                    o_is_winner = check_winnder(o_moves);
                }
                global_moves[cell_id-1] = 0;
                turn = !turn;
                if(x_is_winner){
                    console.log("X is winner");
                }
                if(o_is_winner){
                    console.log("O is winner");
                }
            } else {

            }
        });
    });
});