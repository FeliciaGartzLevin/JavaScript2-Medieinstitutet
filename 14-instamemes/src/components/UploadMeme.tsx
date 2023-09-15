import { useCallback } from 'react'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import ProgressBar from 'react-bootstrap/ProgressBar'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import imgAccept from '../assets/images/accept.gif'
import imgDrop from '../assets/images/drop.gif'
import imgReject from '../assets/images/reject.gif'
import useUploadMeme from '../hooks/useUploadMeme'

const UploadMeme = () => {
	const uploadMeme = useUploadMeme()

	// Drop it like it's hot 🔥
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (!acceptedFiles.length) {
			toast.warning("Y WOULD U DO STUFF LIKE DAT?!")
			return
		}
		console.log(acceptedFiles[0])

		// trigger upload of the dropped meme
		uploadMeme.upload(acceptedFiles[0])
	}, [uploadMeme])

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: {
			"image/gif": [],
			"image/jpeg": [],
			"image/png": [],
			"image/webp": [],
		},
		maxFiles: 1,
		maxSize: 4 * 1024 * 1024, // 4 mb
		onDrop: onDrop,
	})

	const dropzoneWrapperClasses = classNames({
		"drag-accept": isDragAccept,
		"drag-reject": isDragReject,
	})

	return (
		<div {...getRootProps()} id="dropzone-wrapper" className={dropzoneWrapperClasses}>
			<input {...getInputProps()} />

			<div className="indicator">
				{isDragActive
					? isDragAccept
						? <Image
							src={imgAccept}
							fluid />
						: <Image
							src={imgReject}
							fluid />
					: <Image
						src={imgDrop}
						className="w-50"
						fluid />}
			</div>

			{/* Upload Progress Bar */}
			{uploadMeme.progress !== null && (
				<ProgressBar
					animated
					label={`${uploadMeme.progress}%`}
					now={uploadMeme.progress}
					variant="success"
				/>
			)}

			{uploadMeme.isError && <Alert variant="danger">😳 {uploadMeme.error}</Alert>}
			{uploadMeme.isSuccess && <Alert variant="success">😂 that was a funny meme!</Alert>}
		</div>
	)
}

export default UploadMeme
