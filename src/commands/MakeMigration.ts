import { CLICommand, BaseAddonCommand } from '@discord-factory/core-next'
import Addon from '../index'
import path from 'path'
import fs from 'fs'
import Logger from '@leadcodedev/logger'

@CLICommand({
  name: 'Create migration file',
  prefix: 'make:migration',
  usages: ['filename']
})
export default class MakeMigration extends BaseAddonCommand<Addon> {
  public async run (filename: string): Promise<void> {
    const location = path.parse(filename)
    const targetFile = path.join(process.cwd(), 'src', location.dir, `${location.name}_${Date.now()}.ts`)

    const templateFile = await fs.promises.readFile(
      path.join(__dirname, '..', '..', 'src', 'templates', 'Migration.txt'),
      { encoding: 'utf-8' }) as unknown as string

    const filenameUpper = location.name.charAt(0).toUpperCase() + location.name.slice(1)

    try {
      await fs.promises.mkdir(path.join(process.cwd(), 'src', location.dir), { recursive: true })
      const fileData = templateFile
        .replace(/\$migrationName/g, `${filenameUpper}_${Date.now()}`)
        .replace(/\$tableName/g, filenameUpper.toLowerCase())

      await fs.promises.writeFile(targetFile, fileData)
      Logger.send('info', `File was created in ${targetFile.replace(/\\/g, '\\\\')}`)
    } catch (e) {
      console.log(e)
    }
  }
}