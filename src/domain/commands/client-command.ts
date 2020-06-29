import { Message } from 'discord.js'
import { ClientException } from '../../exceptions/client.exception'
import { CommandContext, MiddlewareContext } from './command-context'
import { CommandSignature } from './command-signature'

export interface CommandArguments {
}

export abstract class ClientCommand {
  public command: string = ''
  public aliases: string[] = []
  public group: string = ''
  public signature: string | undefined
  public name: string | undefined
  public shortHelp: string = ''
  public parsed: CommandSignature

  protected ready: boolean = false

  public getAliases (): string[] {
    return this.aliases
  }

  public getCommand (): string {
    return this.command
  }

  public hasCommand (input: string): boolean {
    return this.command === input || this.aliases.some(a => a === input)
  }

  public getRawSignature (): string | undefined {
    return this.signature
  }

  public getSignature (): CommandSignature {
    return this.parsed
  }

  public shouldHandle (ctx: MiddlewareContext): boolean {
    return this.command === ctx.command
  }

  public handleException (ctx: MiddlewareContext, ex: ClientException): Promise<void | Message | Message[]> {
    return ctx.reply(ex.message)
  }

  public setReady (state: boolean): void {
    this.ready = state
  }

  public isReady (): boolean {
    return this.ready
  }

  abstract handle (ctx: CommandContext): Promise<void | Message | Message[]>
}

