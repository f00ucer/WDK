/**
 * TAnchorXCenterComponent
 */

function TAnchorXCenterComponent() {
	const ctx = {
		object: null,
		x: null
	};

	return {
		name: "TAnchorXCenter",

		OnInstantiate: function(object) {
			ctx.object = object;
			ctx.x = this.GetX();
		},

		GetX: function() {
			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pW = parent !== null ? TTransform_GetWidth(TObject_GetTransform(parent)) : window.innerWidth;

			return TTransform_GetX(transform) - pW / 2 + TTransform_GetWidth(transform) / 2;
		},

		SetX: function(x) {
			ctx.x = x;

			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pW = parent !== null ? TTransform_GetWidth(TObject_GetTransform(parent)) : window.innerWidth;

			TTransform_SetX(transform, ctx.x + pW / 2 - TTransform_GetWidth(transform) / 2);
		},

		OnParentBeforeTransformSet: function(object) {
			ctx.x = this.GetX();
		},

		OnParentAfterTransformSet: function(object) {
			this.SetX(ctx.x);
		}
	}
}