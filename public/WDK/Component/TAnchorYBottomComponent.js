/**
 * TAnchorYBottomComponent
 */

function TAnchorYBottomComponent() {
	const ctx = {
		object: null,
		y: null
	};

	return {
		name: "TAnchorYBottom",

		OnInstantiate: function(object) {
			ctx.object = object;
			ctx.y = this.GetY();
		},

		GetY: function() {
			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pH = parent !== null ? TTransform_GetHeight(TObject_GetTransform(parent)) : window.innerHeight;

			return TTransform_GetY(transform) - pH + TTransform_GetHeight(transform) / 2;
		},

		SetY: function(y) {
			ctx.y = y;

			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pH = parent !== null ? TTransform_GetHeight(TObject_GetTransform(parent)) : window.innerHeight;

			TTransform_SetY(transform, ctx.y + pH - TTransform_GetHeight(transform) / 2);
		},

		OnParentBeforeTransformSet: function(object) {
			ctx.y = this.GetY();
		},

		OnParentAfterTransformSet: function(object) {
			this.SetY(ctx.y);
		}
	}
}