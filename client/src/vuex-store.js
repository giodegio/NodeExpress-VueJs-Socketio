import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Initialise the Vuex store
export default new Vuex.Store({
  // You state might be more complex than this
  state: {
    AppData: {
      server: {
        socketIo: {
          connected: false,
          numClients: 0
        }
      }
    }
  },
  mutations: {
    // User's Mutations
    // ==================================
    mutateNumberOfClients: (state, data) => { // NumberOfClients
      console.log('mutation mutateNumberOfClients: data= ', data);
      state.AppData.server.socketIo.numClients = data;
    },

    // Socket Mutations
    // ==================================
    SOCKET_CONNECT: (state, status) => {
      console.log('mutation SOCKET_CONNECT: status= ', status);
      state.AppData.server.socketIo.connected = true;
    },
    SOCKET_DISCONNECT: (state, status) => {
      console.log('mutation SOCKET_DISCONNECT: status= ', status);
      state.AppData.server.socketIo.connected = false;
      state.AppData.server.socketIo.numClients = 0;
    },
    SOCKET_NUMBER_OF_CLIENTS: (state, data) => {
      // This mutation is automatically invoked receiving the socket-io messagge "NUMBER_OF_CLIENTS"
      console.log('mutation SOCKET_NUMBER_OF_CLIENTS: data= ', data);
      state.AppData.server.socketIo.numClients = data[0];
    }
  },
  actions: {
    // Socket Actions
    // ==================================
    socket_numberOfClients: (context, data) => {
      // This action is automatically invoked receiving the socket-io messagge "NUMBER_OF_CLIENTS"
      console.log('action socket_numberOfClients: data= ', data, ' - invoking mutation!');

      // context.commit('SOCKET_NUMBER_OF_CLIENTS', data); // Caution: The SOCKET_NUMBER_OF_CLIENTS mutation is already invoked by vue-socket.io
      context.commit('mutateNumberOfClients', data);
    }
  }

  // For Mutations and Actions names synyax, see "Vuex Store integration" section in the Usage documentation
  //
  // Example:
  // -----------------------------------------------------------
  // | Server Event |       Mutation      |       Action       |
  // -----------------------------------------------------------
  // | chat message | SOCKET_CHAT MESSAGE | socket_chatMessage |
  // | chat_message | SOCKET_CHAT_MESSAGE | socket_chatMessage |
  // | chatMessage  | SOCKET_CHATMESSAGE  | socket_chatMessage |
  // | CHAT_MESSAGE | SOCKET_CHAT_MESSAGE | socket_chatMessage |
  // -----------------------------------------------------------
});
