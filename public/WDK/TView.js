/**
 * TView
 */

function Instantiate_TView() {
	const view = {
		element: document.createElement("div")
	};

	view.element.style.position = "absolute";

	return view;
}

function Dispose_TView(view) {
	view.element.remove();
	view.element = null;
}

function TView_SetLeft(view, left) {
	view.element.style.left = left + "px";
}

function TView_SetTop(view, top) {
	view.element.style.top = top + "px";
}

function TView_SetWidth(view, width) {
	view.element.style.width = width + "px";
}

function TView_SetHeight(view, height) {
	view.element.style.height = height + "px";
}

function TView_Enable(view) {
	view.element.style.display = "block";
}

function TView_Disable(view) {
	view.element.style.display = "none";
}

function TView_SetParent(view, parentView) {
	if (parentView !== null) {
		parentView.element.appendChild(view.element);
	} else {
		document.body.appendChild(view.element);
	}
}
