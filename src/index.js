import { readFile, writeFile } from 'fs'

export default function transformFile(inputPath, transform, callback) {
  readFile(inputPath, 'utf8', (readError, input) => {
    if (readError) {
      throw new Error(
        'Error trying to read the file ' + inputPath + '.\n' + readError
      )
    }

    let count = 0
    transform(input)((outputPath, output, amount = 1) =>
      writeFile(outputPath, output, 'utf8', writeError => {
        if (writeError) {
          throw new Error(
            'Error trying to write the file ' + outputPath + '.\n' + writeError
          )
        }

        count++

        if (callback) {
          callback({
            input,
            inputPath,
            output,
            outputPath,
            isDone: amount === count,
          })
        }
      })
    )
  })
}
