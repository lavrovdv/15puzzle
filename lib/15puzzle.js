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
    puzzle3 = [1,2,3,4,5,0,7,8,9,10,11,12,13,14,15,6];

//    console.log(is_has_solution([1,7,2,0,5,6,4,8,9,10,11,12,13,14,15,3]));
//    manhattan_distance([1,7,2,3,5,6,4,8,9,10,11,12,13,14,15,0]);
    get_neighbors(puzzle3);
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
        if (p_st[i] == 0) { e = get_line(p_st,i); }
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
            manhattan += Math.abs(get_line(i) - get_line(p_st[i]-1)) + Math.abs(get_position(i) - get_position(p_st[i]-1));
        }
    }
    console.log("manhattan_distance = " + manhattan);
    return manhattan;
}

function get_neighbors(puzzle_state){
    var p_st = puzzle_state.flatten();
    var SIZE = 4;
    var neighbors_state = [];
    for (var i = 0; i < p_st.length; i++) {
        if(p_st[i] == 0){
            var line = get_line(i);
            var position = get_position(i);
            var n = [[line-1, position],[line, position+1],[line+1,position],[line,position-1]];

            for (var j = 0; j < n.length; j++) {
                if(n[j][0] > 0 && n[j][1] > 0 && n[j][0] <= SIZE && n[j][1] <= SIZE){
                    var neighbor_index = get_index(n[j][0] ,n[j][1]);
                    var zero_index = i;
                    var neighbor_value =  p_st[neighbor_index];
                    var n_st = p_st.slice(0);
                    n_st[neighbor_index] = 0;
                    n_st[zero_index] = neighbor_value;
                    neighbors_state.push(n_st);
                }
            }
        }
    }
    for (var i = 0; i < neighbors_state.length; i++) {
        console.log("neighbors_state["+i+"] = " + neighbors_state[i]);
    }

    return neighbors_state;
}

function get_terminate_state(puzzle_state){
    var p_st = puzzle_state.flatten();
    var t_st = [];
    for (var i = 1; i < p_st.length; i++) { t_st.push(i); }
    t_st.push(0);
    return t_st;
}

function get_line(index){
    return 1 + Math.floor((index / 4));
}

function get_position(index){
    return  1 + (index % 4);
}

function get_index(line, position){
    return ((line - 1) * 4 + position) - 1;
}

function is_valid(puzzle_state){
    var p_st = puzzle_state.flatten();
    if(p_st.length % 4 != 0 ){
        console.log("Data not valid");
        return false
    }

    for (var i = 0; i < p_st.length; i++) {
        if(p_st.indexOf(i) == -1) {
            console.log("Data not valid");
            return false;
        }
    }
    return true
}


