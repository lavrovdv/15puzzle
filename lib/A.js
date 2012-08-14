function A(puzzle){
    var open_list = [new State(puzzle,null)];
    var close_list = [];
    var current = null;
    var terminate = new State(get_terminate_state(puzzle),null);

    while(open_list.length > 0){
        var start = new Date().getTime();
        console.log("open_list=" + open_list.length + "; close_list=" + close_list.length);
        if(is_terminate(open_list, terminate)){
            close_list.push(find(open_list, terminate));
            break;
        }
        current = get_current(open_list);
        close_list.push(current);
        remove_state(open_list,current);
        var neighbors = current.get_neighbors();

        for (var i = 0; i < neighbors.length; i++) {
            if(!list_include(close_list, neighbors[i])){
                if(!list_include(open_list, neighbors[i])){
                    open_list.push(neighbors[i]);
                }else{
                    var from_list = find(open_list, neighbors[i]);
                    if (from_list.G > neighbors[i].G){
                        from_list.parent = neighbors[i].parent;
                        from_list.get_G();
                    }
                }
            }
        }
    }

    var solution = [];
    var last = close_list[close_list.length - 1];
    solution.push(last.puzzle.slice(0));
    var parent = last.parent_state;
    while(parent != null){
        solution.push(parent.puzzle.slice(0));
        parent = parent.parent_state;
    }
    var end = new Date().getTime();

    console.log("time = "+((end-start)));
    console.log("solution = "+solution.length);
    return solution.reverse();

    function find(list, state){
        for (var i = 0; i < list.length; i++) {
            if(is_equal(list[i].puzzle, state.puzzle)){return list[i]}
        }
        return null;
    }

    function list_include(list, state){
        for (var i = 0; i < list.length; i++) {
            if(is_equal(list[i].puzzle, state.puzzle)){return true}
        }
        return false
    }

    function is_terminate(openlist, terminate){
        for(var i = 0; i < openlist.length; i++){
            if (is_equal(openlist[i].puzzle, terminate.puzzle)){ return true;}
        }
        return false;
    }
    /** Функция поиска состояния с наименьшей стоимостью**/
    function get_current(open_list){
        var min_F_state = open_list[0];
        for (var i = 1; i < open_list.length; i++) {
            if(min_F_state.F > open_list[i].F){min_F_state = open_list[i]; }
        }
        return min_F_state;
    }

    function remove_state(list, state){
        for (var i = 0; i < list.length; i++) {
            if(is_equal(list[i].puzzle, state.puzzle)){
                list.splice(i,1);
            }
        }
    }
}

function is_has_solution(puzzle_state){
    var p_st = puzzle_state.flatten();
    var e; // Номер ряда пустой клетки
    var N = 0; // колличество инверсий

    for (var i = 0; i < p_st.length; i++) {
        if (p_st[i] == 0) { e = get_line(i); }
        for (var j = i; j < p_st.length; j++) {
            if(p_st[i] > p_st[j] && p_st[j] != 0){ N++; }
        }
    }

//    console.log("e=" + e);
//    console.log("N=" + N);
    return ((e + N) % 2 == 0)
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


