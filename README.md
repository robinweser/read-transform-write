# read-transform-write

An easy-to-use utility to transform files with a single function.<br>
It uses `fs.readFile` and `fs.writeFile` under the hood and throws an error if something goes wrong.<br>
The `encoding` is set to `utf8`. If you need something else, please file an issue.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/read-transform-write.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/read-transform-write/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/read-transform-write/badges/coverage.svg"></a> <img alt="npm version" src="https://badge.fury.io/js/read-transform-write.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/read-transform-write.svg"> <img alt="dependencies" src="https://david-dm.org/rofrischmann/read-transform-write.svg">

## Support Me
If you're using [Robin Frischmann](https://rofrischmann.de)'s work, please consider supporting his [Open Source Projects](https://github.com/rofrischmann) on [**Patreon**](https://www.patreon.com/rofrischmann).

## Installation
```sh
# yarn
yarn add read-transform-write

# npm
npm i --save read-transform-write
```

## Usage

### Parameter

| Parameter | Type | Description |
| --- | --- | --- |
| inputPath | (*string*) | The absolute path to the input file. |
| transform | (*Function*) | The transformation method.<br>It receives the input data and returns method receving a write-method that must be called with the transformed data and a output path. |
| callback | (*Function?*) | An optional callback that receives an object with the callback shape. |

#### Callback Shape
```javascript
type Callback {
  inputPath: string,
  outputPath: string,
  input: string,
  output: string
}
```

### Example
```javascript
import { join } from 'path'
import transformFile from 'read-transform-write'

const input = join(__dirname, 'input.txt')
const output = join(__dirname, 'output.txt')

const transform = data => write => write(
  output,
  data
    .split('\n')
    .map(val => parseInt(val, 10))
    .map(Math.sqrt)
    .join('\n')
)

transformFile(
  input,
  transform,
  ({ output, outputPath }) => {
    console.log(`Written ${output} to ${outputPath}.`)
  }
)
```

##### input.txt
```
49
36
25
16
```

##### output.txt
```
7
6
5
4
```


## License
read-transform-write is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
