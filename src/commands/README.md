# CLI Commands

Create here your command files like this structure :
```ts
mport { CLICommand, BaseAddonCommand } from '@discord-factory/core-next'
import Addon from '../index'

@CLICommand({
  name: 'Display command name',
  prefix: 'called prefix', 👈 // for exemple 'migration:rollback'
  usages: []
})
export default class Myommand extends BaseAddonCommand<Addon> {
  public async run (): Promise<void> {
    // Your code here
  }
}
```
