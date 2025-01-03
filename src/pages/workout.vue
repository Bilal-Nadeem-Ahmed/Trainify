<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="d-flex justify-space-between align-center"
      >
        <h2>Add or Select a Workout template</h2>
        <v-btn
          color="primary"
          @click="menu = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="workoutItem in workouts"
            :key="workoutItem.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card @click="editWorkout(workoutItem)">
              <v-card-title>{{ workoutItem.name }}</v-card-title>
              <v-card-subtitle class="pb-4">
                <span>
                  {{ workoutItem.date.toLocaleDateString() }}
                  <span v-if="workoutItem.exercises.length">
                    - {{ workoutItem.exercises.length }} exercise<span
                      v-if="workoutItem.exercises?.length > 1"
                    >s</span>
                  </span>
                </span>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-dialog
        v-model="menu"
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ workout.id ? 'Edit' : 'Add' }} Workout</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="workout.name"
                label="Workout Name"
                variant="outlined"
                hide-details="auto"
                :rules="[rules.required]"
              />
              <v-divider class="my-4" />
              <div
                v-for="(exercise, exerciseIndex) in workout.exercises"
                :key="exercise.id"
                class="py-2"
              >
                <v-text-field
                  v-model="exercise.name"
                  label="Exercise Name"
                  variant="outlined"
                  hide-details="auto"
              
                  :rules="[rules.required]"
                >
                  <template #append>
                    <v-icon
                      color="red"
                      size="24px"
                      class="custom-icon"
                      @click="removeExercise(exerciseIndex)"
                    >
                      mdi-close
                    </v-icon>
                  </template>
                </v-text-field>
          
                <v-container
                  v-if="exercise.sets.length"
                  class="px-0 pb-0"
                >
                  <v-row
                    v-for="(set, setIndex) in exercise.sets"
                    :key="set.id"
                  >
                    <v-col>
                      <v-text-field
                        v-model="set.repetitions"
                        label="Reps"
                        type="number"
                        variant="outlined"
                        required
                        hide-details="auto"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="set.weight"
                        label="Weight"
                        type="number"
                        variant="outlined"
                        required
                        hide-details="auto"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="set.unit"
                        label="Select"
                        :items="enumOptions"
                        variant="outlined"
                        item-title="text"
                        item-value="value"
                        hide-details="auto"
                      >
                        <template #append>
                          <v-icon
                            color="red"
                            size="24px"
                            class="custom-icon"
                            
                            @click="removeSet(exerciseIndex, setIndex)"
                          >
                            mdi-close
                          </v-icon>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn
                  color="primary"
                  @click="addSet(exerciseIndex)"
                >
                  Add Set
                </v-btn>
              </div>
              <v-btn
                color="primary"
                @click="addExercise"
              >
                Add Exercise
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="red"
              @click="resetModal"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green"
              variant="outlined"
              @click="completeWorkout"
            >
              Complete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
 
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        :rounded="true"
        :disabled="true"
      >
        {{ snackbarText }}

        <template #actions>
          <v-btn
            color="blue"
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTemplateRef } from 'vue'
import {
  type IWorkout,
  type IExercise,
  type ISet,
  Workout,
  Exercise,
  Set,
  WeightTypeEnum
} from "@/types/ExcersiseTypes";

const workout = ref<IWorkout>(new Workout(1, "", new Date(), []));

const workouts = ref<IWorkout[]>([
  new Workout(1, "workout1", new Date(), [
    new Exercise(1, "", [new Set(1, 0, 0)]),
  ]),
  new Workout(2, "workout2", new Date(), []),
  new Workout(1, "workout1", new Date(), [
    new Exercise(1, "", [new Set(1, 0, 0)]),
  ]),
  new Workout(2, "workout2", new Date(), []),
  new Workout(1, "workout1", new Date(), [
    new Exercise(1, "", [new Set(1, 0, 0)]),
  ]),
  new Workout(2, "workout2", new Date(), []),
]);

const menu = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const timeout = ref(2000);
const form = useTemplateRef('form');
const isEdit = ref(false);
const  rules = {
        required: (value: unknown) => !!value || 'Field is required',
      };

const enumOptions = Object.keys(WeightTypeEnum)
  .filter(key => isNaN(Number(key))) 
  .map(key => ({
    text: key,
    value: WeightTypeEnum[key],
  }));

const addExercise = () => {

  workout.value.exercises.push(new Exercise(Date.now(), "", []));
};

const removeExercise = (index: number) => {
  workout.value.exercises.splice(index, 1);
};
const completeWorkout = () => {

  form.value?.validate().then((isValid: boolean) => {
    if (isValid) {

      if (workout.value.name && workout.value.exercises.length) {
        if (isEdit.value) {
          const index = workouts.value.findIndex(w => w.id === workout.value.id);
          if (index !== -1) {
            workouts.value[index] = { ...workout.value };
          }
        } else {
          workouts.value.push({ ...workout.value, id: Date.now() });
        }
      
        resetModal();
      } else {
        snackbar.value = true;
        snackbarText.value = "Please add a set to the workout before completing!";
      }
    } 
  });
};


const resetModal = () => {
  menu.value = false;
  workout.value = new Workout(Date.now(), "", new Date(), []);
  isEdit.value = false;
};
const addSet = (exerciseIndex: number) => {
  workout.value.exercises[exerciseIndex].sets.push(new Set(Date.now(), 0, 0));
};

const removeSet = (exerciseIndex: number, setIndex: number) => {
  workout.value.exercises[exerciseIndex].sets.splice(setIndex, 1);
};
const editWorkout = (workoutItem: IWorkout) => {
  isEdit.value = true;
  workout.value = { ...workoutItem };
  menu.value = true;
};


</script>

<style scoped>
.v-btn {
  margin-top: 10px;
}
</style>
