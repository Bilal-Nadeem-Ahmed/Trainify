<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="workout.name" label="Workout Name" outlined />
      </v-col>

      <v-col
        cols="12"
        v-for="(exercise, exerciseIndex) in workout.exercises"
        :key="exercise.id"
      >
        <v-text-field v-model="exercise.name" label="Exercise Name" outlined />
        <v-row v-for="(set, setIndex) in exercise.sets" :key="set.id">
          <v-col cols="4">
            <v-text-field
              v-model="set.repetitions"
              label="Repetitions"
              type="number"
              outlined
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="set.weight"
              label="Weight"
              type="number"
              outlined
            />
          </v-col>
          <v-col cols="4">
            <v-btn color="red" @click="removeSet(exerciseIndex, setIndex)">
              Remove Set
            </v-btn>
          </v-col>
        </v-row>
        <v-btn color="green" @click="addSet(exerciseIndex)">Add Set</v-btn>
        <v-btn color="red" @click="removeExercise(exerciseIndex)"
          >Remove Exercise</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-btn color="green" @click="addExercise">Add Exercise</v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="saveWorkout">Save Workout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IWorkout,
  IExercise,
  ISet,
  Workout,
  Exercise,
  Set,
} from "@/types/ExcersiseTypes";

const workout = ref<IWorkout>(new Workout(1, "", new Date(), []));

const menu = ref(false);

const addExercise = () => {
  workout.value.exercises.push(new Exercise(Date.now(), "", []));
};

const removeExercise = (index: number) => {
  workout.value.exercises.splice(index, 1);
};

const addSet = (exerciseIndex: number) => {
  workout.value.exercises[exerciseIndex].sets.push(new Set(Date.now(), 0, 0));
};

const removeSet = (exerciseIndex: number, setIndex: number) => {
  workout.value.exercises[exerciseIndex].sets.splice(setIndex, 1);
};

const saveWorkout = () => {
  console.log("Workout saved:", workout.value);
};
</script>

<style scoped>
.v-btn {
  margin-top: 10px;
}
</style>
