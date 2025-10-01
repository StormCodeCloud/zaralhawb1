<template>
  <div>
    <!-- Botão flutuante -->
    <button 
      class="chat-icon btn btn-warning rounded-circle shadow-lg"
      @click="toggleChat"
    >
      <i class="bi bi-chat-dots-fill fs-3"></i>
    </button>

    <!-- Janela do chat -->
    <div v-if="isOpen" class="chat-box card shadow-lg">
      <div class="card-header d-flex justify-content-between align-items-center bg-warning text-dark">
        <span><i class="bi bi-headset"></i> Suporte Staff</span>
        <button class="btn-close" @click="toggleChat"></button>
      </div>
      <div class="card-body chat-body">
        <div 
          v-for="(msg, index) in messages" 
          :key="index"
          :class="['chat-message', msg.sender]"
        >
          <div class="message-bubble">
            {{ msg.text }}
          </div>
        </div>
      </div>
      <div class="card-footer">
        <form @submit.prevent="sendMessage" class="d-flex">
          <input 
            v-model="newMessage" 
            type="text" 
            class="form-control" 
            placeholder="Escreva sua mensagem..." 
          />
          <button type="submit" class="btn btn-warning ms-2">
            <i class="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const messages = ref([
  { sender: "staff", text: "Olá! Como posso ajudar?" }
]);
const newMessage = ref("");

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  messages.value.push({ sender: "user", text: newMessage.value });
  newMessage.value = "";

  // Simulação de resposta automática
  setTimeout(() => {
    messages.value.push({ sender: "staff", text: "Obrigado pela sua mensagem! Um staff aparecerá em breve 🚀" });
  }, 1000);
};
</script>

<style scoped>
.chat-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  z-index: 999;
}

.chat-box {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 320px;
  height: 420px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1000;
}

.chat-body {
  overflow-y: auto;
  flex: 1;
  padding: 10px;
  background-color: #f8f9fa;
}

.chat-message {
  display: flex;
  margin: 5px 0;
  word-wrap: break-word;
}

.chat-message.staff {
  justify-content: flex-start;
}

.chat-message.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 75%;
  padding: 8px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  line-height: 1.4;
  word-break: break-word;
}

.chat-message.staff .message-bubble {
  background-color: #e9ecef;
  color: #333;
  border-bottom-left-radius: 0;
}

.chat-message.user .message-bubble {
  background-color: #f2a900;
  color: white;
  border-bottom-right-radius: 0;
}
</style>
