import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex);
//types
const types ={
  SET_LOCATION : "SET_LOCATION",
  SET_ADRESS : "SET_ADRESS"
}

//state
const state={
  location:{},
  adress:""

}
//getters
const getter = {
  location: state=>state.location,
  adress: state => state.adress
}

//mutation
const mutation={
  [types.SET_LOCATION](state, location){
    if(location){
      state.location= location;
    }else{
      state.location=null
    }
  },
  [types.SET_ADRESS](state, adress){
    if(adress){
      state.adress= adress;
    }else{
      state.adress="";
    }
  }
}
//actions
const actions={
  setLocation:({commit},location)=>{
    commit(types.SET_LOCATION,location);
  },
  setAddress:({commit},address)=>{
    commit(types.SET_ADRESS,address);
  },
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})