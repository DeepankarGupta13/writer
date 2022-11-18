import DxfAppId, { AppIdFlags } from './Records/DxfAppId'

import DxfTable from '../DxfTable'

export default class AppIdTable extends DxfTable<DxfAppId> {
  constructor() {
    super('APPID')
  }

  addAppId(name: string, flags?: AppIdFlags) {
    const r = new DxfAppId(name, flags)
    r.ownerObjectHandle = this.handle
    this.records.push(r)
    return r
  }
}
