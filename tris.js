window.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM Loaded");
    let freeCells = [1,1,1,1,1,1,1,1,1];
    
    let firstPlayerMoves = [];
    let secondPlayerMoves = [];
    let turn = true;

    function checkWinner(playerMoves){
        const winnerCellsCombinations = [
            new Set([1,2,3]),
            new Set([4,5,6]),
            new Set([7,8,9]),
            new Set([1,4,7]),
            new Set([2,5,8]),
            new Set([3,6,9]),
            new Set([1,5,9]),
            new Set([3,5,7])
        ];

        for(const elem of winnerCellsCombinations){
            const intersection = new Set([...elem].filter((x) => playerMoves.has(x)));
            const intersectionEntries = Array.from(intersection);
            const winningEntries = Array.from(elem);
            if(intersectionEntries.toString() === winningEntries.toString()){
                return true;
            }
        }
        return false;
    }

    let cells = document.querySelectorAll(".tris-cell");
    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            const button = e.currentTarget;
            const buttonIndex = Number(button.id);
            let winner = false;
            if(freeCells[buttonIndex-1] == 1){
                console.log(`Clicked on ${buttonIndex}`);
                // we need to create a new node for X or O img
                let img_node = document.querySelector(`#img-${buttonIndex}`);
                if(turn){
                    // O
                    img_node.setAttribute("src", "images/o.png");
                    button.style.color = "black";
                    button.style.backgroundColor = "red";
                    button.appendChild(img_node);
                    firstPlayerMoves.push(buttonIndex);
                    winner = checkWinner(new Set(firstPlayerMoves));
                }
                else {
                    // X
                    button.style.color = "black";
                    img_node.setAttribute("src", "images/x.png");
                    button.appendChild(img_node);
                    button.style.backgroundColor = "green";
                    secondPlayerMoves.push(buttonIndex);
                    winner = checkWinner(new Set(secondPlayerMoves));
                }
                freeCells[buttonIndex-1] = 0;
            }
            if(winner){
                let mainContainer = document.querySelector("#main");
                mainContainer.style.display = "none";
            }
            turn = !turn;
        });
    });
});