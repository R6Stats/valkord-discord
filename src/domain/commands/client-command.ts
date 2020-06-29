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

  public setReady (state: boolean): void {
    this.ready = state
  }

  public isReady (): boolean {
    return this.ready
  }

  /**
   * Determine if the command should be executed based on the provided context
   *
   * @param {MiddlewareContext} ctx
   * @return {boolean}
   */
  public shouldHandle (ctx: MiddlewareContext): boolean {
    return this.command === ctx.command || this.aliases.includes(ctx.command)
  }

  /**
   * Handles the command and returns the sent messages or nothing if no messages will be sent
   *
   * @param {CommandContext} ctx
   * @return {Promise<void | Message | Message[]>}
   */
  abstract handle (ctx: CommandContext): Promise<void | Message | Message[]>

  /**
   * Override this method to provide custom error handling for ClientExceptions. The overriding
   * method should call the super method if nothing will be done with the error.
   *
   * @param {MiddlewareContext} ctx The CommandContext, providing info about the command executed
   * @param {ClientException} ex The exception that occurred
   * @return {Promise<void | Message | Message[]>}
   */
  public handleException (ctx: MiddlewareContext, ex: ClientException): Promise<void | Message | Message[]> {
    return ctx.reply(ex.message)
  }
}

