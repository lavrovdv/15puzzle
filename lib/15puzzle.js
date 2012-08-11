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
    puzzle3 = [15,2,3,4,5,6,7,8,9,10,11,12,13,1,14,0];

    console.log(is_has_solution_flattent(puzzle2));
    console.log(is_has_solution_flattent(puzzle3));
});


//function is_has_solution_matrix(puzzle_state) {
//    var e; // Номер ряда пустой клетки
//    var N = 0; // колличество инверсий
//
//    for (var i = 0; i < puzzle_state.length; i++) {
//        for (var j = 0; j < puzzle_state[i].length; j++) {
//
//            if (puzzle_state[i][j] == 0) { e = i + 1; }
//            var current = puzzle_state[i][j];
//            for (var n = 0; n < puzzle_state.length; n++) {
//                for (var m = 0; m < puzzle_state[n].length; m++) {
//                    if (current > puzzle_state[n][m] && (n > i || (n == i && m > j)) && puzzle_state[n][m] != 0){ N++; }
//                }
//            }
//        }
//    }
//
//    console.log("e=" + e);
//    console.log("N=" + N);
//    return ((e + N) % 2 == 0)
//}

function is_has_solution(puzzle_state){
    var p_st = puzzle_state.flatten();
    var e; // Номер ряда пустой клетки
    var N = 0; // колличество инверсий

    for (var i = 0; i < p_st.length; i++) {
        if (p_st[i] == 0) { e = 1 + Math.floor(i / 4); }
        for (var j = i; j < p_st.length; j++) {
            if(p_st[i] > p_st[j] && p_st[j] != 0){ N++; }
        }
    }

    console.log("e=" + e);
    console.log("N=" + N);
    return ((e + N) % 2 == 0)
}

/**
 * Метод превращает многомерный массив в одномерный
 * @return {Array}
 */
Array.prototype.flatten = function () {
    var result = [];
    function isArray(x) {
        return ((typeof x == "object") && (x.constructor == Array));
    }
    function iter(array) {
        for (var i = 0; i < array.length; i++) {
            if (isArray(array[i])) {
                iter(array[i]);
            } else {
                result.push(array[i]);
            }
        }
    }
    iter(this);
    return result;
};
