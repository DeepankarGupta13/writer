import DxfTable from '../DxfTable';
import DxfLineType from './Records/DxfLineType';
import TagsManager from '../../../Internals/TagsManager';

export default class DxfLineTypeTable extends DxfTable {
	private readonly _lineTypeRecords: DxfLineType[] = [];

	get lineTypeRecords(): DxfLineType[] {
		return this._lineTypeRecords;
	}

	public constructor() {
		super('LTYPE');
	}

	public exist(name: string): boolean {
		return (
			this.lineTypeRecords.find((lineTypeRecord) => {
				return lineTypeRecord.name === name;
			}) !== undefined
		);
	}

	public addLineType(name: string, descriptive: string, elements: number[]) {
		const lineTypeRecord = new DxfLineType(name, descriptive, elements);
		lineTypeRecord.softPointer = this.handle;
		this._lineTypeRecords.push(lineTypeRecord);
		return lineTypeRecord;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		this.maxNumberEntries = this.lineTypeRecords.length;
		manager.pushTags(super.manager.tags);
		this.lineTypeRecords.forEach((lineTypeRecord) => {
			manager.appendTags(lineTypeRecord);
		});
		manager.entityType('ENDTAB');
		return manager;
	}
}
