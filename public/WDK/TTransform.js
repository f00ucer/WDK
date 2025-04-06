/**
 * TTransform
 */

function Instantiate_TTransform(object, x, y, width, height) {
	const transform = {
		object
	};

	TTransform_SetX(transform, x);
	TTransform_SetY(transform, y);
	TTransform_SetWidth(transform, width);
	TTransform_SetHeight(transform, height);

	return transform;
}

function Dispose_TTransform(transform) {
	transform.object = null;
	transform.x = null;
	transform.y = null;
	transform.width = null;
	transform.height = null;
}

function TTransform_GetX(transform) {
	return transform.x;
}

function TTransform_SetX(transform, x) {
	TObject_OnBeforeTransformSet(transform.object);
	transform.x = x;
	TView_SetLeft(TObject_GetView(transform.object), x);
	TObject_OnAfterTransformSet(transform.object);
}

function TTransform_GetY(transform) {
	return transform.y;
}

function TTransform_SetY(transform, y) {
	TObject_OnBeforeTransformSet(transform.object);
	transform.y = y;
	TView_SetTop(TObject_GetView(transform.object), y);
	TObject_OnAfterTransformSet(transform.object);
}

function TTransform_GetWidth(transform) {
	return transform.width;
}

function TTransform_SetWidth(transform, width) {
	TObject_OnBeforeTransformSet(transform.object);
	transform.width = width;
	TView_SetWidth(TObject_GetView(transform.object), width);
	TObject_OnAfterTransformSet(transform.object);
}

function TTransform_GetHeight(transform) {
	return transform.height;
}

function TTransform_SetHeight(transform, height) {
	TObject_OnBeforeTransformSet(transform.object);
	transform.height = height;
	TView_SetHeight(TObject_GetView(transform.object), height);
	TObject_OnAfterTransformSet(transform.object);
}
