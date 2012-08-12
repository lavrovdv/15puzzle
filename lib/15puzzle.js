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

    console.log(is_has_solution([1,7,2,0,5,6,4,8,9,10,11,12,13,14,15,3]));
    manhattan_distance([1,7,2,3,5,6,4,8,9,10,11,12,13,14,15,0]);
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

function manhattan_distance(puzzle_state){
    var p_st = puzzle_state.flatten();
    var manhattan = 0;
    var t_st = get_terminate_state(p_st);
    for (var i = 0; i < p_st.length; i++) {
        if (p_st[i] != t_st[i] && p_st[i] != 0){
            var s_line = 1 + Math.floor((i / 4));            //console.log("s_line="+s_line);      // номер строки из текущего состояния
            var t_line = 1 + Math.floor(((p_st[i]-1) / 4));  //console.log("t_line="+t_line);      // номер строки из терминального состояния
            var s_position = 1 + (i % 4);                    //console.log("s_position="+s_position);
            var t_position = 1 + ((p_st[i]-1) % 4);          //console.log("t_position="+t_position);

            manhattan += Math.abs(s_line - t_line) + Math.abs(s_position - t_position);
            console.log(Math.abs(s_line - t_line) + Math.abs(s_position - t_position));
        }
    }
    console.log("manhattan_distance = " + manhattan);
    return manhattan;
}

function get_terminate_state(puzzle_state){
    var p_st = puzzle_state.flatten();
    var t_st = [];
    for (var i = 1; i < p_st.length; i++) { t_st.push(i); }
    t_st.push(0);
    console.log("terminate_state=" + t_st);
    return t_st;
}


function get_line(state, position, value){
    for (var i = 0; i < state.length; i++) {
        if(state[i] == value){return 1 + Math.floor((i / 4));}
    }
    return null;
}

function get_position(state, position, value){
    for (var i = 0; i < state.length; i++) {
        if(state[i] == value){return  1 + (i % 4);}
    }
    return null;
}


