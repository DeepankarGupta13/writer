import DxfStyle from './Records/DxfStyle'
import DxfTable from '../DxfTable'

export default class DxfStyleTable extends DxfTable<DxfStyle> {
  constructor() {
    super('STYLE')
  }

  addStyle(name: string, flags?: number): DxfStyle {
    const r = new DxfStyle(name, flags)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
