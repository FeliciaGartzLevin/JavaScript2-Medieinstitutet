
import useGetCollection from './useGetCollection'

const useGetTodos = () => {
	//call generic hook to get collection
	const { data, loading, getData, error } = useGetCollection('todos')

	return {
		data,
		getData,
		loading,
		error,
	}
}

export default useGetTodos
