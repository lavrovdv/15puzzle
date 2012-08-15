function A(puzzle){
    var start_state = new State(puzzle, null);
    var current = null;
    var terminate = new State(get_terminate_state(puzzle),null);
    var start = new Date().getTime();
    var open_list = {};
    var close_list = {};

    open_list[start_state.hash] = start_state;
    var open_list_size = 1;
    var min_F_state = [[start_state.F, start_state.hash]];


    while(open_list_size > 0 && !open_list[terminate.hash]){
        current = get_current();
        close_list[current.hash] = current;

        open_list_size--;
        delete open_list[current.hash];
        remove_state(current);
        var neighbors = current.get_neighbors();

        for (var i = 0; i < neighbors.length; i++) {
            if(!close_list[neighbors[i].hash]){
                if(!open_list[neighbors[i].hash]){
                    open_list[neighbors[i].hash] = neighbors[i];
                    open_list_size++;
                    min_F_state.push([neighbors[i].F, neighbors[i].hash]);
                }else{
                    var from_list = open_list[neighbors[i].hash];
                    if (from_list.G < neighbors[i].G){
                        from_list.parent_state = current;
                        from_list.set_G();
                    }
                }
            }
        }
    }

    var solution = open_list[terminate.hash].get_solution();

    var end = new Date().getTime();
    console.log("time = " + ((end-start)/1000));
    console.log("open_list=" + Object.keys(open_list).length + "; close_list=" + Object.keys(close_list).length);
    console.log("solution = " + solution.length);
    return solution;

    function get_current(){
        var min_F = min_F_state[0];
        for (var i = 1; i < min_F_state.length; i++) {
            if(min_F[0] > min_F_state[i][0]){min_F = min_F_state[i]; }
        }

        return open_list[min_F[1]];
    }

    function remove_state(state){
        for (var i = 0; i < min_F_state.length; i++) {
            if(min_F_state[i][1] == state.hash){
                min_F_state.splice(i,1);
                break;
            }
        }
        return null;
    }
}


