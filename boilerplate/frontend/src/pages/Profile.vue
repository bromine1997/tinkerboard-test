<!-- Profile.vue -->
<template>
  <div class="row">
    <div class="col-md-8">
      <div v-if="userProfileStore.loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="userProfileStore.profile">
        <edit-profile-form
          :model="userProfileStore.profile"
          @update-profile="userProfileStore.updateUserProfile"
        ></edit-profile-form>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfileForm from './Profile/EditProfileForm';
import { useUserProfileStore } from '@/store/userProfile';

export default {
  name: 'Profile',
  components: {
    EditProfileForm,
  },
  setup() {
    const userProfileStore = useUserProfileStore();

    userProfileStore.initializeUserProfile();

    return {
      userProfileStore,
    };
  },
};
</script>