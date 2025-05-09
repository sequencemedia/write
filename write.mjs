import {
  appendFileSync
} from 'node:fs'

import {
  ensureFile
} from 'fs-extra'

import stripAnsi from 'strip-ansi'

function strip (v) {
  return (typeof v === 'string') ? stripAnsi(v) : v
}

function stack ({ stack = '' }) {
  return String(stack) + '\n'
}

function writeTo (filePath, fileData) {
  ensureFile(filePath, (e) => {
    if (!e) appendFileSync(filePath, fileData)
  })
}

function DEFAULT_WRITE () {
  //
}

/**
 *  Intercepts writes to stream `alpha` and directs them to stream `omega`
 *  before continuing with the write
 *
 *  Any error in writes to stream `omega` can be caught and logged to
 *  the file system at path `p`
 *
 *  @param {NodeJS.WriteStream | {write: () => void}} alpha
 *  @param {NodeJS.WriteStream | {write: () => void}} omega
 *  @param {string?} p
 *  @returns {(args: *[]) => void}
 */
export default function getWriteFor (alpha, omega = { write: DEFAULT_WRITE }, p = null) {
  const {
    write = DEFAULT_WRITE
  } = alpha

  return function writeFor (...args) {
    try {
      omega.write(...args.map(strip))
    } catch (e) {
      if (p) writeTo(p, stack(e)) // 🙃
    } finally {
      write.apply(alpha, args)
    }
  }
}
