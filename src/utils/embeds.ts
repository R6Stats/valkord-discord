import { EmbedFieldData } from 'discord.js'

export class EmbedField {
  private _name: string = ''
  private _inline: boolean = true
  private _values: EmbedFieldLine[] = []


  public name (name: string): EmbedField {
    this._name = name

    return this
  }

  public inline (inline: boolean): EmbedField {
    this._inline = inline

    return this
  }

  public line (title: string, value: string | number): EmbedField {
    this._values.push({ title, value })

    return this
  }

  public build (): EmbedFieldData {
    const value = this._values.map((v) => `**${v.title}**: ${v.value}`)

    return {
      name: this._name,
      inline: this._inline,
      value,
    }
  }
}

export interface EmbedFieldLine {
  title: string
  value: string | number
}
