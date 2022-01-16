import DxfObject from '../DxfObject';
import TagsManager from '../../../Internals/TagsManager';

export type entryObject_t = {
	name: string;
	softOwner: string;
};

export default class DxfDictionary extends DxfObject {
	private _entries: entryObject_t[] = [];

	private _hardOwnerFlag: number | null = null;
	private _duplicateRecordCloningFlag: number = 0;

	public get entries(): entryObject_t[] {
		return this._entries;
	}

	public get hardOwnerFlag(): number | null {
		return this._hardOwnerFlag;
	}

	public set hardOwnerFlag(value: number | null) {
		this._hardOwnerFlag = value;
	}

	public get duplicateRecordCloningFlag(): number {
		return this._duplicateRecordCloningFlag;
	}

	public set duplicateRecordCloningFlag(value: number) {
		this._duplicateRecordCloningFlag = value;
	}

	public constructor() {
		super('DICTIONARY');
	}

	public addEntryObject(name: string, softOwner: string) {
		this._entries.push({
			name,
			softOwner,
		});
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbDictionary');
		if (this.hardOwnerFlag) manager.addTag(280, this.hardOwnerFlag);
		manager.addTag(281, this.duplicateRecordCloningFlag);
		this.entries.forEach((entry) => {
			manager.addTag(3, entry.name);
			manager.addTag(350, entry.softOwner);
		});
		return manager;
	}
}
