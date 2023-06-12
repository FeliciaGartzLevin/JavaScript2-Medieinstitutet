import React from 'react'
import { Button } from 'react-bootstrap'

type IProps = {
	page: number
	currentPage: number
	maxPage: number
	pageSwitcher: (directionNumber: number) => void
}

const PageNavigation: React.FC<IProps> = ({ page, currentPage, maxPage, pageSwitcher }) => {
	return (
		<div className="d-flex justify-content-between align-items-center my-2">
			<div className="prev">
				<Button
					disabled={page === 0}
					onClick={() => pageSwitcher(-1)}
					variant='primary'
				>
					Previous Page
				</Button>
			</div>

			<div className="page">{currentPage + 1}/{maxPage}</div>

			<div className="next">
				<Button
					disabled={page + 1 >= maxPage}
					onClick={() => pageSwitcher(+1)}
					variant='primary'
				>
					Next Page
				</Button>
			</div>
		</div>
	)
}

export default PageNavigation
