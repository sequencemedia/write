import {
  createWriteStream
} from 'node:fs'

import stripAnsi from 'strip-ansi'

function strip (v) {
  return (typeof v === 'string') ? stripAnsi(v) : v
}

function stack ({ stack = '' }) {
  return String(stack) + '\n'
}

function writeTo (filePath, fileData) {
  const writer = createWriteStream(filePath, { flags: 'a' })
  writer.write(fileData)
  writer.end()
}

function DEFAULT_WRITE () {
  //
}

export default function getWriteFor (stream, writer = { write: DEFAULT_WRITE }, p = null) {
  const {
    write = DEFAULT_WRITE
  } = stream

  return function writeFor (...args) {
    try {
      writer.write(...args.map(strip))
    } catch (e) {
      if (p) writeTo(p, stack(e)) // 🙃
    } finally {
      write.apply(stream, args)
    }
  }
}
