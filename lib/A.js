function A(puzzle){
    var start_state = new State(puzzle, null);
    var current = null;
    var terminate = new State(get_terminate_state(),null);
    var start_time = new Date().getTime();
    var open_list = {};
    var close_list = {};
    var open_list_size = 1;
    var close_list_size = 0;

    open_list[start_state.hash] = start_state;
    // массив для поиска наименьшего веса.
    var min_F_state = [[start_state.F, start_state.hash]];

    while(open_list_size > 0 && !open_list[terminate.hash]){
        // делаем текущим состояние с наименьшей стоимостью
        current = get_current();

        // добавляем текущую клетку в закрытый список и удаляем из открытого.
        add_to_close_list();
        close_list_size++;

        // получаем соседние состояния
        var neighbors = current.get_neighbors();

        for (var i = 0; i < neighbors.length; i++) {
            // если не в закрытом списке
            if(!close_list[neighbors[i].hash]){
                // если не в открытом списке, добавляем в открытый список
                if(!open_list[neighbors[i].hash]){
                    open_list[neighbors[i].hash] = neighbors[i];
                    open_list_size++;
                    min_F_state.push([neighbors[i].F, neighbors[i].hash]);
                }else{
                    var from_list = open_list[neighbors[i].hash];
                    if (from_list.G < neighbors[i].G){
                        from_list.parent_state = current;
                        from_list.set_G();
                        update(from_list.hash, from_list.F);
                    }
                }
            }
        }
        if (open_list_size % 10000 == 0) console.log("open_list_size = " + open_list_size + ";  close_list_size = " + close_list_size);
    }

    var solution = open_list[terminate.hash].get_solution();

    var end_time = new Date().getTime();
    console.log("time = " + ((end_time-start_time)/1000) + "s");
    console.log("open_list_size = " + open_list_size + ";  close_list_size = " + close_list_size);
    console.log("solutions size = " + solution.length);

    return solution;

    /**
     * Ищем состояние с наименьшей стоимостью.
     */
    function get_current(){
        var min_F = min_F_state[0];
        for (var i = min_F_state.length - 1; i >= 0; i--) {
            if(min_F[0] > min_F_state[i][0]){min_F = min_F_state[i]; }
        }
        return open_list[min_F[1]];
    }

    function add_to_close_list(){
        close_list[current.hash] = current;
        delete open_list[current.hash];
        open_list_size--;
        remove_state(current);
    }

    function remove_state(state){
        for (var i = min_F_state.length - 1; i >= 0; i--) {
            if(min_F_state[i][1] == state.hash){
                min_F_state.splice(i,1);
                break;
            }
        }
        return null;
    }

    function update(hash,F){
        for (var i = min_F_state.length - 1; i >= 0; i--) {
            if(min_F_state[i][1] == hash){
                min_F_state[i][0] = F;
                break;
            }
        }
        return null;
    }
}

function revert(list){

}



