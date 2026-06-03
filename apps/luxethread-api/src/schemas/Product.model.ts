import { Schema } from 'mongoose';
import {
	ProductCategory,
	ProductColor,
	ProductFit,
	ProductMaterial,
	ProductSize,
	ProductStatus,
	ProductType,
} from '../libs/enums/product.enum';

const ProductSchema = new Schema(
	{
		productCategory: {
			type: String,
			enum: ProductCategory,
			required: true,
		},

		productType: {
			type: String,
			enum: ProductType,
			required: true,
		},

		productStatus: {
			type: String,
			enum: ProductStatus,
			default: ProductStatus.ACTIVE,
		},

		productSizes: {
			type: [String],
			enum: ProductSize,
			required: true,
			validate: {
				validator: (value: ProductSize[]) => Array.isArray(value) && value.length > 0,
				message: 'productSizes must include at least one size',
			},
		},

		productColors: {
			type: [String],
			enum: ProductColor,
			required: true,
			validate: {
				validator: (value: ProductColor[]) => Array.isArray(value) && value.length > 0,
				message: 'productColors must include at least one color',
			},
		},

		productMaterial: {
			type: String,
			enum: ProductMaterial,
			required: true,
		},

		productFit: {
			type: String,
			enum: ProductFit,
			required: true,
		},

		productOrigin: {
			type: String,
			required: true,
		},

		productTitle: {
			type: String,
			required: true,
		},

		productPrice: {
			type: Number,
			required: true,
		},

		productViews: {
			type: Number,
			default: 0,
		},

		productLikes: {
			type: Number,
			default: 0,
		},

		productComments: {
			type: Number,
			default: 0,
		},

		productRank: {
			type: Number,
			default: 0,
		},

		productImages: {
			type: [String],
			required: true,
		},

		productDesc: {
			type: String,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		soldAt: {
			type: Date,
		},

		deletedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'products' },
);

ProductSchema.index(
	{ productCategory: 1, productType: 1, productOrigin: 1, productTitle: 1, productPrice: 1 },
	{ unique: true },
);

export default ProductSchema;
