/**
 * TAnchorYStretchComponent
 */

function TAnchorYStretchComponent() {
	const ctx = {
		object: null,
		top: null,
		bottom: null
	};

	return {
		name: "TAnchorYStretch",

		OnInstantiate: function(object) {
			ctx.object = object;
			ctx.top = this.GetTop();
			ctx.bottom = this.GetBottom();
		},

		GetTop: function() {
			return TTransform_GetY(TObject_GetTransform(ctx.object));
		},

		GetBottom: function() {
			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pH = parent !== null ? TTransform_GetHeight(TObject_GetTransform(parent)) : window.innerHeight;

			return pH - TTransform_GetY(transform) - TTransform_GetHeight(transform);
		},

		SetTop: function(top) {
			ctx.top = top;

			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pH = parent !== null ? TTransform_GetHeight(TObject_GetTransform(parent)) : window.innerHeight;

			TTransform_SetY(transform, ctx.top);
			TTransform_SetHeight(transform, pH - ctx.top - ctx.bottom);
		},

		SetBottom: function(bottom) {
			ctx.bottom = bottom;

			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pH = parent !== null ? TTransform_GetHeight(TObject_GetTransform(parent)) : window.innerHeight;

			TTransform_SetY(transform, ctx.top);
			TTransform_SetHeight(transform, pH - ctx.top - ctx.bottom);
		},

		OnParentBeforeTransformSet: function(object) {
			ctx.top = this.GetTop();
			ctx.bottom = this.GetBottom();
		},

		OnParentAfterTransformSet: function(object) {
			this.SetTop(ctx.top);
			this.SetBottom(ctx.bottom);
		}
	}
}