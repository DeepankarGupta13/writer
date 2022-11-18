import { describe, expect, it } from 'vitest'

import { Dxfier } from 'Internals/Dxfier'
import { LWPolyline } from 'EntitiesSection/Entities/LWPolyline'
import { point2d } from 'Internals/Helpers'

describe('Polyline', () => {
  const dataState = {
    instancesCount: 0,
  }

  it('should return the given parameters.', () => {
    const entity = new LWPolyline([{ point: point2d(0, 0) }, { point: point2d(120, 54) }], {})
    dataState.instancesCount++
    expect(entity.vertices).toEqual([{ point: point2d(0, 0) }, { point: point2d(120, 54) }])
  })

  it('should return the correct dxf string.', function () {
    const entity = new LWPolyline([{ point: point2d(0, 0) }, { point: point2d(120, 54) }], {})
    dataState.instancesCount++
    const handle = dataState.instancesCount.toString(16).toUpperCase()
    let entityString = `0\nLWPOLYLINE\n5\n${handle}\n100\nAcDbEntity\n8\n0\n100\nAcDbPolyline\n`
    entityString += '90\n2\n70\n0\n43\n0\n38\n0\n39\n0\n10\n0\n20\n0\n10\n120\n20\n54'
    const dx = new Dxfier()
    entity.dxfy(dx)
    expect(dx.stringify()).toBe(entityString)
  })
})
