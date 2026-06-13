import type { WriteStream } from 'node:fs'

export default function getWriteFor (alpha: WriteStream | { write: () => void }, omega: WriteStream | { write: () => void }, s?: boolean, p?: string): (...args: unknown[]) => boolean
