import { join } from 'path'
import { unlinkSync, existsSync, readFileSync } from 'fs'

import transformFile from '../index'

const inputPath = join(__dirname, '__assets__', 'input.txt')
const outputPath = join(__dirname, '__output__', 'output.txt')

afterEach(() => existsSync(outputPath) && unlinkSync(outputPath))

describe('Transforming files', () => {
  it('should correctly write the file', done => {
    function transform(data) {
      return write =>
        write(
          data
            .split('\n')
            .map(parseInt)
            .map(val => val ^ 2)
            .join('\n')
        )
    }

    transformFile(inputPath, outputPath, transform, ({ output }) => {
      expect(readFileSync(outputPath, 'utf8')).toEqual(output)
      done()
    })
  })

  it('should correctly call the callback', done => {
    function transform(data) {
      return write =>
        write(
          data
            .split('\n')
            .map(val => parseInt(val) * parseInt(val))
            .join('\n')
        )
    }

    transformFile(
      inputPath,
      outputPath,
      transform,
      ({
        outputPath: passedOutputPath,
        inputPath: passedInputPath,
        output,
        input,
      }) => {
        expect(readFileSync(inputPath, 'utf8')).toEqual(input)
        expect(readFileSync(outputPath, 'utf8')).toEqual(output)
        expect(passedInputPath).toEqual(inputPath)
        expect(passedOutputPath).toEqual(outputPath)
        done()
      }
    )
  })
})
