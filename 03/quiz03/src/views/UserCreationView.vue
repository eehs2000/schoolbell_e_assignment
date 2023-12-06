<template>
  <div class="user-creation-view">
    <div class="user-card-list">
      <UserCreationCard
        v-for="(user, idx) in creatingUsers"
        :key="idx"
        :user="user"
        :index="idx"
        :removeUser="removeUser"
        @update-user="handleUserUpdate"
        :isDuplicate="checkDuplicateName(user.userName, idx)"
      />
    </div>
    <div class="btn-section">
      <button @click="addUser">Add User</button>
      <button @click="confirmUsers" :disabled="!canConfirmUsers">
        Confirm
      </button>
    </div>
    <div class="confirmed-section" v-if="confirmedUsers.length">
      <div v-for="(createdUser, idx) in confirmedUsers" :key="idx">
        <p class="label-text">
          Name: <span>{{ createdUser.userName }}</span>
        </p>
        <p class="label-text">
          Password: <span>{{ convertPwd(createdUser.password) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useUserCreation, User } from '../scripts/userCreationScript';
import UserCreationCard from '../components/UserCreationCard.vue';

export default defineComponent({
  name: 'UserCreationView',
  components: {
    UserCreationCard,
  },
  setup(props, ctx) {
    const {
      creatingUsers,
      addUser,
      removeUser,
      checkDuplicateName,
      isValidForm,
      confirmedUsers,
      confirmUsers,
    } = useUserCreation();

    interface UserUpdateEvent {
      index: number;
      key: keyof User;
      value: string;
    }

    const handleUserUpdate = ({ index, key, value }: UserUpdateEvent) => {
      creatingUsers.value[index][key] = value;
    };

    const canConfirmUsers = computed(() => {
      return creatingUsers.value.every(
        (user, index) =>
          isValidForm(user) && !checkDuplicateName(user.userName, index)
      );
    });

    const convertPwd = (pwd: string) => {
      return pwd.substring(0, 3) + '*'.repeat(pwd.length - 3);
    };

    return {
      creatingUsers,
      addUser,
      removeUser,
      checkDuplicateName,
      isValidForm,
      confirmedUsers,
      confirmUsers,
      handleUserUpdate,
      canConfirmUsers,
      convertPwd,
    };
  },
});
</script>

<style lang="scss">
.user-creation-view {
  padding: 24px 12px;

  .user-card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .btn-section {
    padding-top: 24px;
    display: flex;
    gap: 8px;
    button {
      width: 80px;
      height: 32px;
      background-color: white;
    }
  }
  .confirmed-section {
    margin-top: 24px;
    background-color: #e0e0e0;
    padding: 24px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    .label-text {
      font-weight: 600;
      span {
        font-weight: 400;
      }
    }
  }
}
</style>
