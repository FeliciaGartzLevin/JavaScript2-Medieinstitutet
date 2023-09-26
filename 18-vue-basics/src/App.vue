<script lang="ts">
const todos = [
	{ id: 1, title: 'Make coffee', completed: true },
	{ id: 2, title: 'Drink coffee', completed: false },
	{ id: 3, title: 'Drink MOAR coffee', completed: false },
	{ id: 4, title: 'Drink ALL THE coffee', completed: false },
]

export default {}
</script>

<template>
	<div class="container">
		<h1>Vue.js basics</h1>

		<section class="basics">
			<h2>MSG</h2>

			<p>You have clicked the button: COUNT times.</p>
			<button class="btn btn-success btn-lg">Click meee! 😃</button>

			<hr />

			<div class="mb-3">
				<input type="text" class="form-control" placeholder="Enter your name" />
			</div>

			<p>Hello, USERNAME!</p>
		</section>

		<hr />

		<section class="todos">
			<h2>Todos</h2>
			<ul>
				<li>I am a procastrinated todo 😰</li>
				<li class="completed">I am a completed todo 😁</li>
			</ul>
		</section>

		<hr />

		<section class="salary">
			<p>Salary per hour: <span>SALARY &euro;</span></p>

			<img src="/src/assets/images/salary.png" class="img-fluid img-salary" />

			<div class="buttons">
				<div class="mb-1">
					<button class="btn btn-primary btn-lg">Raise 1 &euro; 🤑</button>

					<button class="btn btn-warning btn-lg">Decrease 1 &euro; 😢</button>
				</div>
				<div>
					<button class="btn btn-success btn-lg">Increase 5 &euro; 🤑🤑🤑</button>

					<button class="btn btn-danger btn-lg">Decrease 5 &euro; 😢😢😢</button>
				</div>
			</div>
		</section>

		<hr />

		<section class="box">
			<div class="mb-3">
				<button class="btn btn-primary btn-lg">🏃🏻</button>
			</div>

			<div class="grey-box">
				<div class="coords">42, 1337</div>
			</div>

			<p class="d-none">No 📦 for you!</p>
		</section>
	</div>
</template>
