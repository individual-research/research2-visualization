// hexagon.js
export default {
  shapeSize: 120,
  shapeBuilder,
};

function shapeBuilder(data: any, TemplateAPI: any) {
  const { ShapeStyle, SVGShape, TextCollection, CollectionStyle } = TemplateAPI;

  const shape = SVGShape(`
		<g>
      <circle cx="120" cy="120" r="120" stroke="none"/>
    </g>
	`);
  shape.select('circle').style('fill', data.payload?.color ?? '#9575cd');

  const titleShape = TextCollection(data.payload?.text ?? '', CollectionStyle(50, 240, 5, 130, 0, 0, 1), [
    ShapeStyle('class', 'gly_text.light'),
    ShapeStyle('font-size', '2em'),
  ]);
  shape.append(() => titleShape.node());

  return shape;
}
