import DxfWriter, { point2d, point3d } from '../lib';
import * as fs from 'fs';
import { createBlock } from '../lib';

const dxf = new DxfWriter();

/*dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0), {});
dxf.addLWPolyline(
	[point3d(200, 0, 0), point3d(300, 100, 0), point3d(300, 200, 0)],
	129,
	{}
);*/
/*dxf.addImage(
	'E:/GitHub/dxf/examples/X_462419.04_Y_576568.45_S_433.54_R_359.74.png',
	'X_462419.04_Y_576568.45_S_433.54_R_359.74',
	point3d(462419.04, 576568.45, 0),
	1792,
	1280,
	433.54,
	360 - 359.74
);*/

/*dxf.addLineType('AXES', '____ _ ', [4, -1, 1, -1]);

dxf.addRectangle(point2d(400, 400), point2d(600, 200), {
	elevation: 30,
	constantWidth: 10,
	lineType: 'AXES',
	lineTypeScale: 10,
});*/

const circleBlock = createBlock('circle');
circleBlock.addCircle(point3d(0, 0, 0), 50);
circleBlock.addRectangle(
	point2d(-35.3553, 35.3553),
	point2d(35.3553, -35.3553)
);

dxf.addInsert(circleBlock.name, point3d(0, 0, 0), {
	scaleFactor: {
		x: 2,
		y: 2,
	},
});

fs.writeFileSync('examples/example.dxf', dxf.stringify());
console.log('Exec!!');
