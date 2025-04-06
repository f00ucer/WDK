/**
 * TAnchorXLeftComponent
 */

function TAnchorXLeftComponent() {
	const ctx = {
		object: null
	};

	return {
		name: "TAnchorXLeft",
		
		OnInstantiate: function(object) {
			ctx.object = object;
		},

		GetX: function() {
			const transform = TObject_GetTransform(ctx.object);
			return TTransform_GetX(transform) + TTransform_GetWidth(transform) / 2;
		},
		
		SetX: function(x) {
			const transform = TObject_GetTransform(ctx.object);
			TTransform_SetX(transform, x - TTransform_GetWidth(transform) / 2);
		}
	}
}