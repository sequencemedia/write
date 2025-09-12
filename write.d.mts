import type { WriteStream } from 'node:fs'

export default function getWriteFor (alpha: NodeJS.WriteStream, omega: NodeJS.WriteStream | WriteStream, s?: boolean, p?: string): (...args: unknown[]) => boolean
