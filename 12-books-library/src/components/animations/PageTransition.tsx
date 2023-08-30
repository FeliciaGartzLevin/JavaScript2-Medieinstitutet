/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'

const transition = {
	// duration: 0.5,
	// ease: "easeInOut",
	type: "spring",
	mass: 0.4,
	damping: 8,
}

const fadeIn = {
	initial: { opacity: 0 },
	enter: { opacity: 1, transition },
	exit: { opacity: 0, transition }
}

const swipeInFromLeftAndFade = {
	initial: { x: -100, opacity: 0 },
	enter: { x: 0, opacity: 1, transition },
	exit: { x: 100, opacity: 0, transition }
}

const swipeInFromRightAndFade = {
	initial: { x: 100, opacity: 0 },
	enter: { x: 0, opacity: 1, transition },
	exit: { x: -100, opacity: 0, transition }
}

const swipeInFromTopAndFade = {
	initial: { y: -100, opacity: 0 },
	enter: { y: 0, opacity: 1, transition },
	exit: { y: 100, opacity: 0, transition }
}

const swipeInFromBottomAndFade = {
	initial: { y: 100, opacity: 0 },
	enter: { y: 0, opacity: 1, transition },
	exit: { y: -100, opacity: 0, transition }
}

const spring = {
	initial: {
		opacity: 0,
		x: "-50vw",
		transition: {
			// staggerChildren: 0.5,
		}
	},
	enter: {
		opacity: 1,
		x: 0,
		transition: {
			...transition,
		}
	},
	exit: {
		opacity: 0,
		x: "-50vw",
		transition: {
			...transition,
			mass: 0.01,
			// staggerChildren: 0.5,
		}
	},
}

interface IProps {
	children: React.ReactNode
	page: React.Key
}

const PageTransition: React.FC<IProps> = ({ children, page }) => {
	return (
		<motion.div
			key={page}
			variants={spring}
			initial="initial"
			animate="enter"
			exit="exit"
		// initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
		// animate={{ opacity: 1, scale: 1, rotate: 0 }}
		// transition={{ duration: 2 }}
		// exit={{ opacity: 0, scale: 0.1, rotate: -359 }}
		>
			{children}
		</motion.div>
	)
}

export default PageTransition
