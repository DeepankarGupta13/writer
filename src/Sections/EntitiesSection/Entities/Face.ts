import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from '../Entity'

import { Dxfier } from 'Internals/Dxfier'
import { vec3_t } from 'Internals/Helpers'

export enum InvisibleEdgeFlags {
  None = 0,
  First = 1,
  Second = 2,
  Third = 4,
  Fourth = 8,
}

export interface FaceOptions extends CommonEntityOptions {
  invisibleEdges?: InvisibleEdgeFlags
}

export class Face extends Entity {
  firstCorner: vec3_t
  secondCorner: vec3_t
  thirdCorner: vec3_t
  fourthCorner: vec3_t
  invisibleEdges: InvisibleEdgeFlags

  constructor(
    firstCorner: vec3_t,
    secondCorner: vec3_t,
    thirdCorner: vec3_t,
    fourthCorner: vec3_t,
    options?: FaceOptions
  ) {
    super('3DFACE', 'AcDbFace', options)
    this.firstCorner = firstCorner
    this.secondCorner = secondCorner
    this.thirdCorner = thirdCorner
    this.fourthCorner = fourthCorner
    this.invisibleEdges = options?.invisibleEdges || InvisibleEdgeFlags.None
  }

  setFirstEdgeVisible(visible: boolean): void {
    this.setEdgeVisible(InvisibleEdgeFlags.First, visible)
  }

  setSecondEdgeVisible(visible: boolean): void {
    this.setEdgeVisible(InvisibleEdgeFlags.Second, visible)
  }

  setThirdEdgeVisible(visible: boolean): void {
    this.setEdgeVisible(InvisibleEdgeFlags.Third, visible)
  }

  setFourthEdgeVisible(visible: boolean): void {
    this.setEdgeVisible(InvisibleEdgeFlags.Fourth, visible)
  }

  setEdgesVisible(visible: boolean) {
    if (visible) this.invisibleEdges = InvisibleEdgeFlags.None
    else {
      this.invisibleEdges =
        InvisibleEdgeFlags.First |
        InvisibleEdgeFlags.Second |
        InvisibleEdgeFlags.Third |
        InvisibleEdgeFlags.Fourth
    }
  }

  private setEdgeVisible(flag: InvisibleEdgeFlags, visible: boolean): void {
    if (visible) {
      this.invisibleEdges |= flag
    } else {
      if (this.invisibleEdges === (this.invisibleEdges | flag)) this.invisibleEdges ^= flag
    }
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.verticesBBox([
      this.firstCorner,
      this.secondCorner,
      this.thirdCorner,
      this.fourthCorner,
    ])
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.point3d(this.firstCorner)
    dx.push(11, this.secondCorner.x)
    dx.push(21, this.secondCorner.y)
    dx.push(31, this.secondCorner.z)
    dx.push(12, this.thirdCorner.x)
    dx.push(22, this.thirdCorner.y)
    dx.push(32, this.thirdCorner.z)
    dx.push(13, this.fourthCorner.x)
    dx.push(23, this.fourthCorner.y)
    dx.push(33, this.fourthCorner.z)
    dx.push(70, this.invisibleEdges)
  }
}
