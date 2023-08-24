import { useQuery } from '@tanstack/react-query'
import * as TodosAPI from '../services/TodosAPI'

const useTodos = () => {
	return useQuery(['todos'], TodosAPI.getTodos)
}

export default useTodos
