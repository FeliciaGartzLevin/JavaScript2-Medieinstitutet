<script lang="ts">
import imgMoneyFed from './assets/images/money-fed.gif'
import imgRent from './assets/images/rent.png'

export default {
	data() {
		return {
			count: 0,

			username: '',

			todos: [
				{ id: 1, title: 'Make coffee', completed: true },
				{ id: 2, title: 'Drink coffee', completed: false },
				{ id: 3, title: 'Drink MOAR coffee', completed: false },
				{ id: 4, title: 'Drink ALL THE coffee', completed: false },
			],

			salary: 10,

			showBox: false,

			x: 0,
			y: 0,
		}
	},

	methods: {
		increaseSalary(amount = 1) {
			this.salary += amount
		},

		decreaseSalary(amount = 1) {
			this.salary -= amount
		},

		getSalaryImage() {
			return this.salary >= 50 ? imgMoneyFed : imgRent
		},

		toggleBox() {
			this.showBox = !this.showBox
		},

		updateCoords(e: MouseEvent) {
			this.x = e.offsetX
			this.y = e.offsetY
		}
	},

	computed: {
		displayName() {
			return this.username || 'anonymous haxx0r'
		},

		salaryClass() {
			return this.salary >= 20 ? 'good-salary' : 'bad-salary'
		},
	},
}
</script>

<template>
	<div class="container">
		<h1>Vue.js basics</h1>

		<section class="basics">
			<h2>MSG</h2>

			<p>You have clicked the button: {{ count }} times.</p>
			<button class="btn btn-success btn-lg" @click="count++">Click meee! 😃</button>

			<hr />

			<div class="mb-3">
				<input type="text" class="form-control" placeholder="Enter your name" v-model="username" />
			</div>

			<p>Hello, {{ displayName }}!</p>
		</section>

		<hr />

		<section class="todos">
			<h2>Todos</h2>
			<ul>
				<li v-for="todo in todos" :key="todo.id" :class="todo.completed ? 'completed' : ''">
					{{ todo.title }}
				</li>
			</ul>
		</section>

		<hr />

		<section class="salary">
			<p>
				Salary per hour: <span :class="salaryClass">{{ salary }} &euro;</span>
			</p>

			<img :src="getSalaryImage()" class="img-fluid img-salary" />

			<div class="buttons">
				<div class="mb-1">
					<button class="btn btn-primary btn-lg" @click.exact="increaseSalary()" @click.alt="increaseSalary(50)">
						Increase 1 &euro; 🤑
					</button>

					<button class="btn btn-warning btn-lg" @click="decreaseSalary()">
						Decrease 1 &euro; 😢
					</button>
				</div>
				<div>
					<button class="btn btn-success btn-lg" @click.exact="increaseSalary(5)"
						@click.shift="increaseSalary(100)">
						Increase 5 &euro; 🤑🤑🤑
					</button>

					<button class="btn btn-danger btn-lg" @click="decreaseSalary(5)">
						Decrease 5 &euro; 😢😢😢
					</button>
				</div>
			</div>
		</section>

		<hr />

		<section class="box">
			<div class="mb-3">
				<button class="btn btn-primary btn-lg" @click="toggleBox">🏃🏻</button>
			</div>

			<div class="grey-box" v-show="showBox" @mousemove="updateCoords">
				<div class="coords">{{ x }}, {{ y }}</div>
			</div>

			<p v-show="!showBox">No 📦 for you!</p>
		</section>
	</div>
</template>
