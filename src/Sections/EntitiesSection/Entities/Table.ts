import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from 'EntitiesSection/Entity'
import { point3d, vec3_t } from 'Internals/Helpers'
import { Dxfier } from 'Internals/Dxfier'

export interface TableOptions extends CommonEntityOptions {
  horizontalDirectionVector: vec3_t
  cell: Cell[]
}

export enum CellType {
  Text = 1,
  Block = 2,
}

export enum CellMerged {
  False = 0,
  True = 1,
}

export enum CellAutoFitFlag {
    False = 0,
    True = 1,
}

export enum CellAlignment {
  TopLeft = 1,
  TopCenter = 2,
  TopRight = 3,
  MiddleLeft = 4,
  MiddleCenter = 5,
  MiddleRight = 6,
  BottomLeft = 7,
  BottomCenter = 8,
  BottomRight = 9,
}

export interface CellOptions extends CommonEntityOptions {
  cellType?: CellType
  cellMerged?: boolean
  cellAutoFitFlag?: boolean
  cellBorderWidth?: number
  cellBorderHeight?: number
  cellRotationValue?: number
  cellText: string
  cellTextHeight: number
  cellAlignment: CellAlignment
}

export class Cell {
  cellType: CellType
  cellMerged: boolean
  cellAutoFit: boolean
  cellBorderWidth: number
  cellBorderHeight: number
  cellRotationValue: number
  cellText?: string
  cellTextHeight?: number
  cellAlignment: CellAlignment

  constructor(options: CellOptions) {
    this.cellType = options?.cellType || CellType.Text
    this.cellMerged = options?.cellMerged || false
    this.cellAutoFit = options?.cellAutoFitFlag || false
    this.cellBorderWidth = options?.cellBorderWidth ?? 1
    this.cellBorderHeight = options?.cellBorderHeight ?? 1
    this.cellRotationValue = options?.cellRotationValue ?? 0
    this.cellText = options?.cellText
    this.cellTextHeight = options?.cellTextHeight
    this.cellAlignment = options?.cellAlignment ?? CellAlignment.MiddleCenter
  }

  dxfy(dx: Dxfier) {
    dx.push(171, this.cellType)
    dx.push(173, Number(this.cellMerged))
    dx.push(174, Number(this.cellAutoFit))
    dx.push(175, this.cellBorderWidth)
    dx.push(176, this.cellBorderHeight)
    dx.push(145, this.cellRotationValue)
    dx.push(170, this.cellAlignment)
    dx.push(91, 262177) // Cell override flag the flag vale is 262176 for textHeight override, 262177 for Attachment and textHeight override.
    dx.push(140, this.cellTextHeight) // overriden text height.
    dx.push(301, 'CELL_VALUE')
    dx.push(90, this.cellText ? 4 : 0)
    dx.push(1, this.cellText)
    dx.push(300, '')
    dx.push(302, this.cellText ?? '')
    dx.push(304, 'ACVALUE_END')
  }
}

export class Table extends Entity {
  blockName: string
  position: vec3_t
  numberOfRows: number
  numberOfColumn: number
  horizontalDirectionVector: vec3_t
  rowsHeight: number[]
  columnsHeight: number[]
  cells: Cell[]

  constructor(
    blockName: string,
    position: vec3_t,
    numberOfRows: number,
    numberOfColumn: number,
    rowsHeight: number[],
    columnsHeight: number[],
    options: TableOptions
  ) {
    super('ACAD_TABLE', 'AcDbBlockReference', options)
    this.blockName = blockName
    this.position = position
    this.numberOfRows = numberOfRows
    this.numberOfColumn = numberOfColumn
    this.rowsHeight = rowsHeight
    this.columnsHeight = columnsHeight
    this.horizontalDirectionVector = options?.horizontalDirectionVector || point3d(1)
    this.cells = options?.cell
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.pointBBox(this.position)
  }

  protected override dxfyChild(dx: Dxfier): void {
    dx.name(this.blockName)
    dx.point3d(this.position)
    dx.subclassMarker('AcDbTable')
    dx.point3d(this.horizontalDirectionVector, 1)
    dx.push(91, this.numberOfRows)
    dx.push(92, this.numberOfColumn)
    for (let i = 0; i < this.numberOfRows; i++) {
      dx.push(141, this.rowsHeight[i] ?? this.rowsHeight[0] ?? 1)
    }
    for (let i = 0; i < this.numberOfColumn; i++) {
      dx.push(142, this.columnsHeight[i] ?? this.columnsHeight[0] ?? 1)
    }
    this.cells.forEach((cell) => cell.dxfy(dx))
  }
}
