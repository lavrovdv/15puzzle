$(function(){
    // пустая клетка обознаяается как 0
    puzzle1 = [[1,2,3,4],
              [5,6,7,8],
              [9,10,11,12],
              [13,14,15,0]];

    puzzle2 = [[15,2,3,4],
                [5,6,7,8],
                [9,10,11,12],
                [13,1,14,0]];

    console.log(is_has_solution(puzzle1));
    console.log(is_has_solution(puzzle2));
});


function is_has_solution(puzzle_state) {
    var e; // Номер ряда пустой клетки
    var N = 0; // колличество инверсий

    for (var i = 0; i < puzzle_state.length; i++) {
        for (var j = 0; j < puzzle_state[i].length; j++) {

            if (puzzle_state[i][j] == 0) { e = i + 1; }

            var current = puzzle_state[i][j];
            for (var n = 0; n < puzzle_state.length; n++) {
                for (var m = 0; m < puzzle_state[n].length; m++) {

                    if (current > puzzle_state[n][m] && (n > i || (n == i && m > j)) && puzzle_state[n][m] != 0){ N++; }
                }
            }
        }
    }

    console.log("e=" + e);
    console.log("N=" + N);
    return ((e + N) % 2 == 0)
}

