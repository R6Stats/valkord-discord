import { Message } from 'discord.js'
import { ClientException } from '../../exceptions/client.exception'
import { CommandContext, MiddlewareContext } from './command-context'
import { CommandSignature } from './command-signature'
import { InvalidArgumentException } from '../../exceptions/invalid-argument.exception'
import { MissingArgumentException } from '../../exceptions/missing-argument.exception'
import { ArgumentLengthException } from '../../exceptions/argument-length.exception'

export interface CommandArguments {
}

export abstract class ValkordCommand {
  public command: string = ''
  public aliases: string[] = []
  public group: string = ''
  public signature: string | undefined
  public name: string | undefined
  public shortHelp: string = ''
  public parsed: CommandSignature

  protected ready: boolean = false

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

  /**
   * Override this method to provide a custom help message when an argument related exception is
   * caught. By default, the help handler will attempt to send the `shortHelp` messsage specified
   * in the ValkordCommand class, otherwise falling back to `this.handleException()`
   *
   * @param {MiddlewareContext} ctx
   * @param {ClientException} ex
   * @return {Promise<void | Message | Message[]>}
   */
  public help (ctx: MiddlewareContext, ex: InvalidArgumentException | MissingArgumentException | ArgumentLengthException): Promise<void | Message | Message[]> {
    if (this.shortHelp && this.shortHelp.trim() !== '') {
      return ctx.reply(this.shortHelp)
    }

    return this.handleException(ctx, ex)
  }
}

