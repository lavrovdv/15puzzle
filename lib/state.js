function State(puzzle, parrent){
    this.puzzle = puzzle.slice(0);
//    this.s_puzzle = puzzle;
    this.parent_state = parrent;

    this.G = this.get_G();
    this.H = this.get_H();
    this.F = this.G + this.H;
}

//State.prototype.set_F = function(F){this.F = F};
//State.prototype.set_G = function(G){this.G = G};
//State.prototype.set_H = function(H){this.H = H};
//State.prototype.set_parent_state = function(parent_state){this.parent_state = parent_state};
//State.prototype.set_puzzle = function(puzzle){this.puzzle = puzzle};

State.prototype.get_G = function(){
    var G = 0;
    var parent = this.parent_state;
    while(parent != null){
        G++;
        parent = parent.parent_state;
    }
    this.G = G;
    return this.G;
};

State.prototype.get_H = function(){
    this.H = manhattan_distance(this.puzzle);
    return this.H;
};

State.prototype.get_F = function(){
    return this.F;
};

//State.prototype.get_child = function(puzzle){
//    return new State(puzzle,this);
//};

State.prototype.get_puzzle = function(){
    return this.puzzle.slice(0);
};

State.prototype.get_neighbors = function(){
    var p_st = this.puzzle.flatten();
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
                    var neighbor_value = p_st[neighbor_index];
                    var n_st = p_st.slice(0);
                    n_st[neighbor_index] = 0;
                    n_st[zero_index] = neighbor_value;
                    neighbors_state.push(new State(n_st, this));
                }
            }
        }
    }
//    for (var i = 0; i < neighbors_state.length; i++) {
//        console.log("neighbors_state["+i+"] = " + neighbors_state[i]);
//    }
    return neighbors_state;
};


