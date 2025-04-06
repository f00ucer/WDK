/**
 * TAnchorXStretchComponent
 */

function TAnchorXStretchComponent() {
	const ctx = {
		object: null,
		left: null,
		right: null
	};

	return {
		name: "TAnchorXStretch",

		OnInstantiate: function(object) {
			ctx.object = object;
			ctx.left = this.GetLeft();
			ctx.right = this.GetRight();
		},

		GetLeft: function() {
			return TTransform_GetX(TObject_GetTransform(ctx.object));
		},

		GetRight: function() {
			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pW = parent !== null ? TTransform_GetWidth(TObject_GetTransform(parent)) : window.innerWidth;

			return pW - TTransform_GetX(transform) - TTransform_GetWidth(transform);
		},

		SetLeft: function(left) {
			ctx.left = left;

			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pW = parent !== null ? TTransform_GetWidth(TObject_GetTransform(parent)) : window.innerWidth;

			TTransform_SetX(transform, ctx.left);
			TTransform_SetWidth(transform, pW - ctx.left - ctx.right);
		},

		SetRight: function(right) {
			ctx.right = right;

			const transform = TObject_GetTransform(ctx.object);
			const parent = TObject_GetParent(ctx.object);

			const pW = parent !== null ? TTransform_GetWidth(TObject_GetTransform(parent)) : window.innerWidth;

			TTransform_SetX(transform, ctx.left);
			TTransform_SetWidth(transform, pW - ctx.left - ctx.right);
		},

		OnParentBeforeTransformSet: function(object) {
			ctx.left = this.GetLeft();
			ctx.right = this.GetRight();
		},

		OnParentAfterTransformSet: function(object) {
			this.SetLeft(ctx.left);
			this.SetRight(ctx.right);
		}
	}
}