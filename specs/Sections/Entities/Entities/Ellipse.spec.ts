import { describe, expect, it } from 'vitest'

import { Dxfier } from 'Internals/Dxfier'
import { Ellipse } from 'EntitiesSection/Entities/Ellipse'
import { point3d } from 'Internals/Helpers'

describe('Ellipse', () => {
  const dataState = {
    instancesCount: 0,
  }

  it('should return the center given.', () => {
    const entity = new Ellipse(
      point3d(10, 1250, 63.3),
      point3d(100, 50, 0),
      0.4243,
      0,
      2 * Math.PI,
      {}
    )
    dataState.instancesCount++
    expect(entity.center.x).toBe(10)
    expect(entity.center.y).toBe(1250)
    expect(entity.center.z).toBe(63.3)
  })

  it('should return the given parameters', () => {
    const entity = new Ellipse(
      point3d(10, 1250, 63.3),
      point3d(100, 50, 0),
      0.4243,
      0,
      2 * Math.PI,
      {}
    )
    dataState.instancesCount++
    expect(entity.endPointOfMajorAxis.x).toBe(100)
    expect(entity.endPointOfMajorAxis.y).toBe(50)
    expect(entity.ratioOfMinorAxisToMajorAxis).toBe(0.4243)
    expect(entity.startParameter).toBe(0)
    expect(entity.endParameter).toBe(2 * Math.PI)
  })

  it('should return the correct dxf string.', () => {
    const entity = new Ellipse(
      point3d(10, 1250, 63.3),
      point3d(100, 50, 0),
      0.4243,
      0,
      2 * Math.PI,
      {}
    )
    dataState.instancesCount++
    const handle = dataState.instancesCount.toString(16).toUpperCase()
    let entityString = `0\nELLIPSE\n5\n${handle}\n100\nAcDbEntity\n8\n0\n100\nAcDbEllipse\n`
    entityString += '10\n10\n20\n1250\n30\n63.3\n11\n100\n21\n50\n31\n0\n40\n0.4243\n41\n0\n42\n6.283185307179586'
    const dx = new Dxfier()
    entity.dxfy(dx)
    expect(dx.stringify()).toBe(entityString)
  })
})
