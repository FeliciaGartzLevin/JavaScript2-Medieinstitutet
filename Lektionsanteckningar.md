# Lektionsanteckningar Javascript fortsättning

## 01-react-basics 
`npm create vite@latest 01-react-basics -- --template react-ts` för att starta upp en ny react-app med Vite.

App.tsx:24 onClick={handleButtonClick}
{/* handleButtonClick kallas på utan (), för annars körs funktionen inte när man klickar utan när man läser in koden */}

Allting i react är uppbyggt med Hooks, som är functioner som hämtas från react, t ex `useState()`.

States är en variabel men speciell som så att React håller koll på när den ändras och läser av den på nytt.

Writing Markup with JSX
JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it.
https://react.dev/learn/writing-markup-with-jsx

## 02-02-react-simple-todos
Workshop

useEffect() - kan välja efter vilka förändringar den ska renderas, (t ex ändra title enbart efter todos har förändrats/omrenderats, inte efter att något annat på sidan har renderats om (inte när ngt lagts till, tagits bort eller togglats))

`// Our first side-effect
  useEffect( () => {
  		console.log("Updating page title using an effect")
  		document.title = todos.length + " todos"
  	}, [todos.lentgh] )
`

	`
  // This will only be executed when the component is mounted,
	// and only AFTER the component has been rendered
	useEffect(() => {
		console.log("Look mom, I'm a newly mounted component 👶🏻")
	}, [])

	// This will only be executed if `finishedTodos.length` or `todos.length`
	// have changed since last render, and only AFTER the component has been rendered
	useEffect( () => {
		console.log("Updating page title using an effect")
		document.title = `${finishedTodos.length} of ${todos.length} completed`
	}, [finishedTodos.length, todos.length] )

	useEffect(() => {
		console.log("🎉")
	})
  `
## 06-better-todos

### Roadmap routes

```text
/ - welcome page
/todos - index of todos
/todos/1 - show todo with id 1
/todos/2 - show todo with id 2
/todos/add - show create todo form
/todos/1/edit - show edit todo form for todo with id 1
```

1. Gå in i main.tsx och `import { BrowserRouter } from 'react-router-dom'`

2. Wrappa App component i BrowserRouter.

3. `import { Routes, Route } from 'react-router-dom'` i App.tsx 

## 10-react-query

### Terminalkommandon för att starta upp ett nytt reactproject:

`npm create vite@latest 10-react-query -- --template 

(om mappen redan finns och man vill skapa root files direkt i den:) npm create vite@latest . -- --template 

react-ts
cd 10-react-query
npm i axios bootstrap react-bootstrap react-router-dom sass @tanstack/react-query
npm i -D @tanstack/eslint-plugin-query`


