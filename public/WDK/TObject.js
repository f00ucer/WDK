/**
 * TObject
 */

function Instantiate_TObject({
	parent = null,
	x = 0,
	y = 0,
	width = 400,
	height = 300,
	isEnabled = false
} = {}) {
	const object = {
		parent: null,
		objectArray: [],
		isEnabled,
		componentArray: []
	};

	object.view = Instantiate_TView();
	object.transform = Instantiate_TTransform(object, x, y, width, height);

	if (object.isEnabled) {
		TView_Enable(object.view);
	} else {
		TView_Disable(object.view);
	}

	TObject_SetParent(object, parent);

	TObject_OnInstantiate(object);

	return object;
}

function Dispose_TObject(object) {
	const stack = [object];
	const sequence = [];

	while (stack.length > 0) {
		const pointer = stack.pop();

		const array = pointer.objectArray.slice();
		for (const x of array)
			stack.push(x);

		sequence.push(pointer);
	}

	while (sequence.length > 0) {
		const pointer = sequence.pop();

		TObject_OnDispose(pointer);

		let onDetached = null;

		if (pointer.parent !== null) {
			onDetached = {
				object: pointer.parent
			};
			pointer.parent.objectArray.splice(pointer.parent.objectArray.indexOf(pointer), 1);
			pointer.parent = null;
		}

		pointer.objectArray = null;

		pointer.isEnabled = null;

		pointer.componentArray = null;

		TTransform_Dispose(pointer.transform);
		pointer.transform = null;

		TView_Dispose(pointer.view);
		pointer.view = null;

		if (onDetached !== null)
			TObject_OnDetached(onDetached.object);
	}
}

function TObject_GetTransform(object) {
	return object.transform;
}

function TObject_GetView(object) {
	return object.view;
}

function TObject_IsEnabled(object) {
	return object.isEnabled;
}

function TObject_Enable(object) {
	object.isEnabled = true;
	TView_Enable(object.view);
	TObject_OnEnable(object);
}

function TObject_Disable(object) {
	object.isEnabled = false;
	TView_Disable(object.view);
	TObject_OnDisable(object);
}

function TObject_GetParent(object) {
	return object.parent;
}

function TObject_SetParent(object, parent) {
	if (object.parent !== null || parent !== null)
		if (object.parent === parent)
			return 0;

	if (object === parent) {
		console.log("[TObject_SetParent] Cannot set an object as its own parent.");
		return -1;
	}

	let pointer = parent;
	while (pointer !== null) {
		if (pointer === object) {
			console.log("[TObject_SetParent] It is not allowed to create circular references.");
			return -2;
		}

		pointer = pointer.parent;
	}

	let onDetached = null;
	let onAttached = null;

	if (object.parent !== null) {
		onDetached = {
			object: object.parent
		};
		object.parent.objectArray.splice(object.parent.objectArray.indexOf(object), 1);
	}

	object.parent = parent;
	if (object.parent !== null) {
		onAttached = {
			object: object.parent
		};
		object.parent.objectArray.push(object);
	}

	TView_SetParent(object.view, object.parent !== null ? object.parent.view : null);

	if (onDetached !== null)
		TObject_OnDetached(onDetached.object);

	if (onAttached !== null)
		TObject_OnAttached(onAttached.object);

	TObject_OnParentSet(object);

	return 0;
}

function TObject_GetObjectArray(object) {
	return object.objectArray;
}

function TObject_AddComponent(object, component) {
	if (!component.name)
		return -1;

	object.componentArray.push(component);

	if (component.OnInstantiate)
		component.OnInstantiate(object);

	return 0;
}

function TObject_DisposeComponent(object, component) {
	const index = object.componentArray.indexOf(component);

	if (index !== -1) {
		if (component.OnDispose)
			component.OnDispose(object);

		object.componentArray.splice(index, 1);
	}
}

function TObject_GetComponent(object, componentName) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].name === componentName)
			return object.componentArray[i];

	return null;
}

function TObject_GetComponentArray(object, componentName) {
	const array = [];

	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].name === componentName)
			array.push(object.componentArray[i]);

	return array;
}

function TObject_GetComponentInParent(object, componentName) {
	let pointer = object;
	while (pointer !== null) {
		const component = TObject_GetComponent(pointer, componentName);

		if (component !== null)
			return component;

		pointer = pointer.parent;
	}

	return null;
}

function TObject_GetComponentArrayInParent(object, componentName) {
	const array = [];

	let pointer = object;
	while (pointer !== null) {
		array.concat(TObject_GetComponentArray(pointer, componentName));

		pointer = pointer.parent;
	}

	return array;
}

function TObject_GetComponentInTree(object, componentName) {
	const stack = [object];
	const sequence = [];

	while (stack.length > 0) {
		const pointer = stack.pop();

		for (const x of pointer.objectArray)
			stack.push(x);

		sequence.push(pointer);
	}

	for (const x of sequence) {
		const component = TObject_GetComponent(x, componentName);

		if (component !== null)
			return component;
	}

	return null;
}

function TObject_GetComponentArrayInTree(object, componentName) {
	const array = [];

	const stack = [object];
	const sequence = [];

	while (stack.length > 0) {
		const pointer = stack.pop();

		for (const x of pointer.objectArray)
			stack.push(x);

		sequence.push(pointer);
	}

	for (const x of sequence)
		array.concat(TObject_GetComponentArray(x, componentName));

	return array;
}

function TObject_OnInstantiate(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnInstantiate)
			object.componentArray[i].OnInstantiate(object);
}

function TObject_OnAttached(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnAttached)
			object.componentArray[i].OnAttached(object);
}

function TObject_OnDetached(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnDetached)
			object.componentArray[i].OnDetached(object);
}

function TObject_OnParentSet(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnParentSet)
			object.componentArray[i].OnParentSet(object);
}

function TObject_OnEnable(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnEnable)
			object.componentArray[i].OnEnable(object);
}

function TObject_OnDisable(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnDisable)
			object.componentArray[i].OnDisable(object);
}

function TObject_OnDispose(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnDispose)
			object.componentArray[i].OnDispose(object);
}

function TObject_OnBeforeTransformSet(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnBeforeTransformSet)
			object.componentArray[i].OnBeforeTransformSet(object);

	for (let i = 0; i < object.objectArray.length; i++)
		TObject_OnParentBeforeTransformSet(object.objectArray[i]);
}

function TObject_OnAfterTransformSet(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnAfterTransformSet)
			object.componentArray[i].OnAfterTransformSet(object);

	for (let i = 0; i < object.objectArray.length; i++)
		TObject_OnParentAfterTransformSet(object.objectArray[i]);
}

function TObject_OnParentBeforeTransformSet(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnParentBeforeTransformSet)
			object.componentArray[i].OnParentBeforeTransformSet(object);
}

function TObject_OnParentAfterTransformSet(object) {
	for (let i = 0; i < object.componentArray.length; i++)
		if (object.componentArray[i].OnParentAfterTransformSet)
			object.componentArray[i].OnParentAfterTransformSet(object);
}
