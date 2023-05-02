import { useState } from 'react'
import ClickCounter from './components/ClickCounter'
import Salary from './components/Salary'
import './App.css'

type Post = {
	title: string
	likes: number
}

const App = () => {

	const [msg, setMsg] = useState("Hi mom, I'm stateful")
	// let clicks = 0 //funkar ej, behöver vara en state (soom nedan:)
	const [clicks, setClicks] = useState(0)
	const [posts, setPosts] = useState<Post[]>([
		{ title: "React Rocks 🤘🏻!", likes: 42 },
		{ title: "JSX", likes: 1337 },
		{ title: "Got state?", likes: 3 },
	])

	// input state
	const [newPostTitle, setNewPostTitle] = useState("")

	const handleButtonClick = () => {
		/**
		 * Exempel 1 utkommenterat
		 */
		// console.log("You clicked the button, good boi!")
		// console.log("Message is:", msg)
		// setMsg("Bye mom")
		// console.log("Message after change is:", msg)

		/**
		 * Exempel 2
		 */
		// setClicks(++clicks)
		setClicks(clicks + 1)
		console.log("Clicks:", clicks)

		setMsg("Hi mom!")

	}
	/**
	 * Min lösning på WS, funktionerna utkommenterade nedan i onclick{}
	 */
	// const raise1 = () => {
	// 	setSalary(salary + 1)
	// }

	// const decr1 = () => {
	// 	setSalary(salary - 1)
	// 	if (salary >= 5) {
	// 		return salary
	// 	}
	// 	return setSalary(5)
	// }

	// const raise5 = () => {
	// 	setSalary(salary + 5)
	// }

	// const decr5 = () => {
	// 	setSalary(salary - 5)
	// 	if (salary >= 5) {
	// 		return salary
	// 	}
	// 	return setSalary(5)

	// }

	/**
	 * Johans lösning
	 */
	// att lägga höger sida av = tecknen direkt i onclick{}


	const handleAddLike = (post: Post) => {
		console.log("Want to add like to post:", post)
		// add likes to post
		post.likes++
		console.log("Post likes are now:", post.likes)
		setPosts([...posts])

	}

	/**
	 * Min lösning på WS. Får inte modifiera en array (mha splice)
	 */
	// const deletePost = (postIndex: number) => {
	// 	console.log("Want to delete post with index:", postIndex)
	// 	//delete clicked post
	// 	posts.splice(postIndex, 1)
	// 	setPosts([...posts])
	// }

	/**
	 * Johans lösning på WS där man inte modifierar splice
	 */
	const handleDeletePost = (postToDelete: Post) => {
		setPosts(posts.filter(post => post !== postToDelete))
		// setPosts([...posts, { title: "I am new post", likes: 0 }])
		// setPosts(posts.filter(post => post !== postToDelete))
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// add a new post to the posts state
		const newPost: Post = {
			title: newPostTitle,
			likes: 0
		}
		setPosts([...posts, newPost])

		// clear newPostTitle state
		setNewPostTitle('')
	}


	// const hiDad =  () => { setMsg('Hi dad!') }

	return (
		<div className="app">
			<h1>React Basics</h1>


			<ClickCounter />

			<h2>{msg}</h2>

			<button onClick={() => { setMsg('Hi dad!') }} className="btn btn-warning btn-lg">Hi dad!</button>
			{/* sätter in höger sida om = från hiDad-funktionen, så kallar inte på någon funktion vid rendering, utan först när man klickar. */}


			<hr />

			<Salary />

			<hr />

			<h2>Posts</h2>

			<form onSubmit={handleFormSubmit} className="mb-3">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Post title"
						onChange={e => setNewPostTitle(e.target.value)}
						value={newPostTitle}
						required
					/>

					<button
						type="submit"
						className="btn btn-primary"
					>
						Create
					</button>
				</div>
				{newPostTitle.length > 0 && newPostTitle.length < 5 && (
					<div className="form-text text-warning">Title has to be at least 5 chars.</div>
				)}
			</form>

			{posts.length > 0 && (
				<>
					<ul>
						{
							/* vårt gamla sätt: */
							// posts.map(post => {
							// 	return `<li>${post.title}</li>`
							// })

							/* vårt nya sätt i React: */
							// posts.map(post => {
							// 	return (<li>{post.title}</li>)
							// })

							/* fast som oneliner: */
							// posts.map(post => <li>{post.title}</li>)

							/* eller */
							// posts.map(
							// 	post => <li>{post.title}</li>
							// 	)

							/* annat exempel där även key måste vara med*/
							//kan använda index i arrayen som key iställer för id

							posts.map((post, index) => (
								<li key={index /* post.id */}>
									{post.title} ({post.likes} likes)
									<button
										onClick={() => handleAddLike(post)}
										className="btn btn-success btn-sm ms-1"
									>❤️</button>
									<button
										// onClick={() => deletePost(index)}
										onClick={() => (handleDeletePost(post))}
										className="btn btn-danger btn-sm ms-1"
									>🗑</button>
								</li>
							))

						}
					</ul>
				</>
			)}
			{posts.length === 0 && (<p>No posts</p>)}
		</div>
	)
}

export default App
