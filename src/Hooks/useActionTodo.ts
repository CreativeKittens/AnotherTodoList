import { useEffect, useState } from "react"

type saveTodo = (todo: string) => void
export type deleteTodo = (id: number) => void
export type finishTodo = (id: number) => void
export type editTodo = (id: number, newTodo: string) => void

export interface ItodoItem {
	id: number
	date: string
	todo: string
	isDone: boolean
}

const useSaveTodo = () => {
	const [savedTodo, setSavedTodo] = useState<ItodoItem[]>([])

	useEffect(() => {
		let localTodo = <string>localStorage.getItem("savedTodo")

		if (!localTodo) {
			localStorage.setItem("savedTodo", JSON.stringify([]))
		}

		setSavedTodo(JSON.parse(localTodo))
	}, [])

	const saveTodo: saveTodo = (todo) => {
		const todoItem: ItodoItem = {
			id: savedTodo.length,
			date: Date().toLocaleLowerCase(),
			todo: todo,
			isDone: false,
		}

		if (!todo) return

		setSavedTodo((prevSavedTodo): ItodoItem[] => {
			return [...prevSavedTodo, todoItem]
		})

		localStorage.setItem("savedTodo", JSON.stringify([...savedTodo, todoItem]))
	}

	const deleteTodo: deleteTodo = (id) => {
		const filteredTodo = savedTodo
			.filter((todoItem) => {
				return todoItem.id !== id
			})
			.map((todoItem, index) => {
				return { ...todoItem, id: index }
			})

		setSavedTodo(filteredTodo)

		localStorage.setItem("savedTodo", JSON.stringify(filteredTodo))
	}

	const finishTodo: finishTodo = (id) => {
		const finishedTodo = savedTodo.map((todoItem) => {
			if (todoItem.id !== id) return todoItem

			if (todoItem.isDone) {
				return { ...todoItem, isDone: false }
			}

			return { ...todoItem, isDone: true }
		})

		setSavedTodo(finishedTodo)

		localStorage.setItem("savedTodo", JSON.stringify(finishedTodo))
	}
	const editTodo: editTodo = (id, newTodo) => {
		const editedTodo = savedTodo.map((todoItem) => {
			if (todoItem.id !== id) return todoItem

			todoItem.todo = newTodo
			return todoItem
		})

		setSavedTodo(editedTodo)

		localStorage.setItem("savedTodo", JSON.stringify(editedTodo))
	}

	return { savedTodo, saveTodo, deleteTodo, finishTodo, editTodo }
}

export default useSaveTodo
