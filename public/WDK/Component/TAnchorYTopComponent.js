/**
 * TAnchorYTopComponent
 */

function TAnchorYTopComponent() {
	const ctx = {
		object: null
	};

	return {
		name: "TAnchorYTop",

		OnInstantiate: function(object) {
			ctx.object = object;
		},

		GetY: function() {
			const transform = TObject_GetTransform(ctx.object);
			return TTransform_GetY(transform) + TTransform_GetHeight(transform) / 2;
		},

		SetY: function(y) {
			const transform = TObject_GetTransform(ctx.object);
			TTransform_SetY(transform, y - TTransform_GetHeight(transform) / 2);
		}
	}
}
