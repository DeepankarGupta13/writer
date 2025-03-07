import {BoundingBox, boundingBox_t} from 'Internals/BoundingBox'
import {TextGenerationFlags, TextHorizontalAlignment, TextOptions, TextVerticalAlignment} from 'EntitiesSection/Entities/Text'
import {Dxfier} from 'Internals/Dxfier'
import Entity from '../Entity'
import {vec3_t} from 'Internals/Helpers'

export class Attrib extends Entity {
  tag: string
  position: vec3_t
  height: number
  value: string
  textStyle: string

  rotation?: number
  obliqueAngle?: number
  generationFlags?: TextGenerationFlags
  horizontalAlignment?: TextHorizontalAlignment
  verticalAlignment?: TextVerticalAlignment
  secondAlignmentPoint?: vec3_t
  relativeXScaleFactor?: number
  constructor(firstAlignmentPoint: vec3_t, height: number, tag: string, value: string, options?: TextOptions) {
    super('ATTRIB', 'AcDbText', options)
    this.position = firstAlignmentPoint
    this.height = height
    this.value = value
    this.tag = tag
    this.textStyle = 'STANDARD'
    this.rotation = options?.rotation
    this.obliqueAngle = options?.obliqueAngle
    this.generationFlags = options?.generationFlags
    this.horizontalAlignment = options?.horizontalAlignment
    this.verticalAlignment = options?.verticalAlignment
    this.secondAlignmentPoint = options?.secondAlignmentPoint
    this.relativeXScaleFactor = options?.relativeXScaleFactor
  }

  override boundingBox(): boundingBox_t {
    // I have no idea how to get boundingBox of TEXT :(
    return BoundingBox.pointBBox(this.position)
  }
  protected override dxfyChild(dx: Dxfier): void {
    dx.point3d(this.position)
    dx.push(40, this.height)
    dx.primaryText(this.value)
    dx.push(50, this.rotation)
    dx.push(41, this.relativeXScaleFactor)
    dx.push(51, this.obliqueAngle)
    dx.textStyle(this.textStyle)
    dx.push(71, this.generationFlags)
    dx.push(72, this.horizontalAlignment)
    dx.point3d(this.secondAlignmentPoint, 1)
    dx.push(73, this.verticalAlignment)
    dx.subclassMarker('AcDbAttribute')
    dx.push(280, 0)
    dx.push(2, this.tag)
    dx.push(70, 0)
  }
}
