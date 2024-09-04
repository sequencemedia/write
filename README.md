# @sequencemedia/write

Intercept writes to a writable stream and duplicate them on another writable stream

```javascript
import {
  stdout,
  stderr
} from 'node:process'

import {
  createWriteStream
} from 'node:fs'

import write from '@sequencemedia/write'

stdout.write = write(stdout, createWriteStream('./stdout.txt'))

stderr.write = write(stderr, createWriteStream('./stderr.txt'))

console.log('Write to the console and `./stdout.txt`')

console.error('Write to the console and `./stderr.txt`')
```
