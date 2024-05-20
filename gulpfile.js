import rsync from 'gulp-rsync'
import pkg from 'gulp'
const { src } = pkg

function deploy() {
	return src('dist/')
		.pipe(rsync({
			root: 'dist/',
			hostname: 'nikvelis@nikvelis.temp.swtest.ru',
			destination: 'public_html/',
			clean: true, // Mirror copy with file deletion
			include: [/* '*.htaccess' */], // Included files to deploy,
			exclude: [ '**/Thumbs.db', '**/*.DS_Store' ],
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
}

export { deploy }

