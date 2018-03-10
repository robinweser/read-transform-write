import { readFile, writeFile } from 'fs'

export default function transformFile(
  inputPath,
  outputPath,
  transform,
  callback
) {
  readFile(inputPath, 'utf8', (readError, input) => {
    if (readError) {
      throw new Error(
        'Error trying to read the file ' + inputPath + '.\n' + readError
      )
    }

    transform(input)(output =>
      writeFile(outputPath, output, 'utf8', writeError => {
        if (writeError) {
          throw new Error(
            'Error trying to write the file ' + outputPath + '.\n' + writeError
          )
        }

        if (callback) {
          callback({
            input,
            inputPath,
            output,
            outputPath,
          })
        }
      })
    )
  })
}
