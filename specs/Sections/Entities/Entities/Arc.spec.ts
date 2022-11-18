import { beforeEach, describe, expect, it } from 'vitest'

import { Arc } from 'EntitiesSection/Entities/Arc'
import { Dxfier } from 'Internals/Dxfier'
import { point3d } from 'Internals/Helpers'

describe('Arc', () => {
  const dataState = {
    instancesCount: 0,
  }

  let entity: Arc

  beforeEach(() => {
    entity = new Arc(point3d(10, 1250, 63.3), 120, 0, 120, {})
    dataState.instancesCount++
  })

  it('should return the center given.', () => {
    expect(entity.center.x).toBe(10)
    expect(entity.center.y).toBe(1250)
    expect(entity.center.z).toBe(63.3)
  })

  it('should return the start and end angle given.', () => {
    expect(entity.startAngle).toBe(0)
    expect(entity.endAngle).toBe(120)
  })

  it('should return the radius given.', () => {
    expect(entity.radius).toBe(120)
  })

  it('should return the correct dxf string.', () => {
    const handle = dataState.instancesCount.toString(16).toUpperCase()
    let entityString = `0\nARC\n5\n${handle}\n100\nAcDbEntity\n8\n0\n100\nAcDbCircle\n`
    entityString += '10\n10\n20\n1250\n30\n63.3\n40\n120\n100\nAcDbArc\n50\n0\n51\n120'
    const dx = new Dxfier()
    entity.dxfy(dx)
    expect(dx.stringify()).toBe(entityString)
  })
})
