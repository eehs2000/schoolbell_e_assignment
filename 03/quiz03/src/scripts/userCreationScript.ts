import { ref } from 'vue';

export interface User {
  userName: string;
  password: string;
}

export const useUserCreation = () => {
  const creatingUsers = ref<Array<User>>([
    {
      userName: '',
      password: '',
    },
  ]);

  const addUser = () => {
    creatingUsers.value.push({
      userName: '',
      password: '',
    });
  };

  const removeUser = (index: number) => {
    creatingUsers.value.splice(index, 1);
  };

  const checkDuplicateName = (userName: string, index: number) => {
    if (userName) {
      return creatingUsers.value.some(
        (user, idx) => idx !== index && user.userName === userName
      );
    } else {
      return false;
    }
  };

  const isValidForm = (user: User) => {
    return user.userName.length >= 3 && user.password.length >= 6;
  };

  const confirmedUsers = ref<Array<User>>([]);

  const confirmUsers = () => {
    const validUsers = creatingUsers.value.filter((user, index) => {
      return (
        isValidForm(user) &&
        !creatingUsers.value.some(
          (otherUser, otherIndex) =>
            otherIndex !== index && otherUser.userName === user.userName
        )
      );
    });

    confirmedUsers.value.push(...validUsers);

    creatingUsers.value = [{ userName: '', password: '' }];
  };

  return {
    creatingUsers,
    addUser,
    removeUser,
    checkDuplicateName,
    isValidForm,
    confirmedUsers,
    confirmUsers,
  };
};
