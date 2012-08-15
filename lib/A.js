//function A(puzzle){
//    var open_list = {};
//    var start_state = new State(puzzle,null);
//    open_list[start_state.hash] = start_state;
//    var close_list = {};
//    var current = null;
//    var terminate = new State(get_terminate_state(), null);
//    var start = new Date().getTime();
//    var min_F_state = [[start_state.F, start_state.hash]];
//
//    while(Object.keys(open_list).length > 0){
//        if(open_list[terminate.hash]){
//            close_list['last'] = open_list[terminate.hash];
//            break;
//        }
//        current = open_list[min_F_state[0][1]];
//        close_list[current.hash] = current;
//        delete open_list[current.hash];
//        min_F_state.shift();
//        var neighbors = current.get_neighbors();
//
//        for (var i = 0; i < neighbors.length; i++) {
//            if(!close_list[neighbors[i].hash]){
//                if(!open_list[neighbors[i].hash]){
//                    open_list[neighbors[i].hash] = neighbors[i];
//                    min_F_state.push([neighbors[i].F, neighbors[i].hash]);
//                    sort();
//                }else{
//                    var from_list = open_list[neighbors[i].hash];
//                    if (from_list.G > neighbors[i].G){
//                        from_list.parent_state = neighbors[i].parent;
//                        from_list.set_G();
//                    }
//                }
//            }
//        }
//    }
//
//    var solution = [];
//    var last = close_list['last'];
//    solution.push(last.puzzle.slice(0));
//    var parent = last.parent_state;
//    while(parent != null){
//        solution.push(parent.puzzle.slice(0));
//        parent = parent.parent_state;
//    }
//    var end = new Date().getTime();
//
//    console.log("time = "+((end-start)/1000));
//    console.log("open_list=" + Object.keys(open_list).length + "; close_list=" + Object.keys(close_list).length);
//    console.log("solution = "+ solution.length);
//    return solution.reverse();
//
//    function sort(){
//        min_F_state.sort(function(a,b){return (a[0] == b[0]) ? 0 : (a[0] < b[0]) ? -1 : 1;});
//    }
//}

function A(puzzle){
    var start_state = new State(puzzle, null);
//    var open_list = [start_state];
//    var close_list = [];
    var current = null;
    var terminate = new State(get_terminate_state(puzzle),null);
    var start = new Date().getTime();
    var open_list_hash = {};
    var close_list_hash = {};
    open_list_hash[start_state.hash] = start_state;
    var open_list_size = 1;
    var min_F_state = [[start_state.F, start_state.hash]];


    while(open_list_size > 0){
        if(open_list_hash[terminate.hash]){
            close_list_hash['last'] = open_list_hash[terminate.hash];
            break;
        }
        current = get_current(min_F_state);
        close_list_hash[current.hash] = current;

        open_list_size--;
        delete open_list_hash[current.hash];
        remove_state(current);
        var neighbors = current.get_neighbors();

        for (var i = 0; i < neighbors.length; i++) {
            if(!close_list_hash[neighbors[i].hash]){
                if(!open_list_hash[neighbors[i]]){
                    open_list_hash[neighbors[i].hash] = neighbors[i];
                    open_list_size++;
                    min_F_state.push([neighbors[i].F, neighbors[i].hash]);
                }else{
                    var from_list = open_list_hash[neighbors[i].hash];
                    if (from_list.G < neighbors[i].G){
                        from_list.parent_state = current;
                        from_list.set_G();
                    }
                }
            }
        }
    }

    var solution = close_list_hash['last'].get_solution();

    var end = new Date().getTime();
    console.log("time = " + ((end-start)/1000));
//    console.log("open_list=" + open_list.length + "; close_list=" + close_list.length);
    console.log("solution = " + solution.length);
    return solution;

//    function find(list, state){
//        for (var i = 0; i < list.length; i++) {
//            if((list[i].zero_index == state.zero_index) && (is_equal(list[i].puzzle, state.puzzle))){return list[i]}
//        }
//        return null;
//    }
//
//    function list_include(list, state){
//        for (var i = 0; i < list.length; i++) {
//            if((list[i].zero_index == state.zero_index) && (is_equal(list[i].puzzle, state.puzzle))){return true}
//        }
//        return false
//    }
//
    function list_include_by_hash(hash_list, state){
         return  hash_list[state.hash];
    }
//
//    function is_terminate(openlist, terminate){
//        for(var i = 0; i < openlist.length; i++){
//            if ((openlist[i].zero_index == terminate.zero_index) && (is_equal(openlist[i].puzzle, terminate.puzzle))){ return true;}
//        }
//        return false;
//    }
    /** Функция поиска состояния с наименьшей стоимостью**/
//    function get_current(open_list){
//        var min_F_state = open_list[0];
//        for (var i = 1; i < open_list.length; i++) {
//            if(min_F_state.F > open_list[i].F){min_F_state = open_list[i]; }
//        }
//        return min_F_state;
//    }
    function get_current(min_F_state){
        var min_F = min_F_state[0];
        for (var i = 1; i < min_F_state.length; i++) {
            if(min_F[0] > min_F_state[i][0]){min_F = min_F_state[i]; }
        }

        return open_list_hash[min_F[1]];
//        var first; for (first in hash){ break};
//        var min_F = hash[first].F;
//        var min_value = hash[first];
//        for (var state in hash){
//            if(min_F > hash[state].F){min_F = hash[state].F; min_value = hash[state]; }
//        }
//        return min_value;
    }

//    function remove_state(list, state){
//        for (var i = 0; i < list.length; i++) {
//            if((list[i].zero_index == state.zero_index) && (is_equal(list[i].puzzle, state.puzzle))){
//                list.splice(i,1);
//            }
//        }
//    }
    function remove_state(state){
        for (var i = 0; i < min_F_state.length; i++) {
            if(min_F_state[i][1] == state.hash){
                min_F_state.splice(i,1);
            }
        }
    }
}


