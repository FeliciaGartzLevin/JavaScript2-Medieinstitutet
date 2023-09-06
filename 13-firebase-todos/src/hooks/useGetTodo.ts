import useGetDocument from './useGetDocument'

const useGetTodo = (documentId: string) => {
	//call generic hook to get document
	const { data, loading, getData, error } = useGetDocument('todos', documentId)

	return {
		data,
		getData,
		loading,
		error,
	}
}

export default useGetTodo
