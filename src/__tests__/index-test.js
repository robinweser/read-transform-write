import { join } from 'path'
import { unlinkSync, existsSync, readFileSync } from 'fs'

import transformFile from '../index'

const inputPath = join(__dirname, '__assets__', 'input.txt')
const outputPath = join(__dirname, '__assets__', 'output.txt')

const outputPathA = join(__dirname, '__assets__', 'outputA.txt')
const outputPathB = join(__dirname, '__assets__', 'outputB.txt')

function clearIfExist(path) {
  if (existsSync(path)) {
    unlinkSync(path)
  }
}

afterEach(() => [outputPath, outputPathA, outputPathB].forEach(clearIfExist))

describe('Transforming files', () => {
  it('should correctly write the file', done => {
    function transform(data) {
      return write =>
        write(
          outputPath,
          data
            .split('\n')
            .map(val => parseInt(val))
            .map(val => val ** 2)
            .join('\n')
        )
    }

    transformFile(
      inputPath,
      transform,
      ({ output, outputPath: passedOutputPath }) => {
        expect(readFileSync(passedOutputPath, 'utf8')).toEqual(output)
        done()
      }
    )
  })

  it('should correctly write multiple files', done => {
    function transform(data) {
      return write => {
        // write A
        write(
          outputPathA,
          data
            .split('\n')
            .map(val => parseInt(val))
            .map(val => val ** 2)
            .join('\n')
        )

        // write B
        write(
          outputPathB,
          data
            .split('\n')
            .map(val => parseInt(val))
            .map(val => val ** 3)
            .join('\n')
        )
      }
    }

    let fileCounter = 0
    transformFile(
      inputPath,
      transform,
      ({ output, outputPath: passedOutputPath }) => {
        expect(readFileSync(passedOutputPath, 'utf8')).toEqual(output)

        ++fileCounter
        if (fileCounter === 2) {
          done()
        }
      }
    )
  })

  it('should correctly call the callback', done => {
    function transform(data) {
      return write =>
        write(
          outputPath,
          data
            .split('\n')
            .map(val => parseInt(val))
            .map(val => val * val)
            .join('\n')
        )
    }

    transformFile(
      inputPath,
      transform,
      ({
        outputPath: passedOutputPath,
        inputPath: passedInputPath,
        output,
        input,
      }) => {
        expect(readFileSync(passedInputPath, 'utf8')).toEqual(input)
        expect(readFileSync(passedOutputPath, 'utf8')).toEqual(output)
        expect(passedInputPath).toEqual(inputPath)
        expect(passedOutputPath).toEqual(outputPath)
        done()
      }
    )
  })
})
