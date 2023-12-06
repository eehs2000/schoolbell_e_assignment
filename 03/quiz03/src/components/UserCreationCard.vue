<template>
  <div class="user-creation-card">
    <div class="card-header">
      <p class="user-number">User - {{ index }}</p>
      <button class="delete-btn" @click="removeUser(index)">X</button>
    </div>
    <div class="card-input-section">
      <div>
        <p>Name</p>
        <input
          :class="{ error: nameError }"
          :value="user.userName"
          @input="updateUserName"
        />
        <p class="error-msg" v-if="nameError">{{ nameError }}</p>
      </div>
      <div>
        <p>Password</p>
        <input
          :class="{ error: passwordError }"
          :value="user.password"
          type="password"
          @input="updatePassword"
        />
        <p class="error-msg" v-if="passwordError">{{ passwordError }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'UserCreationCard',
  props: {
    user: {
      type: Object as PropType<{ userName: string; password: string }>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeUser: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    isDuplicate: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const nameError = ref('');
    const passwordError = ref('');

    const validateName = () => {
      if (props.user.userName.length < 3) {
        nameError.value = 'Name must be at least 3 characters long';
      } else if (props.isDuplicate) {
        nameError.value = `The name '${props.user.userName}' is duplicated`;
      } else {
        nameError.value = '';
      }
    };

    const validatePassword = () => {
      if (props.user.password.length < 6) {
        passwordError.value = 'Password must be at least 6 characters long';
      } else {
        passwordError.value = '';
      }
    };

    const updateUserName = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update-user', {
        index: props.index,
        key: 'userName',
        value: target.value,
      });
      validateName();
    };

    const updatePassword = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update-user', {
        index: props.index,
        key: 'password',
        value: target.value,
      });
      validatePassword();
    };

    watch(() => props.isDuplicate, validateName);

    return {
      validateName,
      validatePassword,
      nameError,
      passwordError,
      updateUserName,
      updatePassword,
    };
  },
});
</script>

<style lang="scss">
.user-creation-card {
  border: 1px solid #101010;
  padding: 12px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-number {
      font-weight: 700;
      font-size: 20px;
    }
    .delete-btn {
      height: 24px;
      widows: 24px;
    }
  }
  .card-input-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 12px;
    input {
      width: 100%;
      height: 36px;
      box-sizing: border-box;
    }
    input.error {
      border-color: red;
      background-color: #ffc0cb;
    }
    input:focus {
      outline: none;
    }
    .error-msg {
      color: red;
      font-size: 14px;
    }
  }
}
</style>
