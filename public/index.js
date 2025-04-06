
function Panel(parent) {
	const object = Instantiate_TObject({
		parent,
		x: 0, y: 0, width: 100, height: 100,
		isEnabled: true
	});

	TObject_GetView(object).element.style.backgroundColor = "#fff";

	TObject_AddComponent(object, TAnchorXStretchComponent());
	TObject_AddComponent(object, TAnchorYStretchComponent());

	const componentX = TObject_GetComponent(object, "TAnchorXStretch");
	componentX.SetLeft(50);
	componentX.SetRight(50);

	const componentY = TObject_GetComponent(object, "TAnchorYStretch");
	componentY.SetTop(50);
	componentY.SetBottom(50);

	return object;
}

function Root() {
	const object = Instantiate_TObject({
		parent: null,
		x: 0, y: 0, width: window.innerWidth, height: window.innerHeight,
		isEnabled: true
	});

	TObject_GetView(object).element.style.backgroundColor = "#000";

	Panel(object);

	return object;
}

const ctx = {
	root: null
};

function main() {
	ctx.root = Root();

	window.addEventListener("resize", () => {
		const transform = TObject_GetTransform(ctx.root);

		TTransform_SetWidth(transform, window.innerWidth);
		TTransform_SetHeight(transform, window.innerHeight);
	});
}

main();
